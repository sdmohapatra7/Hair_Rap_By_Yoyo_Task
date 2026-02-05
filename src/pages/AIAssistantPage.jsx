import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateAIResponse } from '../api/aiService';

const AIAssistantPage = () => {
    const navigate = useNavigate();
    // Sessions state: [{ id, title, date, messages: [] }]
    const [sessions, setSessions] = useState(() => {
        const saved = localStorage.getItem('ai_chat_sessions');
        return saved ? JSON.parse(saved) : [];
    });
    const [currentSessionId, setCurrentSessionId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    // Load active session messages when ID changes
    useEffect(() => {
        if (currentSessionId) {
            const session = sessions.find(s => s.id === currentSessionId);
            if (session) setMessages(session.messages);
        } else {
            setMessages([]); // New chat state
        }
    }, [currentSessionId, sessions]);

    // Save sessions to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('ai_chat_sessions', JSON.stringify(sessions));
    }, [sessions]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const createNewSession = () => {
        setCurrentSessionId(null);
        setMessages([]);
        setInput('');
    };

    const handleSend = async (text) => {
        if (!text.trim()) return;

        const userMsg = { id: Date.now(), text, sender: 'user', timestamp: new Date().toISOString() };
        let updatedMessages = [...messages, userMsg];
        setMessages(updatedMessages);
        setInput('');
        setIsTyping(true);

        // Manage Session Creation/Updating
        let activeId = currentSessionId;
        if (!activeId) {
            activeId = Date.now();
            setCurrentSessionId(activeId);
            // Create new session entry
            const newSession = {
                id: activeId,
                title: text.length > 30 ? text.substring(0, 30) + '...' : text,
                date: new Date().toISOString(), // "Today", "Yesterday" logic can be applied on display
                messages: updatedMessages
            };
            setSessions(prev => [newSession, ...prev]);
        } else {
            // Update existing session
            setSessions(prev => prev.map(s =>
                s.id === activeId ? { ...s, messages: updatedMessages } : s
            ));
        }

        // Try getting response from API
        try {
            const apiResponse = await generateAIResponse(text, updatedMessages);
            setIsTyping(false);

            if (apiResponse) {
                // Client-side triggers (booking nav) removed as per user request
                const lowerText = text.toLowerCase();
                // if ((lowerText.includes('yes') || lowerText.includes('sure')) && lowerText.includes('book')) {
                //      // No redirect
                // }

                const aiMsg = { id: Date.now() + 1, text: apiResponse, sender: 'ai', timestamp: new Date().toISOString() };
                updatedMessages = [...updatedMessages, aiMsg];
                setMessages(updatedMessages);

                // Update session storage with answer
                setSessions(prev => prev.map(s =>
                    s.id === activeId ? { ...s, messages: updatedMessages } : s
                ));
                return;
            }
        } catch (e) {
            console.error("API call failed", e);
            setIsTyping(false);
        }

        // Fallback Mock Logic (Only if API completely fails/returns null)
        setTimeout(() => {
            let aiResponseText = "I'm having trouble connecting right now. Please try again later.";
            // ... strict fallback logic if needed, but we trust the API fallback in service now
            const aiMsg = { id: Date.now() + 1, text: aiResponseText, sender: 'ai' };
            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend(input);
    };

    const deleteSession = (e, id) => {
        e.stopPropagation();
        setSessions(prev => prev.filter(s => s.id !== id));
        if (currentSessionId === id) {
            createNewSession();
        }
    };

    const quickActions = [
        { icon: '✂️', title: 'Book an Appointment', desc: 'Haircut, styling, spa & more', action: () => handleSend("I want to book an appointment") },
        { icon: '💆', title: 'Explore Services', desc: 'Prices, duration & details', action: () => handleSend("Show me the services") },
        { icon: '🧴', title: 'Salon Products', desc: '"Give me 10 app startup ideas"', action: () => handleSend("Tell me about salon products") },
        { icon: '📅', title: 'My Bookings', desc: 'View, reschedule or cancel', action: () => handleSend("Check my bookings") },
        { icon: '💬', title: 'Talk to Expert', desc: 'Hair & skin consultation', action: () => handleSend("I want to talk to an expert") },
    ];

    return (
        <div className="flex h-screen bg-white dark:bg-gray-900 overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 flex flex-col hidden md:flex">
                <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="border border-gray-900 dark:border-gray-100 px-2 py-1 text-xs font-serif tracking-widest dark:text-gray-100">HAIR RAP BY YOYO</div>
                    </div>

                    <button
                        onClick={createNewSession}
                        className="w-full flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                        New Chat
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    {sessions.length === 0 && (
                        <div className="text-xs text-gray-400 text-center mt-4">No recent chats</div>
                    )}

                    {sessions.length > 0 && (
                        <>
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Recent</div>
                            <div className="space-y-2">
                                {sessions.map(session => (
                                    <div
                                        key={session.id}
                                        onClick={() => setCurrentSessionId(session.id)}
                                        className={`group flex items-center justify-between text-sm cursor-pointer p-2 rounded transition-colors ${currentSessionId === session.id ? 'bg-gray-200 dark:bg-gray-700 font-bold text-gray-900 dark:text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                                    >
                                        <span className="truncate flex-1 pr-2">{session.title}</span>
                                        <button
                                            onClick={(e) => deleteSession(e, session.id)}
                                            className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500"
                                            title="Delete chat"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <div className="p-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors" onClick={() => navigate('/profile')}>
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">JS</div>
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-200">John Smith</div>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col relative w-full h-full">
                {/* Header */}
                <div className="absolute top-0 right-0 p-4 flex items-center gap-4 z-10">
                    <button onClick={() => alert("Notifications")} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"><svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></button>
                    <div onClick={() => navigate('/profile')} className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-blue-500 transition-all">👤</div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 md:p-12 scroll-smooth">
                    {messages.length === 0 ? (
                        <div className="h-full flex flex-col justify-center items-center max-w-4xl mx-auto animate-fade-in-up">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">Hey! How can I assist you today?</h1>

                            {/* Quick Actions Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                                <div className="col-span-1 md:col-span-3 mb-2">
                                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow group focus-within:ring-2 focus-within:ring-primary-100">
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            placeholder="Ask anything about our salon..."
                                            className="flex-1 outline-none text-sm dark:bg-transparent dark:text-gray-200"
                                            onKeyDown={handleKeyPress}
                                            autoFocus
                                        />
                                        <button onClick={() => handleSend(input)} className="text-gray-400 group-focus-within:text-primary-600 transition-colors">
                                            <svg className="w-5 h-5 transform rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.34l6.675-1.907 6.675 1.907a1 1 0 001.169-1.34l-7-14z" /></svg>
                                        </button>
                                    </div>
                                </div>

                                {quickActions.map((action, idx) => (
                                    <button
                                        key={idx}
                                        onClick={action.action}
                                        className="bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 p-4 rounded-xl text-left transition-all hover:-translate-y-1 flex flex-col gap-2 group"
                                    >
                                        <span className="text-2xl group-hover:scale-110 transition-transform duration-200 block w-fit">{action.icon}</span>
                                        <div>
                                            <h3 className="font-bold text-gray-900 dark:text-white text-sm">{action.title}</h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-300">{action.desc}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-3xl mx-auto space-y-6 pt-10 pb-4">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                                    <div
                                        className={`max-w-[85%] rounded-2xl px-6 py-4 whitespace-pre-line text-sm leading-relaxed shadow-sm ${msg.sender === 'user'
                                            ? 'bg-rose-500 text-white rounded-br-none'
                                            : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}

                            {/* Loading / Typing State */}
                            {isTyping && (
                                <div className="flex justify-start animate-fade-in">
                                    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl px-6 py-4 rounded-bl-none shadow-sm flex gap-1 items-center">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>

                {/* Persistent Input Area (when chat is active) */}
                {messages.length > 0 && (
                    <div className="p-4 md:p-8 bg-white dark:bg-gray-900 border-t border-gray-50 dark:border-gray-800">
                        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-2 flex items-center gap-2 shadow-sm focus-within:ring-2 focus-within:ring-primary-100 transition-shadow">
                            <button className="p-2 text-gray-400 hover:text-primary-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                            </button>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder="Type your message..."
                                className="flex-1 outline-none text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 bg-transparent"
                                autoFocus
                            />
                            <div className="flex items-center gap-1 border-l border-gray-100 dark:border-gray-700 pl-2">
                                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                                </button>
                                <button
                                    onClick={() => handleSend(input)}
                                    disabled={!input.trim()}
                                    className="p-2 text-primary-600 hover:text-primary-700 bg-primary-50 hover:bg-primary-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <svg className="w-5 h-5 transform rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.34l6.675-1.907 6.675 1.907a1 1 0 001.169-1.34l-7-14z" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AIAssistantPage;

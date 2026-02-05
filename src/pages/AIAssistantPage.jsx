import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateAIResponse } from '../api/aiService';

const AIAssistantPage = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async (text) => {
        if (!text.trim()) return;

        const userMsg = { id: Date.now(), text, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Try getting response from API
        try {
            const apiResponse = await generateAIResponse(text);

            if (apiResponse) {
                // Determine if we need to trigger any client-side actions based on keywords in the *User's* text
                // (Since simple API integration doesn't support function calling yet in this basic fetch)
                const lowerText = text.toLowerCase();
                if ((lowerText.includes('yes') || lowerText.includes('sure')) && lowerText.includes('book')) {
                    setTimeout(() => navigate('/book/1'), 3000);
                }

                const aiMsg = { id: Date.now() + 1, text: apiResponse, sender: 'ai' };
                setMessages(prev => [...prev, aiMsg]);
                setIsTyping(false);
                return;
            }
        } catch (e) {
            console.error("API call failed, falling back to mock", e);
        }

        // Mock AI Response Logic (Fallback)
        setTimeout(() => {
            let aiResponseText = "I'm not sure how to help with that yet. You can try asking about our services or booking an appointment.";
            const lowerText = text.toLowerCase();

            if (lowerText.includes('book') || lowerText.includes('appointment')) {
                aiResponseText = "Sure 🤩 I can help you with that.\nPlease choose the service you're looking for:\n1. Men's Haircut\n2. Women's Haircut\n3. Beard Trim\n4. Hair Styling";
            } else if (lowerText.includes('haircut') || lowerText.includes('1')) {
                aiResponseText = "Great choice! 👌\nWhen would you like to book your appointment?\n\n• Today\n• Tomorrow\n• Pick a date 📅";
            } else if (lowerText.includes('today') || lowerText.includes('tomorrow')) {
                aiResponseText = "I've checked the availability. We have a slot at 4:00 PM. Should I book it for you?";
            } else if (lowerText.includes('yes') || lowerText.includes('sure')) {
                aiResponseText = "Perfect! Redirecting you to confirm the booking details... 🚀";
                setTimeout(() => navigate('/book/1'), 2000);
            } else if (lowerText.includes('price') || lowerText.includes('cost')) {
                aiResponseText = "Our haircuts start at ₹500. You can view our full price list on the Services page.";
            }

            const aiMsg = { id: Date.now() + 1, text: aiResponseText, sender: 'ai' };
            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend(input);
    };

    const quickActions = [
        { icon: '✂️', title: 'Book an Appointment', desc: 'Haircut, styling, spa & more', action: () => handleSend("I want to book an appointment") },
        { icon: '💆', title: 'Explore Services', desc: 'Prices, duration & details', action: () => navigate('/services') },
        { icon: '🧴', title: 'Salon Products', desc: '"Give me 10 app startup ideas"', action: () => handleSend("Tell me about salon products") },
        { icon: '📅', title: 'My Bookings', desc: 'View, reschedule or cancel', action: () => navigate('/bookings') },
        { icon: '💬', title: 'Talk to Expert', desc: 'Hair & skin consultation', action: () => handleSend("I want to talk to an expert") },
    ];

    return (
        <div className="flex h-[calc(100vh-theme(spacing.2))] max-h-[900px] bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 m-4">
            {/* Sidebar */}
            <div className="w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 flex flex-col hidden md:flex">
                <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="border border-gray-900 dark:border-gray-100 px-2 py-1 text-xs font-serif tracking-widest dark:text-gray-100">HAIR RAP BY YOYO</div>
                    </div>

                    <button
                        onClick={() => setMessages([])}
                        className="w-full flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                        New Chat
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Today</div>
                    <div className="space-y-2">
                        <div className="text-sm font-bold text-gray-800 cursor-pointer hover:bg-gray-100 p-2 rounded">Wellness Coach</div>
                        <div className="text-xs text-gray-500 px-2">Hair & scalp care tips for today</div>

                        <div className="text-sm font-bold text-gray-800 cursor-pointer hover:bg-gray-100 p-2 rounded mt-4">Explore Services</div>
                        <div className="text-xs text-gray-500 px-2">Prices, duration & service details</div>
                    </div>

                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 mt-6">Yesterday</div>
                    <div className="space-y-2">
                        <div className="text-sm font-bold text-gray-800 cursor-pointer hover:bg-gray-100 p-2 rounded">My Appointments</div>
                        <div className="text-xs text-gray-500 px-2">View, reschedule or cancel bookings</div>
                    </div>
                </div>

                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">JS</div>
                        <div className="text-sm font-medium text-gray-700">John Smith</div>
                        <button className="ml-auto text-gray-400 hover:text-gray-600">⚙️</button>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col relative">
                {/* Header */}
                <div className="absolute top-0 right-0 p-4 flex items-center gap-4 z-10">
                    <button className="p-2 hover:bg-gray-100 rounded-full"><svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></button>
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">👤</div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 md:p-12">
                    {messages.length === 0 ? (
                        <div className="h-full flex flex-col justify-center items-center max-w-4xl mx-auto">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Hey! How can I assist you today?</h1>

                            {/* Quick Actions Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                                <div className="col-span-1 md:col-span-3 mb-2">
                                    <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-center gap-3 shadow-sm">
                                        <input
                                            type="text"
                                            placeholder="Browse help topics"
                                            className="flex-1 outline-none text-sm dark:bg-transparent dark:text-gray-200"
                                            onKeyDown={handleKeyPress}
                                        />
                                        <button className="text-gray-400">🎤</button>
                                        <button className="text-gray-400">🔊</button>
                                    </div>
                                </div>

                                {quickActions.map((action, idx) => (
                                    <button
                                        key={idx}
                                        onClick={action.action}
                                        className="bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 p-4 rounded-xl text-left transition-colors flex flex-col gap-2 group"
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
                        <div className="max-w-3xl mx-auto space-y-6 pt-10">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-6 py-4 whitespace-pre-line text-sm leading-relaxed shadow-sm ${msg.sender === 'user'
                                            ? 'bg-rose-500 text-white rounded-br-none'
                                            : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-gray-100 rounded-2xl px-6 py-4 rounded-bl-none shadow-sm flex gap-1">
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

                {/* Input Area (Only show when not empty state for better design match, or always at bottom? 
                   Design shows input inside the "Browse help topics" box in empty state. 
                   But we need a persistent chat input once chat starts.) */}
                {messages.length > 0 && (
                    <div className="p-4 md:p-8 bg-white border-t border-gray-50">
                        <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl p-2 flex items-center gap-2 shadow-sm">
                            <button className="p-2 text-gray-400 hover:text-primary-600 rounded-full hover:bg-gray-50">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                            </button>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder="Browse help topics"
                                className="flex-1 outline-none text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 bg-transparent"
                            />
                            <div className="flex items-center gap-1 border-l border-gray-100 pl-2">
                                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                                </button>
                                <button
                                    onClick={() => handleSend(input)}
                                    className="p-2 text-primary-600 hover:text-primary-700 bg-primary-50 hover:bg-primary-100 rounded-full transition-colors"
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

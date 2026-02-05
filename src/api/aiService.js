// Basic service to call Gemini API
// Requires VITE_GEMINI_API_KEY in .env

export const generateAIResponse = async (userMessage) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
        console.warn("Missing Gemini API Key. Using mock response.");
        return null; // Return null to trigger fallback/mock usage
    }

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: `You are a helpful AI assistant for a salon booking app called 'HAIR RAP BY YOYO'.
                                    Context:
                                    - Services: Men's Haircut ($20), Women's Haircut ($30), Beard Trim ($15), Hair Styling ($25).
                                    - Opening Hours: 9 AM - 8 PM Mon-Sat.
                                    - Location: Texas, USA.

                                    User asks: "${userMessage}"
                                    
                                    Provide a helpful, friendly, and concise response. 
                                    If the user wants to book, ask them for the service name and preferred time.
                                    If they ask for prices, list them.
                                    Do not use markdown formatting like **bold** too heavily.`
                                }
                            ]
                        }
                    ]
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;
        return text;

    } catch (error) {
        console.error("Gemini API Request Failed:", error);
        return null; // Fallback to mock
    }
};

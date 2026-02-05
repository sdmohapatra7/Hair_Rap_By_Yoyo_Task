// Basic service to call Gemini API
// Requires VITE_GEMINI_API_KEY in .env

const SYSTEM_CONTEXT = `
You are 'Yoyo', the AI assistant for 'HAIR RAP BY YOYO', a premium salon.
Your goal is to help users book appointments, check prices, and answer questions.

**Salon Information:**
- **Name:** HAIR RAP BY YOYO
- **Location:** 123 Salon St, Texas, USA.
- **Hours:** Mon-Sat 9 AM - 8 PM, Sun 10 AM - 6 PM.
- **Cancellation Policy:** Free cancellation up to 24 hours before appointment.

**Services & Prices:**
- Men's Haircut: $20 (30 mins)
- Women's Haircut: $30 (45 mins)
- Beard Trim: $15 (20 mins)
- Hair Styling: $25 (30 mins)
- Facial Spa: $50 (60 mins)
- Hair Color: Starts at $80 (Requires consultation)

**Booking Flow Instructions:**
1. If a user asks to book, ask for: Service Name and Preferred Time.
2. Once they provide details, confirm availability (Pretend it is available) and ask to confirm.
3. If confirmed, say "Booking Confirmed! [Mock Action]".

**Tone:** Friendly, professional, and emoji-friendly.
`;

const MODELS_TO_TRY = [
    "gemini-2.5-flash",
    "gemini-2.0-flash-lite-001",
    "gemini-2.0-flash",
    "gemini-1.5-flash",
    "gemini-pro"
];

export const generateAIResponse = async (userMessage, history = []) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
        console.warn("Missing Gemini API Key. Using mock response.");
        return null; // Return null to trigger fallback/mock usage
    }

    // Format history 
    const formattedHistory = history.slice(-5).map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
    }));

    const contents = [
        { role: 'user', parts: [{ text: SYSTEM_CONTEXT }] },
        { role: 'model', parts: [{ text: "Understood. I am Yoyo, ready to help clients with bookings, pricing, and advice." }] },
        ...formattedHistory,
        { role: 'user', parts: [{ text: userMessage }] }
    ];

    // Try models in sequence until one works
    for (const model of MODELS_TO_TRY) {
        try {
            console.log(`Attempting AI request with model: ${model}`);
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ contents }),
                }
            );

            if (!response.ok) {
                // If 404, it means model not found for this key/region, so try next.
                // For other errors (like 429 quota), it might also be worth trying next or stopping.
                console.warn(`Model ${model} failed with status: ${response.status}`);
                continue;
            }

            const data = await response.json();
            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                return data.candidates[0].content.parts[0].text;
            }
        } catch (error) {
            console.error(`Error with model ${model}:`, error);
            // Continue to next model
        }
    }

    console.error("All Gemini models failed. Falling back to mock.");
    return null; // All models failed, fallback to mock
};

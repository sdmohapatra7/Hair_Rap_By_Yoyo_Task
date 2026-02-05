const https = require('https');

// Key from your .env file
const apiKey = "AIzaSyCxrqysFDPH4E74pGmxhcObnOQQt5uAmzY";

console.log("Listing Models specific for generateContent...");

const options = {
    hostname: 'generativelanguage.googleapis.com',
    path: `/v1beta/models?key=${apiKey}`,
    method: 'GET',
};

const req = https.request(options, (res) => {
    let responseBody = '';

    res.on('data', (chunk) => {
        responseBody += chunk;
    });

    res.on('end', () => {
        try {
            const data = JSON.parse(responseBody);
            if (data.models) {
                console.log("FOUND MODELS:");
                const genModels = data.models.filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent"));
                genModels.forEach(m => console.log(`- ${m.name}`));

                if (genModels.length === 0) {
                    console.log("No models support generateContent ?!");
                    console.log("All models:", data.models.map(m => m.name));
                }
            } else {
                console.log("No 'models' property in response:", responseBody);
            }
        } catch (e) {
            console.log("JSON Parse Error:", e);
            console.log(responseBody);
        }
    });
});

req.on('error', (e) => {
    console.error("Request Error:", e);
});

req.end();

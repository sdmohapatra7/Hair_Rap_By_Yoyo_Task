const https = require('https');

// Key from your .env file
const apiKey = "AIzaSyCxrqysFDPH4E74pGmxhcObnOQQt5uAmzY";

console.log("Listing Available Gemini Models...");

const options = {
    hostname: 'generativelanguage.googleapis.com',
    path: `/v1beta/models?key=${apiKey}`,
    method: 'GET',
};

const req = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    let responseBody = '';

    res.on('data', (chunk) => {
        responseBody += chunk;
    });

    res.on('end', () => {
        console.log("Response Body (Models):");
        const data = JSON.parse(responseBody);
        if (data.models) {
            data.models.forEach(m => console.log(`- ${m.name} (${m.displayName})`));
        } else {
            console.log(responseBody);
        }
    });
});

req.on('error', (e) => {
    console.error("Request Error:", e);
});

req.end();

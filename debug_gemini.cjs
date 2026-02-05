const https = require('https');

// Key from your .env file
const apiKey = "AIzaSyCxrqysFDPH4E74pGmxhcObnOQQt5uAmzY";

console.log("Testing Gemini API Key...");

const data = JSON.stringify({
    contents: [{ parts: [{ text: "Hello, are you working?" }] }]
});

const options = {
    hostname: 'generativelanguage.googleapis.com',
    path: `/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    let responseBody = '';

    res.on('data', (chunk) => {
        responseBody += chunk;
    });

    res.on('end', () => {
        console.log("Response Body:");
        console.log(responseBody);
    });
});

req.on('error', (e) => {
    console.error("Request Error:", e);
});

req.write(data);
req.end();

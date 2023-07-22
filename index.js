const https = require('https');

let selection;

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

readline.question(`Select: `, number => {
    selection = number;
    switch (selection) {
        case '0':
            callYelp();
            break;
    }
    
    readline.close();
});

function callYelp() {
    const options = {
        hostname: 'api.yelp.com',
        path: '/v3/businesses/toyota-of-denton-denton-3/reviews',
        method: 'GET',
        headers: {
            Authorization: `Bearer ${process.env.API_Key}`,
            'Accept': 'application/json'
        },
    };
    
    const req = https.request(options, (res) => {
        let data = '';
      
        res.on('data', (chunk) => {
            data += chunk;
        });
      
        res.on('end', () => {
            const response = JSON.parse(data);
            const reviews = response.reviews;
            for (const review of reviews) {
                console.log(`Review by ${review.user.name}:`);
                console.log(`Rating: ${review.rating}`);
                console.log(`Review: ${review.text}\n`);
            }
        });
    });
      
    req.on('error', (error) => {
        console.error('Error:', error.message);
    });
        
    req.end();
}
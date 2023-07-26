import { infer } from "./services/chatService.js";
// import https from 'https';
import { createInterface } from 'readline';

infer("What is the name of the toyota of denton?");

// let selection;

// const readline = createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// readline.question(`Select: `, number => {
//   selection = number;
//   switch (selection) {
//       case '0':
//           // callYelp();
//           infer("What is the name of the toyota of denton?");
//           break;
//   }
  
//   readline.close();
// });

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
          
          infer("Summarize this array of reviews into a 4 sentence summary. "+ reviews);
          
          for (const review of reviews) {
              // console.log(`Review by ${review.user.name}:`);
              // console.log(`Rating: ${review.rating}`);
              console.log(`Review: ${review.text}\n`);
          }
      });
  });
    
  req.on('error', (error) => {
      console.error('Error:', error.message);
  });
      
  req.end();
}
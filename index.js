import { LLM } from "llama-node";
import { LLamaCpp } from "llama-node/dist/llm/llama-cpp.js";
// const https = require('https');
import path from "path";

const model = path.resolve(process.cwd(), "./llama-2-7b-chat/ggml-model-f32.bin");
const llama = new LLM(LLamaCpp);
const config = {
    modelPath: model,
    enableLogging: true,
    nCtx: 300,
    seed: 0,
    f16Kv: false,
    logitsAll: false,
    vocabOnly: false,
    useMlock: false,
    embedding: false,
    useMmap: true,
    nGpuLayers: 0
};

const template = `How many months in a year`;
const prompt = `A chat between a user and an assistant.
USER: ${template}
ASSISTANT:`;

const run = async () => {
    await llama.load(config);
  
    await llama.createCompletion({
        nThreads: 8,
        nTokPredict: 200,
        topK: 20,
        topP: 0.1,
        temp: 0.2,
        repeatPenalty: 1,
        prompt,
    }, (response) => {
        process.stdout.write(response.token);
    });
  }
  
  run();
  
// let selection;

// const readline = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// readline.question(`Select: `, number => {
//     selection = number;
//     switch (selection) {
//         case '0':
//             callYelp();
//             break;
//     }
    
//     readline.close();
// });

// function callYelp() {
//     const options = {
//         hostname: 'api.yelp.com',
//         path: '/v3/businesses/toyota-of-denton-denton-3/reviews',
//         method: 'GET',
//         headers: {
//             Authorization: `Bearer ${process.env.API_Key}`,
//             'Accept': 'application/json'
//         },
//     };
    
//     const req = https.request(options, (res) => {
//         let data = '';
      
//         res.on('data', (chunk) => {
//             data += chunk;
//         });
      
//         res.on('end', () => {
//             const response = JSON.parse(data);
//             const reviews = response.reviews;
//             for (const review of reviews) {
//                 // console.log(`Review by ${review.user.name}:`);
//                 // console.log(`Rating: ${review.rating}`);
//                 console.log(`Review: ${review.text}\n`);
//             }
//         });
//     });
      
//     req.on('error', (error) => {
//         console.error('Error:', error.message);
//     });
        
//     req.end();
// }
import http from 'http';

const postData = JSON.stringify({
    prompt: 'Building a website can be done in 10 simple steps:',
    n_predict: 128
});

const options = {
    hostname: 'localhost',
    port: 8080, // or the appropriate port for your API
    path: '/completion', // the specific endpoint you want to send the POST request to
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
};

const req = http.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);
  
    res.on('data', (chunk) => {
      console.log(`Response data: ${chunk}`);
      // Handle the response data here
    });
  
    res.on('end', () => {
      console.log('No more data in response.');
    });
});
  
  req.on('error', (error) => {
    console.error(`Error in request: ${error}`);
  });
  
  // Write the data to the request body
  req.write(postData);
  
  // End the request
  req.end();
const http = require('http');

const data = JSON.stringify({
  name: 'Test Habit',
  duration: '2026',
  unit: 'Day',
  frequency: 1,
  days: 'Monday,Wednesday,Friday',
  color: 'blue'
});

console.log('Sending POST request to http://localhost:3001/habits');
console.log('Data:', data);

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/habits',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  let body = '';
  
  console.log(`\nStatus: ${res.statusCode}`);
  console.log('Headers:', res.headers);
  
  res.on('data', (chunk) => {
    body += chunk;
  });
  
  res.on('end', () => {
    console.log('Response body:', body);
    process.exit(0);
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
  process.exit(1);
});

req.write(data);
req.end();

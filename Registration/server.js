const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Configure body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the "public" directory
app.use(express.static('public'));

// GET route for the home page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// GET route for the login page
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

// POST route to process form data
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;


  res.send(`
    <html>
    <head>
      <title>Login Details</title>
      <style>
        body {
          background-color: #f2f2f2;
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .container {
          max-width: 400px;
          background-color: #fff;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        h1 {
          color: #333;
          margin-bottom: 20px;
          letter-spacing: 2px;
        }

        .login-details {
          margin-top: 20px;
          padding: 15px;
          background-color: #f8f8f8;
          border-radius: 5px;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        }

        .login-details p {
          margin: 10px 0;
          color: #666;
          font-size: 16px;
        }
        
        .login-details p strong {
          color: #333;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Login Details</h1>
        <div class="login-details">
          <p><strong>Username:</strong> ${username}</p>
          <p><strong>Password:</strong> ${password}</p>
        </div>
      </div>
    </body>
    </html>
  `);
});



const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const express = require('express');
const randomstring = require('randomstring');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/generate', (req, res) => {
  const options = {
    length: parseInt(req.query.length),
    uppercase: req.query.uppercase === 'true',
    lowercase: req.query.lowercase === 'true',
    numbers: req.query.numbers === 'true',
    special: req.query.special === 'true',
  };
  const password = generateRandomPassword(options);
  res.json({ password: password });
});

function generateRandomPassword(options) {
  return randomstring.generate(options);
}

app.listen(port, () => {
  console.log(`Password generator app listening at http://localhost:${port}`);
});

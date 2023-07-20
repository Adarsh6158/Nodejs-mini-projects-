const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

const API_KEY = '79c887d0faaeb9aadfc7136b';
const BASE_URL = 'https://api.exchangerate-api.com/v4/latest/';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('html'));

app.post('/convert', async (req, res) => {
  const { amount, baseCurrency, targetCurrency } = req.body;

  const exchangeRate = await getExchangeRate(baseCurrency, targetCurrency);
  if (!exchangeRate) {
    res.json({ error: 'Currency conversion failed. Please check your input.' });
    return;
  }

  const convertedAmount = amount * exchangeRate;
  res.json({ result: `${amount} ${baseCurrency} is equal to ${convertedAmount.toFixed(2)} ${targetCurrency}` });
});

async function getExchangeRate(baseCurrency, targetCurrency) {
  try {
    const response = await axios.get(`${BASE_URL}${baseCurrency}`);
    const exchangeRate = response.data.rates[targetCurrency];
    return exchangeRate;
  } catch (error) {
    console.error('Error fetching exchange rates:', error.message);
    return null;
  }
}

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

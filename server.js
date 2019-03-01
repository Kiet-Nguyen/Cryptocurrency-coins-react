const express = require('express')
const rp = require('request-promise');

const keys = require('./config/keys');

const app = express()

const requestOptions = {
  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit',
  qs: {
    start: 1,
    limit: 1000,
    convert: 'USD'
  },
  headers: {
    'X-CMC_PRO_API_KEY': keys.coinKey
  },
  json: true,
  gzip: true
};

rp(requestOptions).then(response => {
  app.get('/api/coins', function (req, res) {
    res.send(response)
  })
}).catch((err) => {
  console.log('API call error:', err.message);
});

// Prepare for production
if (process.env.NODE_ENV === 'production') {
  // Path to production assets (js, css)
  app.use(express.static('client/build'));

  // Express will provide index.html file, if it doesn't recognize the route (Router routes: /, /surveys, /surveys/new)
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Port number for dev and prod
const PORT = process.env.PORT || 5000;

app.listen(PORT);
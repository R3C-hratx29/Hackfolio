require('dotenv').config({ path: '../env.env' });
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./routes/routes.js');
// const db = require('./models/db');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/api', router);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
if (!process.env.DEV) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

const port = process.env.PORT || 3001;
app.listen(port);

console.log(`Server listening on ${port}`);

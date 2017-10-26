require('dotenv').config({ path: '../env.env' });
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./routes/routes.js');
const github = require('./routes/githubAuth.js');
const methodOverride = require('method-override');
const passport = require('passport');
const socket = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(passport.initialize());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTION');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Attach socket.io to the request
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/api', router, github);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


const port = process.env.PORT || 3001;
server.listen(port);

console.log(`Server listening on ${port}`);

'use strict';

const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const config = require('./config');
const routes = require('./routes/index');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(
  morgan('combined', {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), {
      flags: 'a',
    }),
  }),
);

if (config.MODE === 'development') {
  app.use(morgan('dev'));
}

app.use('/api', routes);

app.use('/', express.static(path.join(__dirname, '..', config.STATIC_DIR)));

/* eslint-disable */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).end();
});

app.listen(config.PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(
      `listening at http://localhost:${config.PORT} (${config.MODE} mode)`,
    );
  }
});


/*
*************************************************************************************************************************************


const express = require('express');
const app = express();
const fs = require('fs');
const util = require('util');
const read = util.promisify(fs.readFile);
const write = util.promisify(fs.writeFile);
const append = util.promisify(fs.appendFile);
const bodyParser = require('body-parser');
const { timeStamp } = require('console');
const crypto = require('crypto');
app.use(bodyParser.text());
const users = [];
let sessions = [];
app.post('/login',(req, res)=>{
const body = JSON.parse(req.body);
const username = body.username;
const password = body.password;
const user = users.find(u=> u.username === username && u.password === password)
if (user === undefined){
    res.status(500).send({ok: false , message:`Incorrect username or password!`})
}
const sessionId = crypto.randomBytes(128).toString('hex');
sessions.push({
    username: username,
    password: password,
    sessionId: sessionId,
    issueDate: new Date()
})
res.status(200).send({ok: true, sessionToken: sessionId})
});
app.post('/register', (req, res) => {
  const body = JSON.parse(req.body);
  const username = body.username;
  const password = body.password;
  users.push({ username, password });
  res.status(200).send({ ok: true, message: `user ${username} is added!` });
});
app.use('/api/*', (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (authHeader === undefined) {
    res.status(400).send({
      ok: false,
      message: `Please provide a valid Authorization header!`,
    });
    return;
  }
  const session = sessions.find(s=>s.sessionid === authHeader)
  if (session === undefined) {
      res.status(400).send({ok: false, message: `Incorrect sessionId`})
      return;
  }
  req.user = users.find(u=>u.username === session.username);
    next();
});
app.get('/api/logout',(req,res)=>{
    sessions = sessions.filter(s=>s.username !== req.user.username)
    res.status(200).send({ok: true, message:`log out successfully done!`})
});
// read a file -- /files/tim --> tim.txt
// GET
app.get('/files/:name', async (req, res) => {
  try {
    const content = await read(`./files/${req.params.name}.txt`, 'utf8');
    res.send(content);
  } catch (error) {
    res.status(404).send({ ok: false, message: 'file not found' });
  }
});
// create file
// POST
app.post('/files/:name', async (req, res) => {
  const path = `./files/${req.params.name}.txt`;
  if (fs.existsSync(path)) {
    res
      .status(409)
      .send({ ok: false, message: 'file with that name already exists!' });
    return;
  }
  try {
    await write(path, req.body, 'utf8');
    res.send({ ok: true, message: `file ${path} created successfully` });
  } catch (error) {
    res
      .status(500)
      .send({ ok: false, message: 'error writing file', err: error });
  }
});
// update a file
// PUT
app.put('/files/:name', async (req, res) => {
  const path = `./files/${req.params.name}.txt`;
  if (!fs.existsSync(path)) {
    res
      .status(409)
      .send({ ok: false, message: 'file with that name does not exist!' });
    return;
  }
  try {
    await write(path, req.body);
    res.send({ ok: true, message: `file ${path} updated successfully` });
  } catch (error) {
    res
      .status(500)
      .send({ ok: false, message: 'error writing file', err: error });
  }
});
app.listen(8000);

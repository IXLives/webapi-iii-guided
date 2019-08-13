const express = require('express'); // importing a CommonJS module
const helmet = require('helmet')
const logger = require('morgan')

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();
const bodyParser = express.json()

// built-in middleware
// express.json is a method that returns a piece of middleware

// GLOBAL middleware (executed top to bottom)
server.use(bodyParser);
server.use(helmet())

server.use(logger('dev'))

//Custom middleware!
server.use(addName)
// server.use(byThree)
//server.use(methodLogger)

// 3rd party middleware


server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? `, ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});


//Custom middlewarez
function methodLogger(req, res, next) {
  console.log(`${req.method} Request`)
  next()
}

function addName(req, res, next) {
  req.name = 'Creator'
  next()
}



// Piece of middleware that says 'you shall not pass' if seconds are divisible by 3

function byThree(req, res, next) {
  let d = new Date()
  let s = d.getSeconds()
  let r = s % 3
  if (r === 0) {
    res.status(403).json({message: 'You shall not pass!' })
  } else {
    next()
  }
}

module.exports = server;

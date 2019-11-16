const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware');
const authRouter = require('../auth/auth-router');
const ticketsRouter = require('../tickets/tickets-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/tickets', authenticate, ticketsRouter);

server.get('/', (req, res) => {
    res.send('<h1>Hello From  The Dev-Desk Queue Buildweek API');
});

module.exports = server;
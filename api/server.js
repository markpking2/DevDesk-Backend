const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const fileUpload = require('express-fileupload');

const authenticate = require('../auth/authenticate-middleware');
const adminMiddleware = require('../auth/admin-middleware');
const authRouter = require('../auth/auth-router');
const ticketsRouter = require('../tickets/tickets-router');
const usersRouter = require('../users/users-router');
const utilRouter = require('../util/util-router');
const adminRouter = require('../auth/admin-router');

const server = express();


server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(fileUpload({useTempFiles: true}));

server.use('/api/auth', authRouter);
server.use('/api/tickets', authenticate, ticketsRouter);
server.use('/api/users', authenticate, usersRouter);
server.use('/api/util', utilRouter);
server.use('/admin', adminMiddleware, adminRouter);

server.get('/', (req, res) => {
    res.send('<h1>Hello From  The Dev-Desk Queue Buildweek API');
});

module.exports = server;
const express = require('express');
const app = express();
const userRouter = require('./route/user.route.js');
const authRouter = require('./route/auth.route.js');
const messageRouter = require('./route/message.route.js');
const roleRouter = require('./route/role.route.js');
const {connect} = require('./framework/connection.js');
const sync = require('./framework/sync.js');

const authMiddleware = require('./middleware/auth.middleware.js');

const database = async () => {
    await connect();
    await sync();
}

database();

app.use(express.json());

app.use('/auth',authRouter);
app.use('/user', authMiddleware, userRouter);
app.use('/message', authMiddleware, messageRouter);
app.use('/role', authMiddleware, roleRouter);


module.exports = app;
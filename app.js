const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8080;
// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
const jwtAuthRouter = require('./routes/jwtAuth');
const dashboardRouter = require('./routes/dashboard');
const testRouter = require('./routes/test');
const db = require('./config/db.js');

//Middleware
app.use(cors());
app.use(express.json());

//Routes
// app.use('/users', usersRouter);
// app.use('/', indexRouter);
app.use('/auth', jwtAuthRouter);
app.use('/dashboard', dashboardRouter);
app.use('/yo', testRouter);

app.set('db', db);

app.listen(PORT, () => {
	console.log(`Listening to Port : ${PORT}`);
});

module.exports = app;

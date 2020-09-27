const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8080;
const jwtAuthRouter = require('./routes/jwtAuth');
const dashboardRouter = require('./routes/dashboard');

//Middleware
app.use(cors());
app.use(express.json());

app.use('/auth', jwtAuthRouter);
app.use('/dashboard', dashboardRouter);

app.listen(PORT, () => {
	console.log(`Listening to Port : ${PORT}`);
});

module.exports = app;

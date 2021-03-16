const express = require("express");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var geturlRouter = require('./routes/geturl');
var pep2peRouter = require('./routes/pep2pe');

function createServer() {
	const app = express()

	app.use('/', indexRouter);
    app.use('/users', usersRouter);
    app.use('/geturl', geturlRouter);
    app.use('/pep2pe', pep2peRouter);

	return app
}

module.exports = createServer
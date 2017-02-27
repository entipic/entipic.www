'use strict';

require('dotenv').load();

var core = require('entipic.core');
var logger = core.logger;

core.Logger.init({
	tags: ['entipic.www'],
	json: true
});

if (process.env.MODE !== 'dev') {
	logger.warn('Starting app...', {
		maintenance: 'start'
	});
}

var express = require('express');
var bodyParser = require('body-parser');
var responseTime = require('response-time');
var methodOverride = require('method-override');
var routes = require('./routes');
var utils = require('./utils.js');
var config = require('./config.js');
var path = require('path');
var links = require('./links.js');
var Data = require('./data.js');
var app;

function exit(error) {
	if (error) {
		logger.error('Exit with error: ' + error.message, error);
	}
	Data.close(function() {
		// console.log('Mongoose connection disconnected through app termination');
		/*eslint no-process-exit:0*/
		process.exit(0);
	});
}

function catchError(req, res, error) {
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

	logger.error(error.message || 'errorHandler', {
		hostname: req.hostname,
		url: req.originalUrl,
		error: error,
		ip: ip,
		ref: req.get('Referrer')
	});

	utils.maxage(res, 5);

	var statusCode = error.statusCode || error.code || 500;
	statusCode = statusCode < 200 ? 500 : statusCode;

	res.status(statusCode).end();
}

function createApp() {
	app = express();

	app.disable('x-powered-by');
	app.set('view engine', 'jade');
	app.set('views', path.join(__dirname, 'views'));
	app.disable('etag');

	app.use(bodyParser.json()); // to support JSON-encoded bodies
	app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
		extended: true
	}));
	app.use(methodOverride());
	app.use(responseTime());
	if (process.env.MODE === 'dev') {
		app.use(require('morgan')('dev'));
	}

	app.use(express.static(path.join(__dirname, '/public'), {
		maxAge: process.env.MODE === 'dev' ? 0 : (1000 * 60 * 15)
	}));

	// app locals
	app.locals.links = links;
	app.locals.config = config;

	// app routes
	routes(app);

	app.all('*', function(req, res) {
		var error = new Error('Page not found');
		error.statusCode = 404;
		catchError(req, res, error);
	});

	/*eslint no-unused-vars:1*/
	app.use(function(err, req, res, next) {
		catchError(req, res, err);
	});

	app.on('uncaughtException', function(req, res, route, error) {
		catchError(req, res, error);
	});

	app.listen(process.env.PORT);
}

createApp();

process.on('uncaughtException', function(err) {
	// console.trace(err);
	logger.error('uncaughtException: ' + err.message, err);
});

process.on('unhandledRejection', function(error) {
	logger.error('unhandledRejection: ' + error.message, error);
});

'use strict';

var packageInfo = require('../../package.json');
var core = require('entipic.core');
var entipicUrl = require('entipic.url');
var utils = require('../utils.js');
var config = require('../config.js');
var util = {
	// moment: require('moment'),
	format: require('util').format,
	startWithUpperCase: core.util.startWithUpperCase,
	numberFormat: core.util.numberFormat,
	wrapAt: core.text.wrapAt
};

module.exports = function(req, res, next) {

	res.locals.util = util;
	res.locals.entipicUrl = function() {
		return entipicUrl.apply(null, arguments).replace('cdn.entipic.com', 'localhost:41527');
	};
	res.locals.entipicUrl.picture = function() {
		return entipicUrl.picture.apply(null, arguments).replace('cdn.entipic.com', 'localhost:41527');
	};
	res.locals.site = {
		name: config.name,
		head: {
			title: config.name
		}
	};

	res.locals.project = {
		version: packageInfo.version,
		name: config.name
	};

	utils.maxage(res, 60);

	next();
};

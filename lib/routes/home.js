'use strict';

var express = require('express');
var core = require('entipic.core');
// var _ = core._;
var Promise = core.Promise;
/*eslint new-cap:0*/
var route = module.exports = express.Router();
var utils = require('../utils.js');
var Data = require('../data.js');
// var links = require('../links');

route.get('/', function(req, res, next) {

	utils.maxageIndex(res);

	// var date = new Date();
	// var date7Days = date.setDate(date.getDate() - 7);
	// var params7Days = {
	// 	where: {
	// 		createdAt: {
	// 			$gt: date7Days
	// 		}
	// 	}
	// };

	Promise.props({
			exampleTopics: Data.access.entities({
				select: '_id name uniqueName lang country pictureId popularity',
				limit: 9,
				order: '-popularity'
			}),
			latestTopics: Data.access.entities({
				select: '_id name uniqueName lang country pictureId popularity',
				limit: 12,
				order: '-createdAt'
			}),
			countTopics: Data.access.countEntities(),
			countUniqueNames: Data.access.countUniqueNames(),
			countPictures: Data.access.countPictures(),
			// countTopics7Days: Data.access.countTopics(params7Days),
			// countUniqueNames7Days: Data.access.countUniqueNames(params7Days),
			// countPictures7Days: Data.access.countPictures(params7Days)
		}).then(function(props) {
			res.render('home.jade', props);
		})
		.catch(next);
});

route.get('/help', function(req, res, next) {
	utils.maxageHelp(res);
	res.locals.site.head.title = 'Help | ' + res.locals.site.head.title;
	res.locals.site.currentPage = 'help';
	res.render('help');
});

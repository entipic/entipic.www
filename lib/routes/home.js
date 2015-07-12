'use strict';

var express = require('express');
var core = require('entipic.core');
// var _ = core._;
var Promise = core.Promise;
/*eslint new-cap:0*/
var route = module.exports = express.Router();
var utils = require('../utils.js');
var Data = require('../data.js');
var links = require('../links');

route.get('/', function(req, res, next) {

	utils.maxageIndex(res);

	Promise.props({
			exampleTopics: Data.access.topics({
				where: {
					englishWikiId: {
						$ne: null
					}
				},
				select: '_id name uniqueName englishWikiName lang country pictureId popularity',
				limit: 9,
				order: '-popularity'
			})
		}).then(function(props) {
			res.render('home.jade', props);
		})
		.catch(next);
});

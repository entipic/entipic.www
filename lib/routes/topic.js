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

route.get('/topic/:uniqueName', function(req, res, next) {
	var uniqueName = req.params.uniqueName.trim().toLowerCase();

	utils.maxageTopic(res);

	Data.access.topic({
			where: {
				uniqueName: uniqueName
			}
		})
		.then(function(topic) {
			if (!topic) {
				return res.redirect(links.home());
			}
			return Promise.props({
				uniqueNames: Data.access.uniquenames({
					where: {
						topicId: topic.id
					},
					select: '_id name uniqueName lang country isLocal',
					limit: 100,
					order: 'lang'
				}),
				pictures: Data.access.pictures({
					where: {
						topicId: topic.id
					},
					select: '_id status',
					limit: 10,
					order: '-createdAt'
				})
			}).then(function(props) {
				props.topic = topic;
				res.render('topic.jade', props);
			});
		})
		.catch(next);
});

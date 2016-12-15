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

route.get('/topic/:slug', function(req, res, next) {
	var slug = req.params.slug;

	utils.maxageTopic(res);

	Data.access.entity({
			where: {
				uniqueName: slug
			}
		})
		.then(function(topic) {
			if (!topic) {
				return res.redirect(links.home());
			}
			return Promise.props({
				uniqueNames: Data.access.uniquenames({
					where: {
						entityId: topic.id
					},
					select: '_id name uniqueName locale',
					limit: 100,
					sort: 'lang'
				})
			}).then(function(props) {
				props.topic = topic;
				res.locals.site.head.title = topic.name + ' picture';
				res.render('topic.jade', props);
			});
		})
		.catch(next);
});

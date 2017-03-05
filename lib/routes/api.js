'use strict';

var express = require('express');
// var core = require('entipic.core');
// var _ = core._;
// var Promise = core.Promise;
/*eslint new-cap:0*/
var route = module.exports = express.Router();
var utils = require('../utils');
var Data = require('../data');

route.delete('/api/topic/:uniqueName', function(req, res, next) {
	utils.maxageApi(res);

	var uniqueName = req.params.uniqueName.trim().toLowerCase();

	Data.access.entity({
			where: {
				uniqueName: uniqueName
			}
		})
		.then(function(entity) {
			if (!entity) {
				return res.sendStatus(404);
			}

			return Data.control.removeUniqueName({
					where: {
						entityId: entity.id
					}
				})
				.then(function() {
					return Data.control.removePicture({
							where: {
								entityId: entity.id
							}
						})
						.then(function() {
							return Data.control.removeEntity({
									where: {
										_id: entity.id
									}
								})
								.then(function() {
									return res.sendStatus(200);
								});
						});
				});
		}, next);
});

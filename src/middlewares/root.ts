
import { Request, Response, NextFunction } from 'express';
import config from '../config';
import { maxage } from '../utils';
var packageInfo = require('../../package.json');
var entipicUrl = require('entipic.url');

var util = {
	format: require('util').format,
}

export default function (_req: Request, res: Response, next: NextFunction) {

	res.locals.util = util;
	res.locals.entipicUrl = entipicUrl;
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

	maxage(res, 60);

	next();
}

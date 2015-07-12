'use strict';

exports = module.exports = function(app) {
	app.use(require('../middlewares/root.js'));
	app.use(require('./home.js'));
	app.use(require('./topic.js'));
};

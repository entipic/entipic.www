'use strict';

var external = module.exports;

var NO_CACHE = 'private, max-age=0, no-cache';
var PUBLIC_CACHE = 'public, max-age=';
var CACHE_CONTROL = 'Cache-Control';

/**
 * Set response Cache-Control
 * @maxage integet in minutes
 */
external.maxage = function(res, maxage) {
	maxage = 0;
	var cache = NO_CACHE;
	if (maxage > 0) {
		cache = PUBLIC_CACHE + (maxage * 60);
	}
	res.set(CACHE_CONTROL, cache);
};

external.maxageTopic = function(res) {
	external.maxage(res, 60 * 1);
};

external.maxageNoPicture = function(res) {
	external.maxage(res, 60 * 4);
};

external.maxageRedirect = function(res) {
	external.maxage(res, 60 * 12);
};

external.maxageIndex = function(res) {
	external.maxage(res, 10);
};

external.maxageSearch = function(res) {
	external.maxage(res, 60 * 2);
};

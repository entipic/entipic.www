'use strict';

var express = require('express');
var core = require('entipic.core');
var _ = core._;
/*eslint new-cap:0*/
var route = module.exports = express.Router();
var utils = require('../utils.js');
var Data = require('../data.js');
var internal = {};
var url = require('url');
var config = require('../config');
var request = require('request');

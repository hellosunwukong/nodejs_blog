var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var config = require('../config');
var Server = require('mongodb').Server;
// var BSON = require('mongodb').BSON;
// var ObjectID = require('mongodb').ObjectID;
// var EventProxy = require('eventproxy').EventProxy;
// var util = require('../lib/util');

var furyBase = function(host, port) {
	this.db = new Db(config.dbname, new Server(host, port, {
		auto_reconnect: true
	},
	{}));
	this.db.open(function() {
	});
};

furyBase.prototype.getCollection = function(collection, callback) {
	var self = this;
	self.db.collection(collection, function(err, db) {
		if (err) callback(err);
		else callback(null, db);
	});
};

module.exports = new furyBase(config.dbhost, config.dbport);
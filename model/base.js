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

furyBase.prototype.findOne = function(source, collection, callback) {
	var self = this;
	this.getCollection(collection, function(err, db) {
		if (err) callback(err);
		else {
			db.findOne(source, function(err, data) {
				if (err) callback(err);
				else callback(null, data);
			});
		}
	});
};

furyBase.prototype.save = function(data, collection, callback) {
	var self = this;
	this.getCollection(collection, function(err, db) {
		if (err) callback(err);
		else {
			data['created_at'] = new Date();
			db.insert(data, function(err, data) {
				if (err) callback(err);
				else callback(null, data);
			});
		}
	});
};

furyBase.prototype.findOne = function(source, collection, callback) {
	var self = this;
	this.getCollection(collection, function(err, db) {
		if (err) callback(err);
		else {
			db.findOne(source, function(err, data) {
				if (err) callback(err);
				else callback(null, data);
			});
		}
	});
};

furyBase.prototype.getIds = function(collection, callback) {
	var self = this;
	this.getCollection('ids', function(err, db) {
		if (err) callback(err);
		else {
			db.findAndModify({
				"name": collection
			},
			["name", "asc"], {
				$inc: {
					"id": 1
				}
			},
			{
				'new': true,
				'upsert': true
			},
			callback);
		}
	});
};

furyBase.prototype.addFeed = function(data, callback) {
	var self = this;
	self.save(data, 'feed', callback);
};
module.exports = new furyBase(config.dbhost, config.dbport);
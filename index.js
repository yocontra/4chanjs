var request = require('request');

var baseUrl = "https://a.4cdn.org";
var api = {};

api.boards = function(cb) {
	var uri = [baseUrl, "boards.json"].join("/");

	request(uri, {json:true, headers: {'if-modified-since': (new Date()).toUTCString()}}, function(err, res, body){
		if (err) return cb(err);
		cb(null, body.boards);
	});

	return api;
};

api.board = function(board) {
	var subapi = {};
	subapi._board = board;
	
	subapi.image = function(file) {
		return ["https://i.4cdn.org", board, "src", file].join("/");
	};

	subapi.catalog = function(cb) {
		var uri = [baseUrl, board, "catalog.json"].join("/");

		request(uri, {json:true, headers: {'if-modified-since': (new Date()).toUTCString()}}, function(err, res, body){
			if (err) return cb(err);
			cb(null, body);
		});

		return api;
	};

	subapi.threads = function(cb) {
		var uri = [baseUrl, board, "threads.json"].join("/");

		request(uri, {json:true, headers: {'if-modified-since': (new Date()).toUTCString()}}, function(err, res, body){
			if (err) return cb(err);
			cb(null, body);
		});

		return api;
	};

	subapi.page = function(num, cb) {
		var uri = [baseUrl, board, num+".json"].join("/");

		request(uri, {json:true, headers: {'if-modified-since': (new Date()).toUTCString()}}, function(err, res, body){
			if (err) return cb(err);
			cb(null, body.threads);
		});

		return api;
	};

	subapi.thread = function(num, cb) {
		var uri = [baseUrl, board, "res", num+".json"].join("/");

		request(uri, {json:true, headers: {'if-modified-since': (new Date()).toUTCString()}}, function(err, res, body){
			if (err) return cb(err);
			cb(null, body.posts);
		});

		return api;
	};

	return subapi;
};

module.exports = api;
var request = require('request');

var baseUrl = "https://a.4cdn.org";
var api = {};

var requestOptions = {
	json: true,
	headers: {
		'if-modified-since': 0
	}
};

api.boards = function(cb) {
	var uri = [baseUrl, "boards.json"].join("/");

	request(uri, requestOptions, function(err, res, body){
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

		request(uri, requestOptions, function(err, res, body){
			if (err) return cb(err);
			cb(null, body);
		});

		return api;
	};

	subapi.threads = function(cb) {
		var uri = [baseUrl, board, "threads.json"].join("/");

		request(uri, requestOptions, function(err, res, body){
			if (res.statusCode === 404) {
				return cb(new Error('board_not_found'))
			}
			if (err) return cb(err);
			cb(null, body);
		});

		return api;
	};

	subapi.page = function(num, cb) {
		var uri = [baseUrl, board, num+".json"].join("/");

		request(uri, requestOptions, function(err, res, body){
			if (err) return cb(err);
			cb(null, body.threads);
		});

		return api;
	};

	subapi.thread = function(num, cb) {
		// To avoid any breaking changes thread() continues to
		// take the same arguments and return the same result
		// as previously but if lastModified is supplied then
		// call the new function, threadChanges().
		if (arguments.length === 3) {
			return threadChanges.apply(subapi, arguments)
		}
		var uri = [baseUrl, board, "thread", num+".json"].join("/");

		request(uri, requestOptions, function(err, res, body){
			if (err) return cb(err);
			if (res.statusCode === 404) {
				return cb(new Error('thread_not_found'));
			}
			cb(null, body.posts);
		});

		return api;
	};

	function threadChanges(num, lastModified, cb) {
		console.log(arguments)
		var uri = [baseUrl, board, "thread", num+".json"].join("/");

		requestOptionsLocal = JSON.parse(JSON.stringify(requestOptions)); // clone global request options
		if( lastModified ) requestOptionsLocal.headers['if-modified-since'] = lastModified;

		request(uri, requestOptionsLocal, function(err, res, body){
			if (err) return cb(err);
			if (res.statusCode === 404) {
				return cb(new Error('thread_not_found'));
			}
			var result = {
				lastModified: res.headers['last-modified']
			};
			if(res.statusCode === 304) {
				result.status = 'not_modified_since_last_fetch';
			} else {
				result.status = 'got_changed_posts'
				result.posts = body.posts;
			}
			cb(null, result);
		});

		return api;
	};

	return subapi;
};

module.exports = api;
var api = require('../');
var should = require('should');
require('mocha');
require('fixnode');

describe('4chan api', function() {

  describe('boards()', function() {
    it('should return a list of boards', function(done) {
      this.timeout(5000);
      api.boards(function(err, boards){
      	should.not.exist(err);
      	should.exist(boards);
      	Array.isArray(boards).should.equal(true);
      	boards.length.should.not.equal(0);
      	done();
      });
    });
  });

  describe('board()', function() {
    it('should return a board object', function(done) {
      this.timeout(5000);
      var board = api.board('b');
      should.exist(board);
      done();
    });
  });

  describe('board.catalog()', function() {
    it('should return a list of pages from /b/', function(done) {
      this.timeout(5000);
      var board = api.board('b');
      board.catalog(function(err, pages){
      	should.not.exist(err);
      	should.exist(pages);
      	Array.isArray(pages).should.equal(true);
      	pages.length.should.not.equal(0);
      	should.exist(pages[0].page);
      	pages[0].page.should.equal(1);
      	done();
      });
    });
  });

  describe('board.page()', function() {
    it('should return a list of threads from page 1 of /b/', function(done) {
      this.timeout(5000);
      var board = api.board('b');
      board.page(1, function(err, threads){
      	should.not.exist(err);
      	should.exist(threads);
      	Array.isArray(threads).should.equal(true);
      	threads.length.should.not.equal(0);
      	should.exist(threads[0].posts);
      	done();
      });
    });
  });

  describe('board.threads()', function() {
    it('should return a list of threads from page 1 of /b/', function(done) {
      this.timeout(5000);
      var board = api.board('b');
      board.threads(function(err, pages){
      	should.not.exist(err);
      	should.exist(pages);
      	Array.isArray(pages).should.equal(true);
      	pages.length.should.not.equal(0);
      	should.exist(pages[0].threads);
      	done();
      });
    });
  });

  describe('board.thread()', function() {
    it('should return a full threads from /b/', function(done) {
      this.timeout(5000);
      var board = api.board('b');
      board.threads(function(err, pages){
      	board.thread(pages[1].threads[0].no, function(err, thread){
      		should.not.exist(err);
	      	should.exist(thread);
	      	Array.isArray(thread).should.equal(true);
	      	thread.length.should.not.equal(0);
      		done();
      	})
      });
    });
  });

});

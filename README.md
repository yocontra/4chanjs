[![Build Status](https://travis-ci.org/wearefractal/4chanjs.png?branch=master)](https://travis-ci.org/wearefractal/4chanjs)

[![NPM version](https://badge.fury.io/js/4chanjs.png)](http://badge.fury.io/js/4chanjs)

## Information

<table>
<tr> 
<td>Package</td><td>4chanjs</td>
</tr>
<tr>
<td>Description</td>
<td>NodeJS and Browser 4chan API client</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.4</td>
</tr>
</table>

## Usage

```javascript
var chan = require('4chanjs');

chan.boards(function(err, boards){
	// boards is an array
});

var random = chan.board('b');

random.catalog(function(err, pages){
	// catalog returns all pages from a board
	// but the list of threads only contains the OP
});

random.page(0, function(err, threads){
	// this will return an array of threads
});

random.threads(function(err, threads){
	// this is the same as catalog
	// but shows only thread ids
});

random.thread(495627174, function(err, posts){
	// this will return an array of posts
});

// sugar for getting an image url from a filename in a post
var img = random.image("somefile.jpeg");
```

## WTF is this data

You can see an explanation on what the fields are [here.](https://github.com/4chan/4chan-API)

## LICENSE

(MIT License)

Copyright (c) 2013 Fractal <contact@wearefractal.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

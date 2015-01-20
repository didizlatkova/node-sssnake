'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/static', express.static(__dirname + '/static'));
app.use('/UI', express.static(__dirname + '/UI'));
app.use('/Logic', express.static(__dirname + '/Logic'));

app.get('/', function(req, res) {
	res.sendfile('index.html');
	var BLOCK_TYPE = require('./Logic/BlockType.js');
	var DIRECTION = require('./Logic/Direction.js');
	var CLASS_NAMES = [];
	CLASS_NAMES[BLOCK_TYPE.BLANK] = 'blank';
	CLASS_NAMES[BLOCK_TYPE.WALL] = 'wall';
	CLASS_NAMES[BLOCK_TYPE.FRUIT] = 'fruit';
	CLASS_NAMES[BLOCK_TYPE.SNAKE] = "anaconda";
	var renderer = require('./UI/Renderer.js')(CLASS_NAMES);

	var field = [[1,1,1,1,1],
				 [1,0,0,0,1],
				 [1,0,0,0,1],
				 [1,0,0,0,1],
				 [1,1,1,1,1]];
				 
	var snakeBlock = {x:1, y:1};
	var fruitBlock = {x:3, y:3};

	var Snake = require('./Logic/Snake.js');
	var Fruit = require('./Logic/Fruit.js');
	var snake = new Snake(CLASS_NAMES[BLOCK_TYPE.SNAKE], [snakeBlock], "#004A7F", 600, {left:37, right:39, up: 38, down:40}, DIRECTION.RIGHT, renderer);
	var fruit = new Fruit("https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQf9vdIFkIrxbLdNFeg3_HWWmlM3-IvNSQ9ho28jHvrNg6q5r3C", 10, fruitBlock);

	renderer.renderField(field);
	renderer.renderPoints(0);
	renderer.renderBlock(snakeBlock, SnakeNS.BLOCK_TYPE.SNAKE);
	renderer.renderBlock(fruitBlock, SnakeNS.BLOCK_TYPE.FRUIT);

	SnakeNS.EventHandler.setupEvents(snake);

	SnakeNS.Engine.start(snake, fruit, field);
});

io.on('connection', function(socket) {
	console.log('a user connected');
});

http.listen(3000, function() {
	console.log('listening on *:3000');
});
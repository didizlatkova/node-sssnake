/// <reference path="BlockType.js" />

'use strict';
var SnakeNS = SnakeNS || {};

SnakeNS.Fruit = function(img, points, coords) {
	this.img = img;
	this.points = points;
	this.coords = coords;
};

SnakeNS.Fruit.prototype = (function() {
	var generatePosition = function(field, snake) {
		var newPosition = {
			x: Math.ceil(Math.random() * field[0].length) - 1,
			y: Math.ceil(Math.random() * field.length) - 1
		};	

		while (snake.coords.filter(function(e) { return e.x === newPosition.x && e.y === newPosition.y; }).length > 0
				 || field[newPosition.y][newPosition.x] === SnakeNS.BLOCK_TYPE.WALL) {
			newPosition = {
				x: Math.ceil(Math.random() * field[0].length) - 1,
				y: Math.ceil(Math.random() * field.length) - 1
			};
		}

		this.coords = newPosition;
	},

	increasePoints = function(value) {

	}

	return {
		generatePosition: generatePosition
	};
}());
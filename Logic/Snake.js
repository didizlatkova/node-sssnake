/// <reference path="Direction.js" />
/// <reference path="BlockType.js" />
/// <reference path="Fruit.js" />

'use strict';
var SnakeNS = SnakeNS || {};

SnakeNS.Snake = function(name, coords, color, speed, controls, direction, renderer) {
	this.name = name;
	this.coords = coords;
	this.color = color;
	this.speed = speed;
	this.controls = controls;
	this.direction = direction;
	this.renderer = renderer;
	this.points = 0;
};

SnakeNS.Snake.prototype = (function() {
	var crashIntoWall = function() {
		alert("game over");
		return true;
	},

	crashIntoSelf = function() {
		alert("game over");
		return true;
	},

	checkForCollisions = function(field, block) {		
		if (field[block.y][block.x] === SnakeNS.BLOCK_TYPE.WALL) {
			return crashIntoWall();
		}
		if (this.coords.filter(function(e) { return e.x === block.x && e.y === block.y; }).length > 0) {
 			return crashIntoSelf();
		}

		return false;
	},

	eatFruit = function(fruit, field) {
		this.renderer.eraseBlock(fruit.coords);
		fruit.generatePosition(field, this);
		this.renderer.renderBlock(fruit.coords, SnakeNS.BLOCK_TYPE.FRUIT);
		this.points += fruit.points;
		this.renderer.updatePoints(this.points);
	},

	checkForFruit = function(fruit, field, block){
		if (block.y === fruit.coords.y && block.x === fruit.coords.x) {
			eatFruit.call(this, fruit, field);
			return true;
		}

		return false;
	},	

	accelerate = function(value) {

	},

	move = function(fruit, field){		
		var lastBlock = this.coords[this.coords.length - 1];
		var newBlock;		

		switch(this.direction) {
		    case SnakeNS.DIRECTION.LEFT:		    
				newBlock = {x:lastBlock.x - 1, y: lastBlock.y};				        
		        break;
		    case SnakeNS.DIRECTION.RIGHT:
		    	newBlock = {x:lastBlock.x + 1, y: lastBlock.y};
		        break;
		    case SnakeNS.DIRECTION.UP:
		    	newBlock = {x:lastBlock.x, y: lastBlock.y - 1};
		        break;
	        case SnakeNS.DIRECTION.DOWN:
	    		newBlock = {x:lastBlock.x, y: lastBlock.y + 1};
	        	break;
		}

		if(checkForCollisions.call(this, field, newBlock)){
			return true;
		}

		if (checkForFruit.call(this, fruit, field, newBlock) === false) {
			this.renderer.eraseBlock(this.coords[0]);
			this.coords.shift();
		}
		
		this.coords.push(newBlock);
		this.renderer.renderBlock(newBlock, SnakeNS.BLOCK_TYPE.SNAKE);
	},

	turnLeft = function() {
		this.direction = SnakeNS.DIRECTION.LEFT;
	},

	turnRight = function() {
		this.direction = SnakeNS.DIRECTION.RIGHT;
	},

	turnUp = function(){
		this.direction = SnakeNS.DIRECTION.UP;
	},

	turnDown = function(){
		this.direction = SnakeNS.DIRECTION.DOWN;
	}

	return {
		move: move,
		turnLeft: turnLeft,
		turnRight: turnRight,
		turnUp: turnUp,
		turnDown: turnDown
	};
}());
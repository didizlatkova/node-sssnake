/// <reference path="jquery-1.8.2.js" />
/// <reference path="../Logic/Direction.js" />

'use strict';
var SnakeNS = SnakeNS || {};

SnakeNS.EventHandler = (function() {
	return {
		setupEvents: function(snake) {
			$(document).keydown(function(e) {
				var key = e.keyCode || e.which;
				switch (key) {
					case snake.controls.left:
						e.preventDefault();
						if (snake.direction !== SnakeNS.DIRECTION.RIGHT) {
							snake.turnLeft();
						}
						break;
					case snake.controls.right:
						e.preventDefault();
						if (snake.direction !== SnakeNS.DIRECTION.LEFT) {
							snake.turnRight();
						}
						break;
					case snake.controls.up:
						e.preventDefault();
						if (snake.direction !== SnakeNS.DIRECTION.DOWN) {
							snake.turnUp();
						}
						break;
					case snake.controls.down:
						e.preventDefault();
						if (snake.direction !== SnakeNS.DIRECTION.UP) {
							snake.turnDown();
						}
						break;
				}
			});
		}
	};
}());
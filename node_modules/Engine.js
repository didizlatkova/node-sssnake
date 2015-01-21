'use strict';
var SnakeNS = SnakeNS || {};

SnakeNS.Engine = function() {};

SnakeNS.Engine = (function() {
	var game;

	return {
		run: function(snake, fruit, field) {
			if (snake.move(fruit, field)) {
				SnakeNS.Engine.end();
			}
		},

		start: function(snake, fruit, field){
			game = setInterval(this.run.bind(this, snake, fruit, field), snake.speed);
		},

		end: function(){
			clearInterval(game);
		}
	};
}());
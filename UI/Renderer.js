/// <reference path="../Logic/BlockType.js" />

'use strict';
 var SnakeNS = SnakeNS || {};

module.exports = function (classNames) {
	var renderField = function (field) {
		var table = document.createElement("table"),
			row,
			cell,
			i,
			j;

		table.id = "field";
		document.body.appendChild(table);

		for (i = 0; i < field.length; i++) {
			row = document.createElement('tr');
				for (j = 0; j < field[i].length; j++) {
					cell = document.createElement('td');
					cell.className = this.CLASS_NAMES[field[i][j]];
					cell.id = 'block-' + j + '-' + i;
					row.appendChild(cell);
				}

		table.appendChild(row);
		}
	},

	renderBlock = function (block, blockType) {
		var cell = document.getElementById('block-'+ block.x + '-' + block.y);
		cell.className = this.CLASS_NAMES[blockType];
	},

	renderPoints = function (points) {
		var pointsDiv = document.createElement("div");
		pointsDiv.id = 'points';
		pointsDiv.innerHTML = "Points: " + points;
		document.body.appendChild(pointsDiv);
	},

	updatePoints = function (points) {
		document.getElementById('points').innerHTML = "Points: " + points;
	},

	eraseBlock = function (block) {
		var cell = document.getElementById('block-'+ block.x + '-' + block.y);
		cell.className = this.CLASS_NAMES[SnakeNS.BLOCK_TYPE.BLANK];
	}

	return {
		renderField: renderField,
		eraseBlock: eraseBlock,
		renderBlock: renderBlock,
		renderPoints: renderPoints,
		updatePoints: updatePoints
	};
};
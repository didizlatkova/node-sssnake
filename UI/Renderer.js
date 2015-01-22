'use strict';
$(document).ready(function() {
	//var socket = io();

	socket.on('render field', function(CLASS_NAMES, field) {
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
				cell.className = CLASS_NAMES[field[i][j]];
				cell.id = 'block-' + j + '-' + i;
				row.appendChild(cell);
			}

			table.appendChild(row);
		}
	});

	socket.on('render points', function(points) {
		var pointsDiv = document.createElement("div");
		pointsDiv.id = 'points';
		pointsDiv.innerHTML = "Points: " + points;
		document.body.appendChild(pointsDiv);
	});

	socket.on('render block', function(block, className) {
		var cell = document.getElementById('block-' + block.x + '-' + block.y);
		cell.className = className;
	});

	socket.on('erase block', function(block, className) {
		var cell = document.getElementById('block-' + block.x + '-' + block.y);
		cell.className = className;
	});

	socket.on('game over', function() {
		alert("game over");
	});

	socket.on('update points', function(points) {
		document.getElementById('points').innerHTML = "Points: " + points;
	});
});
'use strict';	
$(document).keydown(function(e) {
	var key = e.keyCode || e.which;
	socket.emit('key pressed', key);		
});
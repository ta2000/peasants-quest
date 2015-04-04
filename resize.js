window.onresize = function() {
	resize();
}

function resize() {
	canvas.width = window.innerWidth - 30;
	canvas.height = window.innerHeight - 30;
}
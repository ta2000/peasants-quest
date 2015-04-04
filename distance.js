function distance( obj1, obj2, dist ) {
	var dx 	= Math.abs(obj1.x - obj2.x)
	var dy 	= Math.abs(obj1.y - obj2.y);
	var hyp	= Math.sqrt( (dx*dx)+(dy*dy) );
	if (hyp<=dist) {
		return true;
	} else {
		return false;
	};
}

function closeTo( x1, x2, y1, y2, dist ) {
	var dx 	= Math.abs(x1 - x2)
	var dy 	= Math.abs(y1 - y2);
	var hyp	= Math.sqrt( (dx*dx)+(dy*dy) );
	if (hyp<=dist) {
		return true;
	} else {
		return false;
	};
}
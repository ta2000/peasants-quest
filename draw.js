function draw() {
	canvas.width = canvas.width;

	for ( var i in entities ) {
		if (typeof entities[i].image !== 'undefined') {
			switch(entities[i].constructor) {
				case sprite:
					entities[i].draw( ctx,.5 );
				break;
				case Friendly:
					entities[i].draw( ctx,1.5 )
				break;
				default:
					entities[i].draw( ctx,2 );
				break;
			}
		//	drawCoords();
		};
	};

	if (raining) {
		ctx.globalAlpha = .5;
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.globalAlpha = 1;
	}

	drawHud();
	movement();


	window.requestAnimationFrame(draw);
}


function drawCoords() {
	ctx.font = "24px Garamond";
	ctx.fillStyle = 'white';
	for ( var u in entities ) {
		if (entities[u].constructor != Rain) {
			ctx.fillText( u+":"+entities[u].x+", "+entities[u].y, entities[u].x, entities[u].y+entities[u].image.height/1.8 );
		}
		if (typeof entities[u].happiness !== 'undefined') {
			ctx.fillStyle = "yellow";
			ctx.fillText(entities[u].happiness, entities[u].x+60, entities[u].y+200);
			ctx.fillStyle = "white";
		};
	};
}

function drawHud() {
	var happiness = [];
	var average = 0;
	for (var i in entities) {
		if (typeof entities[i].happiness !== "undefined") {
			happiness.push(entities[i].happiness);
		};
	};
	for (var i = 0; i < happiness.length; i++) {
		average+=happiness[i];
	};
	average = average/happiness.length;

	// Hud
	ctx.fillStyle = "black";
	ctx.globalAlpha = .5;
	ctx.fillRect(20, canvas.height-220, 400, 190);
	ctx.globalAlpha = 1;
	ctx.font = "24px Garamond";
	// Energy
	ctx.fillStyle = "lime";
	ctx.fillText("Energy:", 24, canvas.height-190);
	if (entities.player.energy>0) {
			ctx.fillRect(24, canvas.height-180, entities.player.energy*3.8, 40);
	};

	// Happiness
	ctx.fillStyle = "yellow";
	ctx.fillText("Town Happiness:", 24, canvas.height-110);
	ctx.fillRect(24, canvas.height-100, average*3.8, 40);

	// Reset
	happiness = [];
	average = 0;
}
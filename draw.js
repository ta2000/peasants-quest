function draw() {
	canvas.width = canvas.width;

	for ( var i in entities ) {
		if (typeof entities[i].image !== 'undefined') {
			switch(entities[i].constructor) {
				case sprite:
					entities[i].draw( ctx,.5 );
				break;
				case Friendly:
					entities[i].draw( ctx,1.5 );
				break;
				case basicObj:
					entities[i].draw( ctx,.5 );
				break;
				case House:
					entities[i].draw( ctx,.85 );
				break;
				default:
					entities[i].draw( ctx,2 );
				break;
			}
		};
		if (typeof entities[i].mission !== "undefined") {
			ctx.font = "24px Garamond";
			ctx.fillStyle = 'white';
			if (entities[i].displayMission == true) {
				ctx.fillText(entities[i].mission, entities[i].x-200, entities[i].y-20);
			};	
		};
	};

	if (raining) {
		ctx.globalAlpha = .5;
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.globalAlpha = 1;
	}

	//drawTarget();
	//drawCoords();
	drawHud();
	movement();


	window.requestAnimationFrame(draw);
}

function drawTarget() {
	ctx.strokeStyle = 'orange';
	ctx.lineWidth=5;
	for ( var u in entities ) {
		if (typeof entities[u].dest !== 'undefined') {
			ctx.beginPath();
			ctx.moveTo(entities[u].x+entities[u].image.width/3,entities[u].y+entities[u].image.height/4);
			ctx.lineTo(entities[u].dest[0],entities[u].dest[1]);
			ctx.stroke();
		};
	};
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

function drawInventory() {
	ctx.fillStyle = "#000000";
	ctx.fillRect(entities.player.x-200, entities.player.y-106, 512, 112);
	ctx.fillStyle = "#FFCC00";
	ctx.fillRect(entities.player.x-194, entities.player.y-100, 500, 100);
	for (var i = 0; i < entities.player.inventory.length; i++) {

		ctx.beginPath();
		ctx.rect(entities.player.x-194+(i*48)+16, entities.player.y-72, 32, 32);
		ctx.fillStyle = "#FFCC00";
		ctx.fill();
		ctx.lineWidth = 4;
		ctx.strokeStyle = "#3399FF";
		ctx.stroke();
		
		ctx.drawImage(entities.player.inventory[i], (entities.player.x-194+(i*48))+16, entities.player.y-72);
	}
		ctx.globalAlpha = 1;
	ctx.font = "italic 24px Garamond";
	ctx.fillStyle = '#3399FF';
	ctx.fillText("INVENTORY", entities.player.x, entities.player.y-80);
}
function movement() {
	for ( var i in entities ) {
		// Player
		if ( typeof entities[i].move !== "undefined" ) {
			entities[i].move(i);
		};
		if ( entities[i].constructor == Friendly ) {
			switch(entities[i].missionType) {
				case "w":
					entities[i].wander();
					break;
				case "l":
					entities[i].locked();
					break;
			}
		};
	};
	playMusic();
};


/*-------------- PLAYER KEY HANDLING --------------*/
window.onkeydown = key_down;
function key_down(e) {
	entities.player.keysDown[e.keyCode] = true;
}

window.onkeyup = key_up;
function key_up(e) {
	delete entities.player.keysDown[e.keyCode];
}
Player.prototype.move = function(i) {
	/*--W--*/
	if ( 87 in entities[i].keysDown ) {
		for ( var u in entities ) {
			if (entities[u].constructor != Player) {
				entities[u].y += entities.player.speed;
				// Move enemy destination
				if ( typeof entities[u].dest !== 'undefined' ) {
					entities[u].dest[1] += entities.player.speed;
				};
			};
		};
	};
	/*--A--*/
	if ( 65 in entities[i].keysDown ) {
		for ( var u in entities ) {
			if (entities[u].constructor != Player) {
				entities[u].x += entities.player.speed;
				// Move enemy destination
				if ( typeof entities[u].dest !== 'undefined' ) {
					entities[u].dest[0] += entities.player.speed;
				};
			};
		};
		entities[i].image.src = 'images/sprites/player/player_left.png';
	};
	/*--S--*/
	if ( 83 in entities[i].keysDown ) {
		for ( var u in entities ) {
			if (entities[u].constructor != Player) {
				entities[u].y -= entities.player.speed;
				// Move enemy destination
				if ( typeof entities[u].dest !== 'undefined' ) {
					entities[u].dest[1] -= entities.player.speed;
				};
			};
		};
	};
	/*--D--*/
	if ( 68 in entities[i].keysDown ) {
		for ( var u in entities ) {
			if (entities[u].constructor != Player) {
				entities[u].x -= entities.player.speed;
				// Move enemy destination
				if ( typeof entities[u].dest !== 'undefined' ) {
					entities[u].dest[0] -= entities.player.speed;
				};
			};
		};
		entities[i].image.src = 'images/sprites/player/player_right.png';
	};
	/*--I--*/
	if ( 73 in entities[i].keysDown ) {
		drawInventory();
	};

};

var playerPos = 0;
setInterval( function() {
	if (true) {
		if (playerPos == 0) {
			playerPos = 1;
			entities.player.y -= 5;
		} else {
			playerPos = 0;
			entities.player.y += 5;
		};
	};
}, 500);

/*-------------- KNIGHT AI --------------*/
Enemy.prototype.move = function() {

	// Music
	if ( distance(this, entities.player, canvas.width-500) ) {
		if (!raining) {
			addRain();
		};
		if (music != threat) {
			pauseMusic();
		}
		//music = threat;
	} else {
		raining = false;
		pauseMusic();
		//music = king;
	}
	// Pursue player
	if ( distance(this, entities.player, canvas.width-700) ) {
		this.dest[0] = entities.player.x;
		this.dest[1] = entities.player.y;	
		this.speed = 4;
	}
	else
	{
		this.speed = 1;
	};
	// Remove player energy
	if ( distance(this, entities.player, 100) ) {
		entities.player.energy-=.1;
	}
	if ( this.x < this.dest[0] ) {
		this.x += this.speed;
		this.image.src = 'images/sprites/enemies/knight_right.png';
	};
	if ( this.x > this.dest[0] ) {
		this.x -= this.speed;
		this.image.src = 'images/sprites/enemies/knight_left.png';
	};
	if ( this.y < this.dest[1] ) {
		this.y += this.speed;
	};
	if ( this.y > this.dest[1] ) {
		this.y -= this.speed;
	};
	if ( closeTo(this.x, this.dest[0], this.y, this.dest[1], 10) ) {
		this.dest[0] = Math.floor(Math.random()*canvas.width);
		this.dest[1] = Math.floor(Math.random()*canvas.height);	
	};
};


/*-------------- FRIENDLY AI --------------*/
Friendly.prototype.move = function() {
	// Pushing around
	if ( distance(this, entities.player, 80) ) {
		if (entities.player.x > this.x) {
			this.x-=entities.player.speed-1;
		};
		if (entities.player.x < this.x) {
			this.x+=entities.player.speed-1;
		};
		if (entities.player.y > this.y) {
			this.y-=entities.player.speed-1;
		};
		if (entities.player.y < this.y) {
			this.y+=entities.player.speed-1;
		};
	};

	// Avoid collision
	for ( var i in entities ) {
		if ( distance(this, entities[i], 100) && entities[i]!=this ) {
			this.dest[0] = this.dest[0]+getRandomInt(-50, 50);
			this.dest[1] = this.dest[1]+getRandomInt(-50, 50);
		};
	}
	
	// Move towards destination
	if ( this.x < this.dest[0] ) {
		this.x += this.speed;
		this.image.src = 'images/sprites/villager/villager1_happy.png';
	};
	if ( this.x > this.dest[0] ) {
		this.x -= this.speed;
		this.image.src = 'images/sprites/villager/villager1_happy.png';
	};
	if ( this.y < this.dest[1] ) {
		this.y += this.speed;
	};
	if ( this.y > this.dest[1] ) {
		this.y -= this.speed;
	};

	if ( distance(this, entities.player, 200) ) {
		if ( 69 in entities.player.keysDown ) {
			this.displayMission = true;
			if (this.x > entities.player.x) {
				this.dest[0] = entities.player.x+180;
			} else {
				this.dest[0] = entities.player.x-100;
			}
			this.dest[1] = entities.player.y+20;
		}
	} else {
		this.displayMission = false;
	}

};

Friendly.prototype.wander = function() {
	// Reset destination once destination is reached
	if ( closeTo(this.x, this.dest[0], this.y, this.dest[1], 10) && Math.floor(Math.random()*50)==0 ) {
		this.dest[0] = this.dest[0]+getRandomInt(-200, 200);
		this.dest[1] = this.dest[1]+getRandomInt(-200, 200);
	};

	// Destination is too far left
	if ( this.dest[0] < entities.level.x ) {
		this.dest[0] += getRandomInt(0, 400);
	};
	// Destination is too far up
	if (this.dest[1] < entities.level.y ) {
		this.dest[1] += getRandomInt(0, 400);
	}
	// Destination is too far right
	if ( this.dest[0] > entities.level.image.width - entities.level.x ) {
		this.dest[0] += getRandomInt(-400, 0);
	};
	// Destination is too far down
	if (this.dest[1] > entities.level.image.height - entities.level.y ) {
		this.dest[1] += getRandomInt(-400, 0);
	}

	// Add happiness when near player (temporary)
	if ( distance(this, entities.player, 100) ) {
		if (this.happiness < 100 && entities.player.energy>0) {
			this.happiness++;
			entities.player.energy-=.01;
		};
	};

	// Pushing around
	if ( distance(this, entities.player, 80) ) {
		this.dest[0] = this.dest[0]+getRandomInt(-200, 200);
		this.dest[1] = this.dest[1]+getRandomInt(-200, 200);
	};

};

Friendly.prototype.locked = function() {
	if (this.createdObj == false) {
		this.createdObj = true;
		switch (this.lockedObj) {
			case "tree_cat":
					entities['tree'+this.id] = new basicObj( 'images/sprites/tree.png', this.x+getRandomInt(-500, 500), this.y+getRandomInt(-500, 500) );
					entities['missionObj'+this.id] = new missionObj( 'images/sprites/cat.png', entities['tree'+this.id].x, entities['tree'+this.id].y );
				break;
			case "tree_dog":
					entities['tree'+this.id] = new basicObj( 'images/sprites/tree.png', this.x+getRandomInt(-500, 500), this.y+getRandomInt(-500, 500) );
					entities['missionObj'+this.id] = new missionObj( 'images/sprites/cat.png', entities['tree'+this.id].x, entities['tree'+this.id].y );
				break;
			case "house_fire":
					entities['house'+this.id] = new basicObj( 'images/sprites/buildings/house.png', this.x+getRandomInt(-500, 500), this.y+getRandomInt(-500, 500) );
				break;
			case "tree_child":
					entities['tree'+this.id] = new basicObj( 'images/sprites/tree.png', this.x+getRandomInt(-500, 500), this.y+getRandomInt(-500, 500) );
					entities['missionObj'+this.id] = new missionObj( 'images/sprites/cat.png', entities['tree'+this.id].x, entities['tree'+this.id].y );
				break;
		}
	};
	switch (this.lockedObj) {
		case "tree_cat":
			this.dest[0] = entities['tree'+this.id].x-100;
			this.dest[1] = entities['tree'+this.id].y+.8*(entities['tree'+this.id].image.height/.5);
			break;
		case "tree_dog":
			this.dest[0] = entities['tree'+this.id].x-100;
			this.dest[1] = entities['tree'+this.id].y+.8*(entities['tree'+this.id].image.height/.5);
			break;
		case "house_fire":
				entities['house'+this.id] = new basicObj( 'images/sprites/buildings/house.png', this.x+getRandomInt(-500, 500), this.y+getRandomInt(-500, 500) );
			break;
		case "tree_child":
			this.dest[0] = entities['tree'+this.id].x-100;
			this.dest[1] = entities['tree'+this.id].y+.8*(entities['tree'+this.id].image.height/.5);
			break;
	}
};

/*-------------- TREE --------------*/
basicObj.prototype.move = function() {
	if ( distance(this, entities.player, 200) ) {
		if ( 69 in entities.player.keysDown ) {
			this.activated = true;
			delete this.obj;
		}
	}
};
/*-------------- RAIN --------------*/
Rain.prototype.move = function() {
	this.y += 12;
	this.x -= entities.player.x/canvas.width;

	if (this.y > canvas.height || this.x < 0) {
		if (raining) {
			this.y = this.y = 0-(Math.floor(Math.random()*500));
			this.x = Math.floor(Math.random()*canvas.width);
		} else {
			delete this;
		}
	};
};


/*-------------- CUTSCENE --------------*/
function cutscene(e) {
	var targetX = Math.round(canvas.width/2.2);
	var targetY = Math.round(canvas.height/3);
	if (e.x < targetX) {
		for (var i in entities) {
			entities[i].x+=entities.player.speed;
		};
	};
	if (e.x > targetX) {
		for (var i in entities) {
			entities[i].x-=entities.player.speed;
		};
	};
	if (e.y < targetY) {
		for (var i in entities) {
			entities[i].y+=entities.player.speed;
		};
	};
	if (e.y > targetY) {
		for (var i in entities) {
			entities[i].y-=entities.player.speed;
		};
	};
}
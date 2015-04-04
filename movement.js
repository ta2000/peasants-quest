function movement() {
	for ( var i in entities ) {
		// Player
		if ( typeof entities[i].move !== "undefined" ) {
			entities[i].move(i);
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
				if ( entities[u].constructor == Enemy ) {
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
				if ( entities[u].constructor == Enemy ) {
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
				if ( entities[u].constructor == Enemy ) {
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
				if ( entities[u].constructor == Enemy ) {
					entities[u].dest[0] -= entities.player.speed;
				};
			};
		};
		entities[i].image.src = 'images/sprites/player/player_right.png';
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

	// Bouncing anim
	var time = Date.now().toString()[10];
	if ( parseInt(time)>4 ) {
		this.y+=2;
	} else {
		this.y-=2;
	}

	// Music
	if ( distance(this, entities.player, canvas.width-500) ) {
		if (!raining) {
			addRain();
		};
		if (music != threat) {
			pauseMusic();
		}
		music = threat;
	} else {
		raining = false;
		pauseMusic();
		music = king;
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
	this.x+=this.speed;
	if ( distance(this, entities.player, 100) ) {
		if (this.happiness < 100 && entities.player.energy>0) {
			this.happiness++;
			entities.player.energy-=.01;
		};
	};
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
			entities[i].x++;
		}
	};
	if (e.x > targetX) {
		for (var i in entities) {
			entities[i].x--;
		};
	};
	if (e.y < targetY) {
		for (var i in entities) {
			entities[i].y++;
		}
	};
	if (e.y > targetY) {
		for (var i in entities) {
			entities[i].y--;
		};
	};

	setInterval( function() {
		cutscene(e);
	}, 200);
}
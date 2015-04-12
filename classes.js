var entities = {};

var sprite = function sprite( img ) {
	this.image = new Image();
	this.image.src = img;
	this.x = 0;
	this.y = 0;
	return this;
}
sprite.prototype.draw = function( ctx, d ) {
	ctx.drawImage(this.image, this.x, this.y, this.image.width/d, this.image.height/d);
}

// Player //
var Player = function Player( speed, energy, img ) {
	this.speed = speed;
	this.energy = energy;
	this.image.src = img;
	this.keysDown = {};
	this.inventory = [apple, apple];
}
Player.prototype = new sprite();
Player.prototype.constructor = Player;

// Friendly //
var Friendly = function Friendly( speed, happiness, img ) {
	this.speed = speed;
	this.happiness = happiness;
	this.image.src = img;
	this.dest = [this.x+getRandomInt(-200, 200), this.y+getRandomInt(-200, 200)];
	this.mission = missions[Math.floor(Math.random()*missions.length)];
}
Friendly.prototype = new sprite();
Friendly.prototype.constructor = Friendly;

// Enemy //
var Enemy = function Enemy( speed, img ) {
	this.speed = speed;
	this.image.src = img;
	this.dest = [Math.floor(Math.random()*canvas.width), Math.floor(Math.random()*canvas.height)];
}
Enemy.prototype = new sprite();
Enemy.prototype.constructor = Enemy;

// Rain //
var Rain = function Rain( speed, img ) {
	this.speed = speed;
	this.image.src = img;
}
Rain.prototype = new sprite();
Rain.prototype.constructor = Rain;

var raining = false;

function addRain() {
	for (var i = 0; i < 1000; i++) {
		entities['rain'+i] = new Rain( 20, 'images/rain.png' );
		entities['rain'+i].x = Math.floor(Math.random()*canvas.width);
		entities['rain'+i].y =  0-(Math.floor(Math.random()*2000));
	};
	raining = true;
}
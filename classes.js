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
var Friendly = function Friendly( speed, happiness, img, id ) {
	this.speed = speed;
	this.happiness = happiness;
	this.image.src = img;
	this.dest = [this.x+getRandomInt(-200, 200), this.y+getRandomInt(-200, 200)];
	// Assign mission
	var randomMission = missions[Math.floor(Math.random()*missions.length)];
	this.mission = randomMission[0];
	this.missionType = randomMission[1];
	this.displayMission = false;
	// Only for Lw/O peasants
	this.createdObj = false;
	this.lockedObj = randomMission[2];
}
Friendly.prototype = new sprite();
Friendly.prototype.constructor = Friendly;



/********** MISSION OBJECTS **********/
var cat = function cat( x, y ) {
	this.image.src ='images/sprites/cat.png';
	this.x = x;
	this.y = y;
	this.activated = false;
}
cat.prototype = new sprite();
cat.prototype.constructor = cat;

var dog = function dog( x, y ) {
	this.image.src = 'images/sprites/dog.png';
	this.x = x;
	this.y = y;
	this.activated = false;
}
dog.prototype = new sprite();
dog.prototype.constructor = dog;

var houseFire = function houseFire( x, y ) {
	this.image.src = 'images/sprites/buildings/house.png';
	this.x = x;
	this.y = y;
	this.activated = false;
}
houseFire.prototype = new sprite();
houseFire.prototype.constructor = houseFire;

var fire = function fire( x, y ) {
	this.image.src = 'images/sprites/buildings/house.png';
	this.x = x;
	this.y = y;
	this.activated = false;
}
fire.prototype = new sprite();
fire.prototype.constructor = fire;

var treeChild = function treeChild( x, y ) {
	this.image.src = 'images/sprites/villager/child.png';
	this.x = x;
	this.y = y;
	this.activated = false;
}
treeChild.prototype = new sprite();
treeChild.prototype.constructor = treeChild;


/********** MISSION OBJECTS **********/



/********** DECORATION OBJECTS **********/
// Tree //
var Tree = function Tree( x, y ) {
	this.image.src = 'images/sprites/tree.png';
	this.x = x;
	this.y = y;
}
Tree.prototype = new sprite();
Tree.prototype.constructor = Tree;

// Enemy //
var Enemy = function Enemy( speed, img ) {
	this.speed = speed;
	this.image.src = img;
	this.dest = [Math.floor(Math.random()*canvas.width), Math.floor(Math.random()*canvas.height)];
}
Enemy.prototype = new sprite();
Enemy.prototype.constructor = Enemy;

// Buildings //
var House = function House( img, x, y ) {
	this.image.src = img;
	this.x = x;
	this.y = y;
}
House.prototype = new sprite();
House.prototype.constructor = House;


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
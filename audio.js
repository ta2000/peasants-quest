var music = theme1;

var theme1 = new Audio('audio/theme1.wav');
var threat = new Audio('audio/threat.wav');
var king = new Audio('audio/king.wav');

function playMusic() {
	switch(music) {
		case theme1:
			theme1.play();
			break;
		case threat:
			threat.play();
			break;
		case king:
			king.play();
			break;
	}
}

function pauseMusic() {
	switch(music) {
		case theme1:
			theme1.pause();
			break;
		case threat:
			threat.pause();
			break;
		case king:
			king.pause();
			break;
	}
}
let w = 900;
let h = 900;

let refreshrate = 60;

let game, button, lasttime, time, first;

function setup() {
	frameRate(refreshrate);
	createCanvas(w, h);
	game = new Game(w, h);
	time = 0;
	lasttime = second();
	first = true;
	button = createButton('Start!');
	button.position(w/2-23, h/2-10);
	button.mousePressed(start);
	noLoop();
}

function draw() {
	background(220);
	game.update();
	game.draw();
	if(lasttime!=second() && !first) {
		lasttime = second();
		time++;
	}
	text(time, width/2, 32);
	if(time >= 20) {
		done();
	}
}

function start() {
	lasttime = second();
	first = false;
	button.hide();
	game.score.reentries--;
	loop();
}

function done() {
	game.target.position = createVector(width/2, height/2);
	background(220);
	game.draw();
	text(time, width/2, 32);

	game.score.reset();
	time = 0;

	button.text = "Reset";
	button.show();
	noLoop();
}
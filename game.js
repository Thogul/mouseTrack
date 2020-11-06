class Game {
    constructor(w, h) {
        this.score = new Score();
        this.target = new Target(w/2, h/2, 5, 30);
    }

    update() {
        this.target.update();
        this.score.update(this.target);
    }

    draw() {
        this.target.draw();
        this.score.draw();
    }
}
class Score {
    constructor () {
        this.score = 0;
        this.word = 'Score: ';
        this.outside = false;
        this.reentries = 0;
    }

    update(target) {
        let x = abs(target.position.x - mouseX);
        let y = abs(target.position.y - mouseY);
        let distance = sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  
        if (distance <= target.ro){
          this.score += this.calculateScore(distance, target.ro);
          if (this.outside) {
              this.reentries++;
              this.outside = false;
          }
        }
        else if (!this.outside) {
            this.outside = true;
        }
    }

    draw() {
        textSize(32);
        fill('red');
        text(this.word + this.score, 10, 32);
        text("Reentries: " + this.reentries, width-200, 32);
    }

    calculateScore(distance, maxDistance) {
        let points = 0;
        points = (maxDistance-distance)/8;
        points = Math.ceil(points);
        return points;
    }

    reset() {
        this.score = 0;
        this.reentries = 0;
    }
}
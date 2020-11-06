class Target {
    constructor (x, y, ri, ro) {
        this.ri = ri;
        this.ro = ro;

        this.acceleration = createVector(0, 0);
        this.velocity = p5.Vector.random2D();
        this.position = createVector(x, y);
        this.maxspeed = 3;
        this.maxforce = 1.5;
        this.centerpullscale = 0.0001;
        this.tofarfromcenter = 380;
    }
    
    update () {
        this.applyforce();
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxspeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }
    
    draw() {
        fill('white')
        ellipse(this.position.x, this.position.y, this.ro*2, this.ro*2);
        fill('red');
        ellipse(this.position.x, this.position.y, this.ri*2, this.ri*2);

        /*
        //draw big circle where to force to center starts applying
        noFill();
        ellipse(width/2, height/2, this.tofarfromcenter*2, this.tofarfromcenter*2);
        */
    }

    applyforce() {
        let rndForce = createVector(random(-1, 1), random(-1, 1));
        rndForce.limit(this.maxforce);
        this.acceleration.add(rndForce);
        
        //this.acceleration.add(createVector(0, 0).limit(this.maxforce));
        this.acceleration.add(this.centerforce());
    }

    centerforce() {
        let distance = sqrt(pow(this.position.x-width/2, 2) +
                            pow(this.position.y-height/2, 2));

        if (distance<this.tofarfromcenter) {
        return createVector(0, 0);
        }

        let centerDforce = createVector(width/2-this.position.x,
            height/2-this.position.y);
        centerDforce.limit(1); //we want the vector to just point

        //find the disctance from center and apply an equation on that
        let scale = this.equation(distance);
        centerDforce.mult(scale);
        centerDforce.limit(this.maxforce*1.5);
        return centerDforce
    }

    equation(x) {
        let y = 0.01*pow(x-this.tofarfromcenter, 2);
        //let y = tan(5.84+0.01*x);
        return y;
    }
  }
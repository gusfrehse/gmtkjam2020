class target {
    constructor(pos, lifetime, size) {
        this.position = pos;
        this.lifetime = lifetime;
        this.size = size;
        this.dead = false;
	this.color = [255, 0, 0]
	this.outlineColor = [255, 255, 255];
    }

    update() {
        this.lifetime -= deltaTime/1000;
    }

    draw() {
        if (!this.dead) {
	    stroke(this.outlineColor);
	    noFill();
	    circle(this.position.x, this.position.y, this.size + Math.pow(2, this.lifetime*4));
            noStroke();
            fill(255, 0, 0, map(this.lifetime, 0, 5, 0, 255));
            circle( this.position.x, this.position.y, this.size);
        }
    }
}

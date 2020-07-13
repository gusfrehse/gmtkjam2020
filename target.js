class target {
    constructor(pos, lifetime, size) {
        this.position = pos;
        this.lifetime = lifetime;
        this.size = size;
        this.dead = false
    }

    update() {
        this.lifetime -= deltaTime/1000;
    }

    draw() {
        if (!this.dead) {
            noStroke();
            fill(255, 0, 0);
            circle( this.position.x, this.position.y, this.size);
        }
    }
}
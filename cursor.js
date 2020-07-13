class normalCursor {
    constructor(position = { x: width/2, y: height/2 }, sensitivity = 1.0) {
        this.sensitivity = sensitivity;
        this.position = position;
    }

    update(sensitivity = this.sensitivity) {
        this.sensitivity = sensitivity;
        if (document.pointerLockElement || document.mozPointerLockElement) {
            this.position.x = mod(this.position.x + movedX * this.sensitivity, width);
            this.position.y = mod(this.position.y + movedY * this.sensitivity, height);
        }
    }

    draw() {
        noFill();
        strokeWeight(1);
        stroke(pallete[0]);
        circle(this.position.x, this.position.y, 45);
        strokeWeight(2);
        point(this.position.x, this.position.y);  
    }
}

class hSensCursor extends normalCursor {
    constructor(pos = { x: width/2, y: height/2 }, sensitivity = 1.0, scale = 2) {
        super(pos, sensitivity * scale);
    }
}

class lSensCursor extends normalCursor {
    constructor( pos = { x: width/2, y: height/2 }, sensitivity = 1.0, scale = 0.5) {
        super(pos, sensitivity * scale);
    }
}

class xFlipCursor extends normalCursor {
    constructor(pos = { x: width/2, y: height/2 }, sensitivity = 1.0) {
        super(pos, sensitivity);
    }

    update(sensitivity = this.sensitivity) {
        this.sensitivity = sensitivity;
        if (document.pointerLockElement || document.mozPointerLockElement) {
            this.position.x = mod(this.position.x - movedX * this.sensitivity, width);
            this.position.y = mod(this.position.y + movedY * this.sensitivity, height);
        }
    }
}

class yFlipCursor extends normalCursor {
    constructor(pos = { x: width/2, y: height/2 }, sensitivity = 1.0) {
        super(pos, sensitivity);
    }

    update(sensitivity = this.sensitivity) {
        this.sensitivity = sensitivity;
        if (document.pointerLockElement || document.mozPointerLockElement) {
          this.position.x = mod(this.position.x + movedX * this.sensitivity, width);
          this.position.y = mod(this.position.y - movedY * this.sensitivity, height);
        }
    }
}

class xyFlipCursor extends normalCursor {
    constructor( pos = { x: width/2, y: height/2 }, sensitivity = 1.0) {
        super(pos, sensitivity);
    }

    update(sensitivity = this.sensitivity) {
        this.sensitivity = sensitivity;
        if (document.pointerLockElement || document.mozPointerLockElement) {
           this.position.x = mod(this.position.x - movedX * this.sensitivity, width);
           this.position.y = mod(this.position.y - movedY * this.sensitivity, height);
        }
    }
}
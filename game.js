class game {
    static phases = {
        NORMAL : {cursor : normalCursor, velocity : 1.0,
		  color : [100, 100, 100], remainedTime : 0, name : "normal"},
        HSENS  : {cursor : hSensCursor,  velocity : 1.0,
		  color : [ 60, 120,  74], remainedTime : 0, name : "hsens"},
        LSENS  : {cursor : lSensCursor,  velocity : 1.0,
		  color : [143,  93,  40], remainedTime : 0, name : "lsens"},
        XFLIP  : {cursor : xFlipCursor,  velocity : 1.0,
		  color : [143,  40,  40], remainedTime : 0, name : "xflip"},
        YFLIP  : {cursor : yFlipCursor,  velocity : 1.0,
		  color : [ 33, 130, 125], remainedTime : 0, name : "yflip"},
        XYFLIP : {cursor : xyFlipCursor, velocity : 1.0,
		  color : [ 67,  33, 130], remainedTime : 0, name : "xyflip"},
    }
    constructor() {
        this.maxLives = 3;
        this.score = 0;
        this.lives = this.maxLives;
        this.phase = game.phases.NORMAL;
        this.cursor = new this.phase.cursor();
        this.level = 0;
        this.phaseQueue = new Array();
        this.generatePhaseQueue();
        this.phaseTime = 5;
        this.prevTime = Date.now();
        this.targetsPerPhase = 3;
        this.targetSize = 150;
        this.targetQueue = new Array();
        this.generateTargetQueue();
        this.currTarget = new target({x: Math.random() * width, y: Math.random() * height},
                                     this.phaseTime / this.targetsPerPhase, this.targetSize);
        this.startTime = Date.now();
    }

    update() {
        let now = Date.now();
        this.score = (now - this.startTime) / 10000;
        if (this.lives <= 0) {
            this.end();
        }

        if (now/1000 - this.prevTime/1000 > this.phaseTime) {
            // Phase change
            this.phase = this.phaseQueue.shift();
            this.cursor = new this.phase.cursor(this.cursor.position, 1.0);
            //console.log(this.phase.name);

            if (this.phaseQueue.length <= 0) {
                //this.phaseTime /= 3;
                this.generatePhaseQueue();
                this.level++;
                this.phaseTime -= Math.log1p(this.level) / 2;
            }

            this.generateTargetQueue();
            this.prevTime = Date.now();
        }

        this.currTarget.update();
        if (this.currTarget.lifetime <= 0) {
            if (!this.currTarget.dead) {
                this.lives--;
            }
            this.currTarget = this.targetQueue.shift();
        }
        this.cursor.update();
    }

    draw() {
        background(this.phase.color);
        // score
        //text();
        this.currTarget.draw();
            imageMode(CENTER);
            for (let i = 0; i < this.lives; i++) {
                image(redHeart, width/20 * (i + 1), height/20, width/20, 40 + height/20);
            }
            for (let i = this.maxLives; i > this.lives; i--) {
                image(emptyHeart, width/20 * (i),   height/20, width/20, 40 + height/20);
    
            }
        this.cursor.draw();
    }

    mouseClicked() {
        let d = dist(this.cursor.position.x, this.cursor.position.y,
		     this.currTarget.position.x, this.currTarget.position.y);
        if (d < this.currTarget.size) {
            // cursor inside  
            this.currTarget.dead = true;
        } else {
            this.lives--;
        }
    }

    mouseDragged() {
        this.cursor.update();
    }

    mouseMoved() {
        this.cursor.update();
    }

    generatePhaseQueue() {
        let keys = Object.keys(game.phases);
        shuffleArray(keys);
        
        for (let k of keys) {
            this.phaseQueue.push(game.phases[k]);
        }
    }

    generateTargetQueue() {
        for (let i = 0; i < this.targetsPerPhase; i++) {
            this.targetQueue.push(new target({x: Math.random() * width, y: Math.random() * height},
                                  this.phaseTime / this.targetsPerPhase,
                                  this.targetSize));
        }
    }

    end() {
        alert(`You died in level ${this.level} with score ${this.score}`);
        currentScene = new menu();
    }
}

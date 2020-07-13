class menu {
    constructor() {
        this.cursor = new normalCursor();
        this.buttons = [{name : "start",    callback : this.start,    cursorIn : false},
                        {name : "help",     callback : this.help ,    cursorIn : false},
                        {name : "settings", callback : this.settings, cursorIn : false}]
    }

    update() {
    }

    draw() {
        background(pallete[4]);
        for (let i in this.buttons) {
            let x = width/2;
            let y = (height/2) + (height/(2 * this.buttons.length)) * i;
            let w = width/3;
            let h = height/10

            rectMode(CENTER);
            noStroke();
            if (!(this.cursor.position.x > x + w/2 ||
                  this.cursor.position.x < x - w/2 ||
                  this.cursor.position.y > y + h/2 ||
                  this.cursor.position.y < y - h/2)) {
                
                // Cursor inside rect
                fill(pallete[2])
                this.buttons[i].cursorIn = true;
            } else {
                fill(pallete[3]);
                this.buttons[i].cursorIn = false;
            }
            rect(x, y, w, h)
            

            noStroke();
            fill(pallete[1])
            textAlign(CENTER, CENTER);
            textSize(50);
            text(this.buttons[i].name,x, y)
        }
        this.cursor.draw();
    }

    mouseClicked() {
        for (let button of this.buttons) {
            if (button.cursorIn) {
                button.callback();
            break;
            }
        }

    }

    mouseDragged() {
        this.cursor.update();
    }

    mouseMoved() {
        this.cursor.update();
    }

    start() {
        currentScene = new game();
    }
    help() {console.log("help")}
    settings() {console.log("settings")}

}
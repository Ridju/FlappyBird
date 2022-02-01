import { Constants } from './index.mjs';

class Pipe { 
    constructor() { 
        this.topPipeY = this.randomIntFromInterval(-180, -20);
        this.x = Constants.WIDTH;
        this.botPipeY = this.topPipeY + Constants.PIPEHEIGHT + Constants.PIPESPACE
        this.counted = false;
    }

    draw(ctx) { 
        ctx.fillStyle = Constants.BIRDCOLOR;
        ctx.fillRect(this.x, this.topPipeY, Constants.PIPEWIDTH, Constants.PIPEHEIGHT);
        ctx.fillRect(this.x, this.botPipeY, Constants.PIPEWIDTH, Constants.PIPEHEIGHT);
        ctx.fill()
    }

    move(value) { 
        this.x -= value;
    }

    randomIntFromInterval(min, max) { 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    getX() {
        return this.x;
    }

    getLeftX() { 
        return this.x + Constants.PIPEWIDTH;
    }

    getTopY() { 
        return this.topPipeY + Constants.PIPEHEIGHT;
    }

    getBotY() { 
        return this.botPipeY;
    }

    getCounted() {
        return this.counted;
    }

    setCounted(val) {
        this.counted = val;
    }
}

export default Pipe;
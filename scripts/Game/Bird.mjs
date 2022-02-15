import { Constants } from "./index.mjs";

class Bird {
  constructor(x, y, startTime) {
    this.x = x;
    this.y = y;
    this.birdBot = this.y + Constants.BIRDSIZE;
    this.birdRight = this.x + Constants.BIRDSIZE;
    this.startTime = startTime;
    this.velocity = 0.000001;
  }

  draw(ctx) {
    ctx.fillStyle = Constants.BIRDCOLOR;
    ctx.fillRect(this.x, this.y, Constants.BIRDSIZE, Constants.BIRDSIZE);
    ctx.fill();
  }

  move() {
    var dt = (Date.now() - this.startTime) / 1000;
    var damping = 1.4;
    this.velocity =
      (this.velocity + Constants.GRAVITY * dt) / (1 + damping * dt);
    this.y = this.y + this.velocity * dt;
    this.birdBot = this.y + Constants.BIRDSIZE;
    if (this.y >= Constants.HEIGHT - Constants.BIRDSIZE) {
      this.y = Constants.HEIGHT - Constants.BIRDSIZE;
    }
  }

  collideBot(pipe) {
    return (
      (this.y <= pipe.getTopY() || this.birdBot >= pipe.getBotY()) &&
      pipe.getX() <= this.birdRight &&
      pipe.getLeftX() >= this.x
    );
  }

  collide(pipes) {
    const result = pipes.filter((el) => this.collideBot(el));
    return (
      result.length >= 1 || this.y <= 0 || this.birdBot >= Constants.HEIGHT
    );
  }
}

export default Bird;

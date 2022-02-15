import { Constants, Pipe, Bird } from "./index.mjs";

class Game {
  constructor(canvas, bird) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyPresses = {};
    this.bird = bird;
    this.pipes = [new Pipe()];
    this.pipeCounter = 0;
    this.score = 0;
    this.gameOver = false;
    this.running = false;
    this.exclude = false;
    this.initEventListeners();
    this.render();
  }

  reload(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.keyPresses = {};
    this.bird = new Bird(100, 100, Date.now());
    this.pipes = [new Pipe()];
    this.pipeCounter = 0;
    this.score = 0;
    this.gameOver = false;
    this.running = false;
    this.initEventListeners();
    this.render();
  }

  events() {
    if (this.keyPresses[" "] && !this.exclude) {
      if (!this.running) this.running = true;
      this.bird.velocity = -70;
      this.bird.startTime = Date.now();
      this.exclude = true;
    }
    if (this.keyPresses["r"]) {
      this.reload(this.canvas, this.bird);
    }
    if (!this.keyPresses[" "]) {
      this.exclude = false;
    }
    const result = this.pipes.filter(
      (el) => el.getX() + Constants.PIPEWIDTH <= this.bird.x && !el.getCounted()
    );
    this.score += result.length * 10;
    result.forEach((el) => el.setCounted(true));
    this.gameOver = this.bird.collide(this.pipes);
  }

  loop() {
    this.bird.move();
    this.pipes.forEach((element) => {
      element.move(1);
    });
  }

  render() {
    this.pipeCounter++;
    this.jumpCounter++;
    if (this.pipeCounter % 150 === 0) {
      this.pipes.push(new Pipe());
      this.pipeCounter = 0;
    }
    this.ctx.fillStyle = Constants.BACKGROUNDCOLOR;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.bird.draw(this.ctx);
    this.pipes.forEach((element) => {
      if (element.x <= -Constants.PIPEWIDTH) {
        var index = this.pipes.indexOf(element);
        this.pipes.splice(index, 1);
      } else {
        element.draw(this.ctx);
      }
    });
  }

  run() {
    this.events();
    if (this.running && !this.gameOver) {
      this.loop();
      this.render();
    }
  }

  initEventListeners() {
    window.addEventListener(
      "keydown",
      (event) => {
        this.keyPresses[event.key] = true;
      },
      false
    );

    window.addEventListener(
      "keyup",
      (event) => {
        this.keyPresses[event.key] = false;
      },
      false
    );
  }
}

export default Game;

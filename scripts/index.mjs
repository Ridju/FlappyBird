import { Game, Constants, Bird } from "./Game/index.mjs";

const canvas = document.getElementById("icanvas");
const ctx = canvas.getContext("2d");
const score = document.getElementById("score");
const gameOver = document.getElementById("gameOver");

canvas.width = Constants.WIDTH;
canvas.height = Constants.HEIGHT;

ctx.fillStyle = Constants.BACKGROUNDCOLOR;
ctx.fillRect(0, 0, canvas.width, canvas.height);

const bird = new Bird(100, 100, Date.now());
const game = new Game(canvas, bird);

function main(){ 
    game.run();
    score.innerHTML = game.score;
    gameOver.hidden = !game.gameOver;
    requestAnimationFrame(main);
}

main();
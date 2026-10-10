import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!;

// create a new <canvas> element
const canvas = document.createElement("canvas");
canvas.width = 600;
canvas.height = 600;
app.appendChild(canvas);

// get the drawing context for this canvas
const ctx = canvas.getContext("2d")!;

////////////////////////////////////////////////////////////

// Player
// Asteroids
// Bullets
// Adding and Removing Asteroids
// Handle Keyboard Input
// Animation / Update Loop???

interface Vector {
  x: number,
  y: number
}

interface Player {
  pos: Vector,
  vel: Vector
}

////////////////////////////////////////////////////////////

const player: Player = { 
  pos: { x : 400, y: 400 },
  vel: { x : 0,   y: 0   }
}

const drawPlayer = (player: Player, ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(
    player.pos.x,
    player.pos.y,
    40, 0, 2*Math.PI
  );
  ctx.closePath();
  ctx.fill();
}

const update = () => {
  // update player velocity
  const accel = 1;
  if(isKeyDown(Keys.LEFT))  { player.vel.x -= accel; }
  if(isKeyDown(Keys.RIGHT)) { player.vel.x += accel; }
  if(isKeyDown(Keys.UP))    { player.vel.y -= accel; }
  if(isKeyDown(Keys.DOWN))  { player.vel.y += accel; }

  // use the velocity to update the position
  player.pos.x += player.vel.x;
  player.pos.y += player.vel.y;

  // keep the ball in bounds
  player.pos.x = Math.max(0, Math.min(canvas.width, player.pos.x));
  player.pos.y = Math.max(0, Math.min(canvas.height, player.pos.y));
}

////////////////////////////////////////////////////////////

const Keys = {
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
  UP: "ArrowUp",
  DOWN: "ArrowDown",
}

const keyboardState = new Map<String, boolean>();

const handleKeyDown = (e: KeyboardEvent) => {
  e.preventDefault();
  keyboardState.set(e.code, true);
}

window.addEventListener("keydown", handleKeyDown);

const handleKeyUp = (e: KeyboardEvent) => {
  keyboardState.set(e.code, false);
}

window.addEventListener("keyup", handleKeyUp);

const isKeyDown = (code: string): boolean => {
  return keyboardState.get(code) ?? false;
}

////////////////////////////////////////////////////////////

const animate = (time: number) => {
  // ctx.reset();
  
  update();
  drawPlayer(player, ctx);
  
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

////////////////////////////////////////////////////////////

// const animate = (time: number) => {
//   ctx.reset();

//   const centerX = canvas.width / 2;
//   const centerY = canvas.height / 2;
//   const r = 100;
//   const angle = time / 1000;

//   // draw some stuff
//   ctx.fillStyle = "blue";
//   ctx.beginPath();
//   ctx.arc(
//     centerX + r * Math.cos(angle),
//     centerY + r * Math.sin(angle),
//     40, 0, 2*Math.PI
//   );
//   ctx.closePath();
//   ctx.fill();

//   requestAnimationFrame(animate);
// }

// requestAnimationFrame(animate);
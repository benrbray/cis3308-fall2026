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

interface Collider {
  pos: Vector,
  size: number,
}

interface Player {
  pos: Vector,
  vel: Vector,
  colliding: boolean,
  size: number,
}

interface Asteroid {
  geom: Vector[]
  size: number,
  pos: Vector,
  vel: Vector
}

////////////////////////////////////////////////////////////

let asteroids: Asteroid[] = [];

const initGame = () => {
  // spawn random asteroids
  const NUM_ASTEROIDS = 6;
  for(let i = 0; i < NUM_ASTEROIDS; i++) {
    let asteroid = spawnAsteroid();
    asteroids.push(asteroid);
  }

  // request the first frame of animation
  requestAnimationFrame(animate);
}

const animate = (time: number) => {
  ctx.reset();
  
  update();
  draw();
  
  requestAnimationFrame(animate);
}

const draw = () => {
  // draw all asteroids
  for(let asteroid of asteroids) {
    drawAsteroid(asteroid, ctx);
  }

  // draw the player
  drawPlayer(player, ctx);
}

const update = () => {
  // update all asteroids
  for(let asteroid of asteroids) {
    updateAsteroid(asteroid);
  }

  // update player
  updatePlayer();

  // collision detection
  player.colliding = false;
  for(let asteroid of asteroids) {
    if(checkCollision(asteroid, player)) {
      player.colliding = true;
    }
  }
}

const checkCollision = (
  colliderA: Collider,
  colliderB: Collider,
): boolean => {
  // compute the distance between collider centers
  let dx = colliderB.pos.x - colliderA.pos.x;
  let dy = colliderB.pos.y - colliderA.pos.y;
  let dist = Math.sqrt(dx*dx + dy*dy);

  return (dist < colliderA.size + colliderB.size);
}

////////////////////////////////////////////////////////////

const randomAsteroidGeom = (): Vector[] => {
  let geom: Vector[] = [];

  const NUM_POINTS = 10 + Math.floor(Math.random() * 20);
  for(let k = 0; k < NUM_POINTS; k++) {
    let angle = k * (2 * Math.PI) / NUM_POINTS;

    let radius = 0.8 + Math.random() * 0.4
    let x = radius * Math.cos(angle);
    let y = radius * Math.sin(angle);;
    geom.push({ x, y });
  }

  return geom;
}

const updateAsteroid = (asteroid: Asteroid) => {
  asteroid.pos.x += asteroid.vel.x;
  asteroid.pos.y += asteroid.vel.y;
}

const drawAsteroid = (asteroid: Asteroid, ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = "green";
  ctx.beginPath();
  for(let point of asteroid.geom) {
    let x = asteroid.pos.x + point.x * asteroid.size;
    let y = asteroid.pos.y + point.y * asteroid.size;
    ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
}

const spawnAsteroid = (): Asteroid => {
  // define asteroid geometry
  let geom = randomAsteroidGeom();

  // size
  let size = 20 + Math.random() * 50;
  
  // position/velocity
  let pos: Vector = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height
  };

  let vel: Vector = {
    x: Math.random()*2 - 1,
    y: Math.random()*2 - 1,
  }

  return { geom, size, pos, vel };
}

////////////////////////////////////////////////////////////

const player: Player = { 
  pos: { x : 400, y: 400 },
  vel: { x : 0,   y: 0   },
  size: 30,
  colliding: false,
}

const drawPlayer = (player: Player, ctx: CanvasRenderingContext2D) => {
  if(player.colliding) {
    ctx.fillStyle = "red";
  } else {
    ctx.fillStyle = "blue";
  }

  ctx.beginPath();
  ctx.arc(
    player.pos.x,
    player.pos.y,
    player.size, 0, 2*Math.PI
  );
  ctx.closePath();
  ctx.fill();
}

const updatePlayer = () => {
  // update player velocity
  const accel = 0.5;
  if(isKeyDown(Keys.LEFT))  { player.vel.x -= accel; }
  if(isKeyDown(Keys.RIGHT)) { player.vel.x += accel; }
  if(isKeyDown(Keys.UP))    { player.vel.y -= accel; }
  if(isKeyDown(Keys.DOWN))  { player.vel.y += accel; }

  // dampen velocity
  player.vel.x *= 0.98;
  player.vel.y *= 0.98;

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

// start the game
initGame();
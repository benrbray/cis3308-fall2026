////////////////////////////////////////////////////////////

interface Vector {
  x: number,
  y: number
}

type Player = {
  pos: Vector,
  vel: Vector
}

const player: Player = {
  pos: { x : 0, y : 0 },
  vel: { x : 0, y : 0 },
}


const drawPlayer = (player: Player, ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = "red";
  ctx.arc(player.pos.x, player.pos.y, 50, 0, 2 * Math.PI);
  ctx.fill();
}

////////////////////////////////////////////////////////////

export const update = (dt: number) => {
  if(isKeyDown(Key.LEFT))  { player.pos.x -= 10; }
  if(isKeyDown(Key.RIGHT)) { player.pos.x += 10; }
  if(isKeyDown(Key.UP))    { player.pos.y -= 10; }
  if(isKeyDown(Key.DOWN))  { player.pos.y += 10; }
}

////////////////////////////////////////////////////////////

export const draw = (ctx: CanvasRenderingContext2D) => {
  ctx.reset();

  drawPlayer(player, ctx);
}

////////////////////////////////////////////////////////////

const keyboardState = new Map<String, boolean>();

const Key = {
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
  UP: "ArrowUp",
  DOWN: "ArrowDown",
}

export const isKeyDown = (code: string): boolean => {
  return keyboardState.get(code) ?? false;
}

export const handleKeyDown = (e: KeyboardEvent) => {
  e.preventDefault();
  console.log("DOWN:", e.code, "-", e.key);
  keyboardState.set(e.code, true);
}

export const handleKeyUp = (e: KeyboardEvent) => {
  keyboardState.set(e.code, false);
}
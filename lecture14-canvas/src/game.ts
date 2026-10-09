////////////////////////////////////////////////////////////

export const update = (dt: number) => {
  if(isKeyDown(Key.LEFT)) {
    x -= 10;
  }

  if(isKeyDown(Key.RIGHT)) {
    x += 10;
  }
}

let x = 0;
let y = 0;

////////////////////////////////////////////////////////////

export const draw = (ctx: CanvasRenderingContext2D) => {
  ctx.reset();

  ctx.fillStyle = "red";
  ctx.arc(x, y, 100, 0, 2 * Math.PI);
  ctx.fill();
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
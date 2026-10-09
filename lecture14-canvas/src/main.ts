import { draw, handleKeyDown, handleKeyUp, update } from './game';
import './style.css'

const canvasElement = document.querySelector<HTMLCanvasElement>('#canvas')!
canvasElement.width = 800;
canvasElement.height = 800;

////////////////////////////////////////////////////////////

window.onload = () => {
  console.log(canvasElement);
  let ctx = canvasElement.getContext("2d")!;
  draw(ctx);

  requestAnimationFrame(firstFrame);
  function firstFrame(t0: number) {
    let timePrev = t0;
    requestAnimationFrame(animate);

    function animate(time: number) {
      const deltaTime = time - timePrev;
      update(deltaTime);
      draw(ctx);
      timePrev = time;

      requestAnimationFrame(animate);
    }
  }

  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);
}

////////////////////////////////////////////////////////////


const rect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  fill: string,
  stroke?: string
) => {
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.fillStyle = fill;
  ctx.fill();
  if(stroke){
    ctx.strokeStyle = stroke;
    ctx.stroke();
  }
};

export default rect;

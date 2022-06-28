const text = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  text: string,
  size = 30,
  color= "#000",
) => {
  ctx.textBaseline = "top";
  ctx.fillStyle = color;
  const textSize = 30;
  ctx.font = `${textSize}px Arial`;
  const { width } = ctx.measureText(text);
  ctx.fillText(text, x, y);
};

export default text;

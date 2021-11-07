const rect = (ctx, x, y, width, height, fill, stroke) => {
  //   console.log({ ctx, x, y, width, height, fill, stroke });
  ctx.save();
  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke;
  ctx.rect(x, y, width, height);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
};

export default rect;

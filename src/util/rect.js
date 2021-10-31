const rect = (ctx, x, y, width, height, fill, stroke) => {
    if (fill) {
        ctx.fillStyle = fill;
    }
    if (stroke) {
        ctx.strokeStyle = stroke;
    }
    const date = new Date();
    ctx.rect(x + Math.sin(date.getTime() / 600) * 300, y + Math.sin(date.getTime() / 300) * 200, width, height);
    if (fill) {
        ctx.fill();
    }
    if (stroke) {
        ctx.stroke();
    }
  }

  export default rect;
export const addShadow = (ctx:CanvasRenderingContext2D): void => {
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = 64;
    ctx.shadowOffsetY = 24;
}

export const removeShadow = (ctx:CanvasRenderingContext2D): void => {
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowColor = "transparent";
}
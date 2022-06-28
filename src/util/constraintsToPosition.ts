/**
 * Converts rect constraints into an x and y position
 *
 * @param {Object} object containing rect constraints
 * @returns object with x and y position
 */
const constraintsToPosition = (
  top: number,
  right: number,
  left: number,
  bottom: number,
  objectWidth = 0,
  objectHeight = 0,
  canvasWidth?: number,
  canvasHeight?: number
) => {
  let x = 0;
  let y = 0;
  let width = objectWidth;
  let height = objectHeight;

  if (canvasWidth && canvasHeight) {
    if (left !== null) {
      x = left;
    } else if (right !== null) {
      x = canvasWidth - objectWidth - right;
    }
    if (top !== null) {
      y = top;
    } else if (bottom !== null) {
      y = canvasHeight - objectHeight - bottom;
    }
    if (left !== null && right !== null) {
      width = canvasWidth - left - right;
    }
    if (top !== null && bottom !== null) {
      height = canvasHeight - top - bottom;
    }
  }
  // console.log({ left, right, x, width, objectWidth });
  return { x, y, width, height };
};

export default constraintsToPosition;

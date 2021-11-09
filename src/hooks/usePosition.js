import { useCanvas } from "../Components/Canvas";

/**
 * Converts rect constraints into an x and y position
 *
 * @param {Object} object containing rect constraints
 * @returns object with x and y position
 */
const usePosition = ({
  top,
  right,
  left,
  bottom,
  width: objectWidth = 0,
  height: objectHeight = 0,
}) => {
  const { width: canvasWidth, height: canvasHeight } = useCanvas();
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

export default usePosition;

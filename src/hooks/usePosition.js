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
    if (left) {
      x = left;
    } else if (right) {
      x = canvasWidth - objectWidth - right;
    }
    if (top) {
      y = top;
    } else if (bottom) {
      y = canvasHeight - objectHeight - bottom;
    }
    if (left && right) {
      width = canvasWidth - left - right;
    }
    if (top && bottom) {
      height = canvasHeight - top - bottom;
    }
  }
  return { x, y, width, height };
};

export default usePosition;

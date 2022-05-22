import { useSpring } from "@react-spring/core";
import { useCanvas } from "./Canvas";
import usePosition from "../hooks/usePosition";

// TODO: type this to be reusable
// maybe refactor for reconciler?
const Rect = ({
  left,
  top,
  right,
  bottom,
  width = 50,
  height = 50,
  fill = "#A5B4FC",
  stroke = "#6366F1",
  scale = 1,
  rotate = 0,
  borderRadius = 0,
  index,
  onMouseDown,
  onMouseUp,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  const { dispatch } = useCanvas();

  const {
    x,
    y,
    width: adjustedWidth,
    height: adjustedHeight,
  } = usePosition({
    top,
    left,
    right,
    bottom,
    width,
    height,
  });

  const [styles] = useSpring(() => ({
    width: adjustedWidth,
    height: adjustedHeight,
    x,
    y,
    scale,
    rotate,
    config: { mass: 1, tension: 150, friction: 40 },
  }));

  if (index === undefined) {
    return null;
  }

  dispatch({
    index,
    type: "rect",
    borderRadius,
    onMouseDown,
    onMouseUp,
    onMouseEnter,
    onMouseLeave,
    onClick,
    styles,
    fill,
    stroke,
    targets: {
      width: adjustedWidth,
      fill,
      stroke,
      height: adjustedHeight,
      x,
      y,
      scale,
      rotate,
    },
  });

  return null;
};

export default Rect;
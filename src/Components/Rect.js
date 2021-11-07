import { useSpring } from "@react-spring/core";
import { Fragment, useEffect } from "react";
import { useCanvas } from "./Canvas";

const Rect = ({
  x = 0,
  y = 0,
  width = 50,
  height = 50,
  fill = "#A5B4FC",
  stroke = "#6366F1",
  scale,
  borderRadius = 16,
  index,
  onMouseDown,
  onMouseUp,
  onClick,
}) => {
  const { dispatch } = useCanvas();
  const [styles] = useSpring(() => ({
    width,
    fill,
    stroke,
    height,
    x,
    y,
    scale,
  }));
  useEffect(() => {
    if (index === undefined) {
      return;
    }
    dispatch({
      index,
      type: "rect",
      borderRadius,
      onMouseDown,
      onMouseUp,
      onClick,
      styles,
      targets: { width, fill, stroke, height, x, y, scale },
    });
  }, [
    dispatch,
    borderRadius,
    index,
    onMouseDown,
    onClick,
    onMouseUp,
    styles,
    width,
    fill,
    stroke,
    height,
    scale,
    x,
    y,
  ]);

  return <Fragment />;
};

export default Rect;

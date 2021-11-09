import { useSpring } from "@react-spring/core";
import { Fragment, useEffect } from "react";
import { useCanvas } from "./Canvas";
import usePosition from "../hooks/usePosition";

const Rect = ({
  left = 0,
  top = 0,
  right,
  bottom,
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
    fill,
    stroke,
    x,
    y,
    scale,
    config: { mass: 1, tension: 150, friction: 40 },
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
      targets: {
        width: adjustedWidth,
        fill,
        stroke,
        height: adjustedHeight,
        x,
        y,
        scale,
      },
    });
  }, [
    dispatch,
    borderRadius,
    index,
    onMouseDown,
    onClick,
    onMouseUp,
    styles,
    adjustedHeight,
    adjustedWidth,
    fill,
    stroke,
    scale,
    x,
    y,
  ]);

  return <Fragment />;
};

export default Rect;

import { ReactElement } from "react";
import ReactReconciler, { OpaqueRoot } from "react-reconciler";

import hostConfig from "./hostConfig";
import objectStore from "./objectStore";
import constraintsToPosition from "../util/constraintsToPosition";
import { rect, roundedRect } from "../util";
import { SpringValue } from "react-spring";

const { createContainer, updateContainer } = ReactReconciler(hostConfig);

const renderRect = (canvas: HTMLCanvasElement, props: any) => {
  const context = canvas.getContext("2d");
  if (!context) return;
  let {
    x = null,
    y = null,
    borderRadius = 0,
    scale,
    rotate,
    fill = "black",
    stroke,
    top = null,
    bottom = null,
    left = null,
    right = null,
  } = props;

  const calculatedPositionAndSize = constraintsToPosition(
    top,
    right,
    left,
    bottom,
    props.width?.get(),
    props.height?.get(),
    canvas.width,
    canvas.height
  );

  if (scale instanceof SpringValue) {
    scale.advance(1000 / 60);
    scale = scale.get();
  }

  const { width, height } = calculatedPositionAndSize;

  if (!x) x = calculatedPositionAndSize.x;
  if (!y) y = calculatedPositionAndSize.y;

  if (x instanceof SpringValue) {
    x = x.get();
  }
  if (y instanceof SpringValue) {
    y = y.get();
  }
  if (borderRadius instanceof SpringValue) {
    borderRadius = borderRadius.get();
  }
  if (rotate instanceof SpringValue) {
    rotate = rotate.get();
  }

  const centerX = x + width / 2;
  const centerY = y + height / 2;

  context.globalAlpha = 0.5;

  context.shadowColor = "rgba(0,0,0,0.5)";
  context.shadowBlur = 64;
  context.shadowOffsetY = 24;

  context.translate(centerX, centerY);
  context.rotate((rotate * Math.PI) / 180);
  context.scale(scale, scale);

  context.translate(-centerX, -centerY);

  if (borderRadius === 0) {
    rect(context, x, y, width, height, fill, stroke);
  } else {
    roundedRect(context, x, y, width, height, fill, stroke, borderRadius);
  }

  context.shadowBlur = 0;
  context.shadowOffsetY = 0;
  context.globalAlpha = 1;
  context.fillStyle = "#000";
  context.shadowColor = "transparent";
  const textSize = 30;
  context.font = `${textSize}px Arial`;
  const text = "Hello World";
  const { width: textWidth } = context.measureText(text);
  context.fillText(text, centerX - textWidth / 2, centerY + textSize / 2);
};

const CanvasRenderer = {
  render: (
    reactElement: ReactElement,
    domElement: HTMLCanvasElement & { _rootContainer: OpaqueRoot }
  ) => {
    if (!domElement._rootContainer) {
      domElement._rootContainer = createContainer(
        domElement,
        0,
        null,
        false,
        null,
        "canvas",
        () => {},
        null
      );
    }
    domElement.style.width = `${window.devicePixelRatio * 100}%`;
    domElement.style.height = `${window.devicePixelRatio * 100}%`;
    domElement.style.transformOrigin = "left top";
    domElement.style.display = "block";
    domElement.style.transform = `scale(${1 / window.devicePixelRatio})`;

    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      domElement.width = width * window.devicePixelRatio;
      domElement.height = height * window.devicePixelRatio;
    });
    resizeObserver.observe(domElement);
    const context = domElement.getContext("2d");
    let animationFrameId: number;

    const render = () => {
      if (!context) {
        return;
      }
      context.setTransform(
        window.devicePixelRatio,
        0,
        0,
        window.devicePixelRatio,
        0,
        0
      );
      context.clearRect(
        0,
        0,
        domElement.width * window.devicePixelRatio,
        domElement.height * window.devicePixelRatio
      );
      Object.values(objectStore).forEach((object: any) => {
        context.save();
        renderRect(domElement, object);
        context.restore();
      });
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();
    return updateContainer(reactElement, domElement._rootContainer, null, null);
  },
};

export default CanvasRenderer;

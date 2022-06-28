import { ReactElement } from "react";
import ReactReconciler, { OpaqueRoot } from "react-reconciler";

import hostConfig from "./hostConfig";
import objectStore from "./objectStore";
import constraintsToPosition from "../util/constraintsToPosition";
import { rect, roundedRect } from "../util";
import { SpringValue } from "react-spring";
import text from "../util/text";
import {addShadow, removeShadow} from "../util/shadow";

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

  addShadow(context);

  context.translate(x, y);
  // Ensure transform around center
  context.translate(width / 2, height / 2);
  context.rotate((rotate * Math.PI) / 180);
  context.scale(scale, scale);
  context.translate(-width / 2, -height / 2);

  if (borderRadius === 0) {
    rect(context, 0, 0, width, height, fill, stroke);
  } else {
    roundedRect(context, 0, 0, width, height, fill, stroke, borderRadius);
  }
};

const renderText = (canvas: HTMLCanvasElement, props: any) => {
  const context = canvas.getContext("2d");
  if (!context) return;
  let {
    x = null,
    y = null,
    scale,
    rotate,
    colour = "black",
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
  if (rotate instanceof SpringValue) {
    rotate = rotate.get();
  }

  const centerX = x + width / 2;
  const centerY = y + height / 2;

  addShadow(context);

  context.translate(x, y);
  // Ensure transform around center
  context.translate(width / 2, height / 2);
  context.rotate((rotate * Math.PI) / 180);
  context.scale(scale, scale);
  context.translate(-width / 2, -height / 2);

  context.globalAlpha = 1;

  removeShadow(context);

  text(context,0, 0, "Hello World");
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
        renderText(domElement, {x: 0, y: 0, scale: 1});
        context.restore();
      });
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();
    return updateContainer(reactElement, domElement._rootContainer, null, null);
  },
};

export default CanvasRenderer;

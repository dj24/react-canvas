import React, { useRef, useEffect, createContext, useContext } from "react";

import { rect, roundedRect } from "../util";

const CanvasContext = createContext();

const useCanvas = () => useContext(CanvasContext);

const Canvas = ({ children, style }) => {
  const ref = useRef(null);
  const objects = useRef([]);
  const mousePosition = useRef({ x: 0, y: 0 });
  const lastFrameTime = useRef(0);

  const dispatch = (action) => {
    const copiedState = [...objects.current];
    const { index, styles, targets, ...rest } = action;
    console.log({ styles });
    if (objects.current[index]) {
      Object.entries(objects.current[index].styles).forEach(([key, spring]) => {
        spring.start({
          from: objects.current[index].styles[key].get(),
          to: targets[key],
        });
      });
    }
    // Add dispatched object into the objects array
    copiedState[action.index] = {
      ...rest,
      styles,
    };
    objects.current = copiedState;
    console.log({ action });
  };

  const renderRect = (obj) => {
    const { borderRadius, styles } = obj;
    const context = ref.current.getContext("2d");

    // Using canvas means we need to tell springs how much to animate
    const currentTime = new Date().getTime();
    const deltaTime = currentTime - lastFrameTime.current;
    Object.values(styles).forEach((spring) => {
      spring.advance(deltaTime);
    });

    lastFrameTime.current = currentTime;

    if (borderRadius === 0) {
      rect(
        context,
        styles.x.get(),
        styles.y.get(),
        styles.width.get() * styles.scale.get(),
        styles.height.get() * styles.scale.get(),
        styles.fill.get(),
        styles.stroke.get()
      );
    } else {
      roundedRect(
        context,
        styles.x.get(),
        styles.y.get(),
        styles.width.get() * styles.scale.get(),
        styles.height.get() * styles.scale.get(),
        styles.fill.get(),
        styles.stroke.get(),
        borderRadius
      );
    }
  };

  useEffect(() => {
    let animationFrameId;
    const canvas = ref.current;
    const context = ref.current.getContext("2d");

    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      canvas.width = width;
      canvas.height = height;
    });
    resizeObserver.observe(canvas);

    const render = () => {
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
        canvas.width * window.devicePixelRatio,
        canvas.height * window.devicePixelRatio
      );
      objects.current.forEach(renderRect);
      rect(
        context,
        mousePosition.current.x,
        mousePosition.current.y,
        20,
        20,
        "red",
        "blue"
      );
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      resizeObserver.unobserve(canvas);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const indexedChildren = React.Children.map(children, (child, i) =>
    React.isValidElement(child)
      ? React.cloneElement(child, { ...child.props, index: i })
      : child
  );

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const { x, y } = ref.current.getBoundingClientRect();
    mousePosition.current = { x: clientX - x, y: clientY - y };
  };

  const handleMouseDown = (event) => {
    // Reverse the array to check top layers first
    objects.current.reverse().forEach((object) => {
      const { x, y, width, height } = object.styles;
      if (
        object.onMouseDown &&
        mousePosition.current.x >= x.get() &&
        mousePosition.current.x <= x.get() + width.get() &&
        mousePosition.current.y >= y.get() &&
        mousePosition.current.y <= y.get() + height.get()
      ) {
        return object.onMouseDown(event);
      }
    });
  };

  const handleMouseUp = (event) => {
    // Reverse the array to check top layers first
    objects.current.reverse().forEach((object) => {
      const { x, y, width, height } = object.styles;
      if (
        object.onMouseUp &&
        mousePosition.current.x >= x.get() &&
        mousePosition.current.x <= x.get() + width.get() &&
        mousePosition.current.y >= y.get() &&
        mousePosition.current.y <= y.get() + height.get()
      ) {
        return object.onMouseUp(event);
      }
    });
  };

  const handleClick = (event) => {
    // Reverse the array to check top layers first

    objects.current.reverse().forEach((object) => {
      console.log(object);
      const { x, y, width, height } = object.styles;
      if (
        object.onClick &&
        mousePosition.current.x >= x.get() &&
        mousePosition.current.x <= x.get() + width.get() &&
        mousePosition.current.y >= y.get() &&
        mousePosition.current.y <= y.get() + height.get()
      ) {
        return object.onClick(event);
      }
    });
  };

  const handleMouseEnter = (event) => {
    // Reverse the array to check top layers first

    objects.current.reverse().forEach((object) => {
      console.log(object);
      const { x, y, width, height } = object.styles;
      if (
        object.onMouseEnter &&
        mousePosition.current.x >= x.get() &&
        mousePosition.current.x <= x.get() + width.get() &&
        mousePosition.current.y >= y.get() &&
        mousePosition.current.y <= y.get() + height.get()
      ) {
        return object.onMouseEnter(event);
      }
    });
  };

  const handleMouseLeave = (event) => {
    // Reverse the array to check top layers first

    objects.current.reverse().forEach((object) => {
      console.log(object);
      const { x, y, width, height } = object.styles;
      if (
        object.onMouseLeave &&
        mousePosition.current.x >= x.get() &&
        mousePosition.current.x <= x.get() + width.get() &&
        mousePosition.current.y >= y.get() &&
        mousePosition.current.y <= y.get() + height.get()
      ) {
        return object.onMouseLeave(event);
      }
    });
  };

  const context = {
    dispatch,
    objects: objects.current,
    mousePosition: mousePosition.current,
  };

  return (
    <div id="canvas-container" style={style}>
      <canvas
        style={{
          width: `${window.devicePixelRatio}00%`,
          height: `${window.devicePixelRatio}00%`,
          transformOrigin: "top left",
          transform: `scale(${1 / window.devicePixelRatio})`,
        }}
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onMouseUp={handleMouseUp}
      >
        <CanvasContext.Provider value={context}>
          {indexedChildren}
        </CanvasContext.Provider>
      </canvas>
    </div>
  );
};

export default Canvas;

export { CanvasContext, useCanvas };

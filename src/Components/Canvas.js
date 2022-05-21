import React, {
  createContext,
  useContext,
} from "react";
import useCanvasSetup from "../hooks/useCanvasSetup";

const CanvasContext = createContext();

const useCanvas = () => useContext(CanvasContext);

const Canvas = ({ children, style }) => {
  const {
    dispatch,
    objects,
    mousePosition,
    width,
    height,
    handleRef,
    canvas
  } = useCanvasSetup();

  const indexedChildren = React.Children.map(children, (child, i) =>
    React.isValidElement(child)
      ? React.cloneElement(child, { ...child.props, index: i })
      : child
  );

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const { x, y } = canvas.getBoundingClientRect();
    mousePosition.current = { x: clientX - x, y: clientY - y };
    objects.current.reverse().forEach((object) => {
      const { x, y, width, height } = object.styles;
      if (
          object.onMouseEnter &&
          !object.isEntered &&
          mousePosition.current.x >= x.get() &&
          mousePosition.current.x <= x.get() + width.get() &&
          mousePosition.current.y >= y.get() &&
          mousePosition.current.y <= y.get() + height.get()
      ) {
        object.isEntered = true;
        object.onMouseEnter(event);
      }
      if (
          object.onMouseLeave &&
          object.isEntered &&
          mousePosition.current.x >= x.get() &&
          mousePosition.current.x <= x.get() + width.get() &&
          mousePosition.current.y >= y.get() &&
          mousePosition.current.y <= y.get() + height.get()
      ) {
        object.isEntered = false;
        object.onMouseLeave(event);
      }
    });
  };

  const clickRelatedEvents = Object.fromEntries([
    'onMouseDown', 'onMouseUp', 'onClick'
  ].map(eventName => [
      eventName,
      event => {
        // Reverse the array to check top layers first
        // TODO: make this work with scale
        objects.current.reverse().forEach((object) => {
          const { x, y, width, height } = object.styles;
          if (
              object[eventName] &&
              mousePosition.current.x >= x.get() &&
              mousePosition.current.x <= x.get() + width.get() &&
              mousePosition.current.y >= y.get() &&
              mousePosition.current.y <= y.get() + height.get()
          ) {
            return object[eventName](event);
          }
        });
      }
  ]));
  const context = {
    dispatch,
    objects: objects.current,
    mousePosition: mousePosition.current,
    width: width / window.devicePixelRatio || null,
    height: height / window.devicePixelRatio || null,
  };

  return (
    <div id="canvas-container" style={style}>
      <canvas
        width={width}
        height={height}
        style={{
          width: `${window.devicePixelRatio * 100}%`,
          height: `${window.devicePixelRatio* 100}%`,
          transformOrigin: "left top",
          transform: `scale(${1 / window.devicePixelRatio})`,
        }}
        ref={handleRef}
        onMouseMove={handleMouseMove}
        {...clickRelatedEvents}
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

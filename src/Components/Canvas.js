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
    objects.current.reverse().forEach((object, index) => {
      const { x, y, width, height, scale } = object.styles;

      const scaledWidth = width.get() * scale.get();
      const scaledHeight = height.get() * scale.get();

      const widthDiff = width.get() - scaledWidth;
      const heightDiff = height.get() - scaledHeight;

      const leftExtents = x.get() + widthDiff / 2;
      const rightExtents = x.get() + width.get() - widthDiff / 2;
      const bottomExtents = y.get() + heightDiff / 2;
      const topExtents = y.get() + height.get() - heightDiff / 2;;

      const isInsideObject =
          mousePosition.current.x >= leftExtents &&
          mousePosition.current.x <= rightExtents &&
          mousePosition.current.y >= bottomExtents &&
          mousePosition.current.y <= topExtents;
      if (
          object.onMouseEnter &&
          !object.isEntered &&
          isInsideObject
      ) {
        objects.current[index].isEntered = true;
        object.onMouseEnter(event);
      }
      else if (
          object.onMouseLeave &&
          object.isEntered &&
          !isInsideObject
      ) {
        objects.current[index].isEntered = false;
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

import { useState, useEffect } from "react";

const App = () => {
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  const [top, setTop] = useState(20);
  const [left, setLeft] = useState(300);
  const [right, setRight] = useState(null);
  const [bottom, setBottom] = useState(null);
  const [scale, setScale] = useState(1);
  const [fill, setFill] = useState("#ff0000");
  const [rotate, setRotate] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragPoint, setDragPoint] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const [showRect, setShowRect] = useState(false);

  useEffect(() => {
    document.addEventListener("click", () => {
      // setShowRect((prev) => !prev);
      setLeft((current) => (current === 300 ? 800 : 300));
      setRotate((current) => (current === 0 ? 90 : 0));
      setScale((current) => (current === 1 ? 0.5 : 1));
    });
  }, []);

  return (
    <>
      <rect
        x={300}
        fill={"#f00"}
        rotate={0}
        y={200}
        width={300}
        height={300}
        scale={scale}
        borderRadius={16}
        opacity={0.5}
      />
      <rect
        x={300}
        fill={"#0f0"}
        rotate={rotate}
        y={600}
        width={300}
        height={300}
        scale={1}
        borderRadius={32}
      />
      <rect
        x={left}
        fill={"#00f"}
        rotate={0}
        y={1000}
        width={300}
        height={300}
        scale={1}
        borderRadius={32}
      />
      {showRect && (
        <rect
          left={top}
          right={right}
          top={left}
          bottom={bottom}
          width={width}
          height={height}
          x={dragPoint.x - dragOffset.x}
          y={dragPoint.y - dragOffset.y}
          animate={!dragging}
          fill={"blue"}
          borderRadius={8}
        />
      )}
    </>
  );
};

export default App;

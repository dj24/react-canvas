import { useState } from "react";

import { Canvas, Rect } from "./Components";

const App = () => {
  const [width, setWidth] = useState(200);
  const [top, setTop] = useState(null);
  const [bottom, setBottom] = useState(50);
  const [scale, setScale] = useState(1);
  const [fill, setFill] = useState("red");

  return (
    <>
      <Canvas
        style={{
          position: "fixed",
          bottom: 32,
          top: 32,
          left: 32,
          right: 32,
          background: "white",
          borderRadius: 16,
          boxShadow: "0 4px 64px -32px rgba(0,0,0,1)",
        }}
      >
        <Rect
          left={top}
          right={bottom}
          top={top}
          bottom={bottom}
          scale={scale}
          width={width}
          height={width}
          fill={fill}
          borderRadius={16}
          onClick={() => {
            setWidth((current) => (current === 400 ? 200 : 400));
            if (top) {
              setTop(null);
              setBottom(50);
            }
            if (bottom) {
              setBottom(null);
              setTop(50);
            }
          }}
          onMouseDown={() => setScale(0.9)}
          onMouseUp={() => setScale(1)}
        />
        {/* <Rect x={50} y={50} /> */}
      </Canvas>
    </>
  );
};

export default App;

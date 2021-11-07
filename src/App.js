import { useState } from "react";

import { Canvas, Rect } from "./Components";

const App = () => {
  const [width, setWidth] = useState(200);
  const [scale, setScale] = useState(1);
  const [fill, setFill] = useState("red");

  return (
    <>
      <Canvas
        style={{
          height: 700,
          border: "1px solid red",
          margin: 16,
        }}
      >
        <Rect
          x={300}
          y={150}
          scale={scale}
          width={width}
          height={width}
          fill={fill}
          borderRadius={16}
          onClick={() => {
            setWidth((current) => (current === 400 ? 200 : 400));
            setFill((current) => (current === "red" ? "blue" : "red"));
          }}
          onMouseEnter={() => setScale(1.1)}
          onMouseLeave={() => setScale(1)}
        />
        {/* <Rect x={50} y={50} /> */}
      </Canvas>
    </>
  );
};

export default App;

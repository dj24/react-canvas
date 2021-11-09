import { useState } from "react";

import { Canvas, Rect } from "./Components";

const controlStyles = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  padding: 16,
  borderBottom: "1px solid grey",
  boxSizing: "border-box",
};

const App = () => {
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  const [top, setTop] = useState(20);
  const [left, setLeft] = useState(20);
  const [right, setRight] = useState(null);
  const [bottom, setBottom] = useState(null);
  const [scale, setScale] = useState(1);
  const [fill, setFill] = useState("#ff0000");
  const [rotate, setRotate] = useState(0);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: "white",
        borderRadius: 16,
        position: "absolute",
        overflow: "hidden",

        top: 32,
        bottom: 32,
        left: 32,
        right: 32,
        border: "1px solid grey",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid grey",
          height: "100%",
        }}
      >
        <div style={controlStyles}>
          <label>Fill</label>
          <input
            type="color"
            value={fill}
            onChange={(e) => setFill(e.target.value)}
          />
          <input onChange={(e) => setFill(e.target.value)} value={fill} />
        </div>
        <div style={controlStyles}>
          <label>Scale</label>
          <input
            type="range"
            min="0.1"
            max="2"
            value={scale}
            onChange={(e) => setScale(parseFloat(e.target.value))}
            step="0.1"
          />
          <input
            type="number"
            onChange={(e) => setScale(parseFloat(e.target.value))}
            value={scale}
          />
        </div>
        <div style={controlStyles}>
          <label>Rotation</label>
          <input
            type="range"
            min="0"
            max="180"
            value={rotate}
            onChange={(e) => setRotate(parseInt(e.target.value))}
            step="25"
          />
          <input
            type="number"
            onChange={(e) => setRotate(parseInt(e.target.value))}
            value={rotate}
          />
        </div>
        <div style={controlStyles}>
          <div style={{ display: "flex" }}>
            <input
              type="checkbox"
              checked={left !== null}
              onChange={() => setLeft((left) => (left !== null ? null : 20))}
            />
            <label>Left</label>
          </div>
          <input
            type="range"
            min="50"
            max="200"
            value={left}
            disabled={left === null}
            onChange={(e) => setLeft(parseInt(e.target.value))}
            step="25"
          />
          <input
            type="number"
            disabled={left === null}
            onChange={(e) => setLeft(parseInt(e.target.value))}
            value={left}
          />
        </div>
        <div style={controlStyles}>
          <div style={{ display: "flex" }}>
            <input
              type="checkbox"
              checked={right !== null}
              onChange={() => setRight((right) => (right !== null ? null : 20))}
            />
            <label>Right</label>
          </div>
          <input
            type="range"
            min="50"
            max="200"
            value={right}
            disabled={right === null}
            onChange={(e) => setRight(parseInt(e.target.value))}
            step="25"
          />
          <input
            type="number"
            disabled={right === null}
            onChange={(e) => setRight(parseInt(e.target.value))}
            value={right}
          />
        </div>
        <div style={controlStyles}>
          <div style={{ display: "flex" }}>
            <input
              type="checkbox"
              checked={top !== null}
              onChange={() => setTop((top) => (top !== null ? null : 20))}
            />
            <label>Top</label>
          </div>
          <input
            type="range"
            min="50"
            max="200"
            value={top}
            disabled={top === null}
            onChange={(e) => setTop(parseInt(e.target.value))}
            step="25"
          />
          <input
            type="number"
            disabled={top === null}
            onChange={(e) => setTop(parseInt(e.target.value))}
            value={top}
          />
        </div>
        <div style={controlStyles}>
          <div style={{ display: "flex" }}>
            <input
              type="checkbox"
              checked={bottom !== null}
              onChange={() =>
                setBottom((bottom) => (bottom !== null ? null : 20))
              }
            />
            <label>Bottom</label>
          </div>
          <input
            type="range"
            min="50"
            max="200"
            disabled={bottom === null}
            value={bottom}
            onChange={(e) => setBottom(parseInt(e.target.value))}
            step="25"
          />
          <input
            type="number"
            disabled={bottom === null}
            onChange={(e) => setBottom(parseInt(e.target.value))}
            value={bottom}
          />
        </div>
      </div>
      <Canvas
        style={{
          width: "100%",
          height: "100%",
          background: "white",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.24'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        {/* <Rect
          key={1}
          right={20}
          bottom={20}
          width={200}
          height={200}
          fill={"0000ff"}
        /> */}
        <Rect
          key={0}
          left={left}
          right={right}
          top={top}
          bottom={bottom}
          scale={scale}
          rotate={rotate}
          width={width}
          height={height}
          fill={fill}
          borderRadius={16}
          // onClick={() => {}}
          // onMouseDown={() => setScale(0.9)}
          // onMouseUp={() => setScale(1)}
        />

        {/* <Rect x={50} y={50} /> */}
      </Canvas>
    </div>
  );
};

export default App;

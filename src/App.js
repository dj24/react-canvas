import { useState } from 'react'

import { Canvas, Rect } from "./Components";

const App = () => {
  const [x, setX] = useState(0);
  const [list, setList] = useState([]);
  return(
    <>

      <Canvas>
        <Rect x={300} y={150} width={200} height={200} fill='red' stroke='green' borderRadius={0}/>
        <Rect x={x} y={0}/>
        {list.map((item, i) => <Rect key={i} x={(i + 1) * 20} y={(i + 1) * 20}/>)}
      </Canvas>
      <button onClick={() => setX(current => current += 20)}>Increase</button>
      <button onClick={() => setList(current => current.concat(0))}>Add</button>
    </>
)};

export default App;

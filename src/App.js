import { useState } from "react";

import { Canvas, Rect } from "./Components";
import RangeInput from "./Components/RangeInput";
import {
  Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel,
  Box,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormLabel, Heading,
  HStack,
  Input, Spacer,
  Switch,
  theme,
  VStack
} from "@chakra-ui/react";

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
    <>
      <Canvas
        style={{
          position: "absolute",
          width: "100%",
          height: "100vh",
          background: "white",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.24'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
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
          onClick={() => setFill('red')}
          onMouseEnter={() => setScale(0.9)}
          onMouseLeave={() => setScale(1)}
        />

        {/* <Rect x={50} y={50} /> */}
      </Canvas>
      <Accordion
        allowMultiple
        bg="white"
        m={4}
        width='320px'
        spacing={0}
        position="fixed"
        bottom={0}
        borderWidth='1px'
        borderRadius="lg"
        shadow="lg"
      >
        <AccordionItem>
          <Flex>
            <AccordionButton>
              <Heading size='md' flex='1' textAlign='left'>
                Transforms
              </Heading>
              <AccordionIcon />
            </AccordionButton>
          </Flex>
          {/* TRANSFORMS */}
          <AccordionPanel>
            <VStack
              p={6}
              width="100%"
              align="start"
            >
              <FormControl>
                <FormLabel>Scale</FormLabel>
                <RangeInput
                  min={0.1}
                  max={2}
                  step={0.05}
                  defaultValue={scale}
                  value={scale}
                  onChange={setScale}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Rotation</FormLabel>
                <RangeInput
                  min={0}
                  max={360}
                  value={rotate}
                  defaultValue={rotate}
                  onChange={setRotate}
                />
              </FormControl>
            </VStack>
          </AccordionPanel>
        </AccordionItem>
        {/* CONSTRAINTS */}
        <AccordionItem>
          <Flex>
            <AccordionButton>
              <Heading size='md' flex='1' textAlign='left'>
                Constraints
              </Heading>
              <AccordionIcon />
            </AccordionButton>
          </Flex>
          <AccordionPanel>
            <VStack
              p={6}
              width="100%"
              align="start"
            >
              <FormControl>
                <Flex>
                  <FormLabel>Left</FormLabel>
                  <Spacer/>
                  <Switch
                    isChecked={left !== null}
                    onChange={() => setLeft((left) => (left !== null ? null : 20))}
                  />
                </Flex>
                <RangeInput
                  min={20}
                  max={200}
                  value={left}
                  defaultValue={left}
                  disabled={left === null}
                  onChange={setLeft}
                />
              </FormControl>
              <FormControl>
                <Flex>
                  <FormLabel>Right</FormLabel>
                  <Spacer/>
                  <Switch
                    isChecked={right !== null}
                    onChange={() => setRight((right) => (right !== null ? null : 20))}
                  />
                </Flex>
                <RangeInput
                  min={20}
                  max={200}
                  value={right}
                  defaultValue={right}
                  disabled={right === null}
                  onChange={setRight}
                />
              </FormControl>
              <FormControl>
                <Flex>
                  <FormLabel>Top</FormLabel>
                  <Spacer/>
                  <Switch
                    isChecked={top !== null}
                    onChange={() => setTop((top) => (top !== null ? null : 20))}
                  />
                </Flex>
                <RangeInput
                  min={20}
                  max={200}
                  value={top}
                  defaultValue={right}
                  disabled={top === null}
                  onChange={setTop}
                />
              </FormControl>
              <FormControl>
                <Flex>
                  <FormLabel>Bottom</FormLabel>
                  <Spacer/>
                  <Switch
                    isChecked={bottom !== null}
                    onChange={() =>
                      setBottom((bottom) => (bottom !== null ? null : 20))
                    }
                  />
                </Flex>
                <RangeInput
                  min={20}
                  max={200}
                  disabled={bottom === null}
                  value={bottom}
                  defaultValue={bottom}
                  onChange={setBottom}
                />
              </FormControl>
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default App;

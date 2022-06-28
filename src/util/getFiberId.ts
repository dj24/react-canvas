import { Fiber } from "react-reconciler";

const getFiberId = (node: Fiber) => {
  let id = "";
  let currentNode = node;
  let index = 0;
  while (currentNode.return !== null && index < 5) {
    id += `/${currentNode.index}`;
    currentNode = currentNode.return;
    index++;
  }
  return id;
};

export default getFiberId;

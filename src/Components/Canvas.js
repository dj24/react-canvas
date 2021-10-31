import React, { useRef, useEffect, createContext, useContext, useReducer } from "react"

import { rect, roundedRect } from '../util';

const CanvasContext = createContext();

const useCanvas = () => useContext(CanvasContext);

const initialState = [];

const reducer = (state, action) => {
    switch (action.type) {
      case 'rect':
        const copiedState = [...state];
        const { index, ...rest } = action;
        copiedState[action.index] = { ...rest };
        return copiedState;
      default:
        throw new Error();
    }
  }

const Canvas = ({children}) => {
    const ref = useRef(null);
    const [state, dispatch] = useReducer(reducer, initialState);

    const renderRect = ({ x, y, width, height, stroke, fill, borderRadius}) => {
        const context = ref.current.getContext('2d')
        if(borderRadius === 0){
            rect(context,x,y,width,height,fill,stroke);
        }
        else{
            roundedRect(context,x,y,width,height,fill,stroke,borderRadius);
        }
    }

    useEffect(() => {
        let animationFrameId;
        const canvas = ref.current
        const context = ref.current.getContext('2d');
            
        const resizeObserver = new ResizeObserver(entries => {
            const { width, height} = entries[0].contentRect;
                canvas.width = width;
                canvas.height = height;      
        });
        resizeObserver.observe(canvas);

        const render = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            state.forEach(renderRect);
            animationFrameId = window.requestAnimationFrame(render);
        }
        render();

        return () => {
            resizeObserver.unobserve(canvas);
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [state])

    const context = { dispatch, objects: state }

    
    const indexedChildren = React.Children.map(children, (child,i) => 
        (
            React.isValidElement(child) ? React.cloneElement(child, { ...child.props, index: i }) : child
        )
    );

    return (
        <div id='canvas-container' style={{height: 700, width: '100%'}}>
            <canvas style={{width: '100%', height: '100%'}} ref={ref}>
                <CanvasContext.Provider value={context}>
                    {indexedChildren}
                </CanvasContext.Provider>
            </canvas>
        </div>
    )
};

export default Canvas

export { CanvasContext, useCanvas }
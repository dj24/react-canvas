
import {Fragment, useEffect} from 'react';
import { useCanvas } from './Canvas';

const Rect = ({x = 0, y = 0, width = 50, height = 50, fill = '#A5B4FC', stroke='#6366F1', borderRadius = 16, index}) => {
    const { dispatch } = useCanvas();

    useEffect( () => {
        if(index === undefined){
            return;
        }
        dispatch({index, type: 'rect',x,y,width,height, fill, stroke, borderRadius});
    },[x,y,width,height, fill, stroke, dispatch, borderRadius, index])

    return <Fragment/>
}

export default Rect;

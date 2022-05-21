import {useCallback, useEffect, useRef, useState} from "react";
import {rect, roundedRect} from "../util";

const useCanvasSetup = () => {
    const [canvas, setCanvas] = useState(null);
    const objects = useRef([]);
    const mousePosition = useRef({ x: 0, y: 0 });
    const [width, setWidth] = useState(null);
    const [height, setHeight] = useState(null);
    const lastFrameTime = useRef(0);

    const handleRef = (current) => {
        if (!current) {
            return;
        }
        setCanvas(current);
    }

    const dispatch = (action) => {
        const copiedState = [...objects.current];
        const { index, styles, targets, ...rest } = action;
        if (objects.current[index]) {
            Object.entries(objects.current[index].styles).forEach(([key, spring]) => {
                const from = objects.current[index].styles[key].get();
                const to = targets[key];
                spring.start({
                    from,
                    to,
                });
            });
        }
        // Add dispatched object into the objects array
        copiedState[action.index] = {
            ...rest,
            styles,
        };
        objects.current = copiedState;
    };

    const renderRect = useCallback(
        (obj) => {
            if (!canvas) {
                return;
            }
            const { borderRadius, styles, fill, stroke } = obj;
            const context = canvas.getContext("2d");

            // Using canvas means we need to tell springs how much to animate
            const currentTime = new Date().getTime();
            const deltaTime = currentTime - lastFrameTime.current;
            Object.values(styles).forEach((spring) => {
                spring.advance(deltaTime);
            });

            lastFrameTime.current = currentTime;
            context.save();
            // Apply Rotation
            const centerX = styles.x.get() + styles.width.get() / 2;
            const centerY = styles.y.get() + styles.height.get() / 2;
            context.translate(centerX, centerY);
            context.rotate((styles.rotate.get() * Math.PI) / 180);
            context.translate(-centerX, -centerY);
            if (borderRadius === 0) {
                rect(
                    context,
                    styles.x.get() + ((1 - styles.scale.get()) * styles.width.get()) / 2,
                    styles.y.get() + ((1 - styles.scale.get()) * styles.height.get()) / 2,
                    styles.width.get() * styles.scale.get(),
                    styles.height.get() * styles.scale.get(),
                    fill,
                    stroke
                );
            } else {
                roundedRect(
                    context,
                    styles.x.get() + ((1 - styles.scale.get()) * styles.width.get()) / 2,
                    styles.y.get() + ((1 - styles.scale.get()) * styles.height.get()) / 2,
                    styles.width.get() * styles.scale.get(),
                    styles.height.get() * styles.scale.get(),
                    fill,
                    stroke,
                    borderRadius * styles.scale.get()
                );
            }
            context.restore();
        },
        [canvas]
    );

    useEffect(() => {
        if (!canvas) {
            return;
        }
        let animationFrameId;
        const context = canvas.getContext("2d");
        const parent = canvas.parentNode;
        const resizeObserver = new ResizeObserver((entries) => {
            const {width, height} = entries[0].contentRect;
            setWidth(width * window.devicePixelRatio);
            setHeight(height * window.devicePixelRatio);
        });
        resizeObserver.observe(parent);
        if (!width || !height) return;

        const render = () => {
            context.setTransform(
                window.devicePixelRatio,
                0,
                0,
                window.devicePixelRatio,
                0,
                0
            );

            context.clearRect(
                0,
                0,
                width * window.devicePixelRatio,
                height * window.devicePixelRatio
            );
            objects.current.forEach(renderRect);
            rect(
                context,
                mousePosition.current.x - 10,
                mousePosition.current.y - 10,
                20,
                20,
                "red",
                "blue"
            );
            animationFrameId = window.requestAnimationFrame(render);
        };
        render();

        return () => {
            resizeObserver.unobserve(canvas);
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [canvas, renderRect, height, width]);

    return {
        dispatch,
        objects,
        mousePosition,
        width,
        height,
        handleRef,
        canvas,
    };
}

export default useCanvasSetup;
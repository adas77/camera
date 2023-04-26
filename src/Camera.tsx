import { useEffect, useRef, useState } from "react";
import { DEPTH } from "./consts";
import { getCtx, handleOnKey, rerender } from "./lib/draw";

globalThis.depth = DEPTH;

type Props = {
    rects: Point[][]
}

const Camera = ({ rects }: Props) => {
    const [painted, setPainted] = useState(false);
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const ctx = getCtx(ref);
        window.addEventListener('keydown', key => {
            let res = handleOnKey(key, globalThis.pos || rects, rects);
            if (res) globalThis.pos = res
            rerender(ctx, globalThis.pos || rects, painted);
        })
        rerender(ctx, globalThis.pos || rects, painted);

    }, [painted])

    return (
        <>
            <button
                onClick={() => {
                    setPainted(!painted)
                }}
                className="absolute top-5 left-24 ">
                {painted ? 'Linie' : 'Połączone'}
            </button>
            <canvas
                width={window.innerWidth}
                height={window.innerHeight}
                ref={ref}
            />
        </>
    )
}


export default Camera
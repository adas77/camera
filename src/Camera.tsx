import { useEffect, useRef, useState } from "react";
import { DEPTH } from "./consts";
import { getCtx, handleOnKey, rerender } from "./lib/draw";

type Props = {
    rects: Point[][]
}

const Camera = ({ rects }: Props) => {
    const [pos, setPos] = useState<Point[][]>(rects)
    const [painted, setPainted] = useState(false);
    const [depth, setDepth] = useState(DEPTH)
    const ref = useRef<HTMLCanvasElement>(null);

    const handleKeyDown = (e: KeyboardEvent) => {
        const res = handleOnKey(e.key, pos, rects, setDepth, setPainted);
        if (res) setPos(res)
    }

    useEffect(() => {
        const ctx = getCtx(ref);
        rerender(ctx, pos, painted, depth);
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [pos, depth, painted])

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
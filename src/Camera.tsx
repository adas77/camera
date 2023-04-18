import { useEffect, useRef } from "react";
import { handleOnKey, rerender } from "./lib/draw";
import { DEPTH } from "./consts";

type Props = {
    rects: Point[][]
    setMenu: React.Dispatch<React.SetStateAction<boolean>>
}

const Camera = ({ rects, setMenu }: Props) => {
    const ref = useRef<HTMLCanvasElement>(null)
    const startPos = rects
    globalThis.depth = DEPTH

    useEffect(() => {
        window.addEventListener('keydown', key => {
            setMenu(false)
            const newPos = handleOnKey(key, rects, startPos)
            if (newPos) rects = newPos
            if (ref.current) {
                const ctx = ref.current.getContext('2d')
                if (ctx) {
                    rerender(ctx, rects)
                }
            }
        })

        return () => {

        }
    }, [])


    return (
        <canvas
            width={window.innerWidth}
            height={window.innerHeight}
            ref={ref}
        />
    )
}

export default Camera
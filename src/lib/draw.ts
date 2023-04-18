import { DEPTH, DEPTH_JUMP } from "../consts"
import { proj, tr } from "./matrix"

export function rerender(ctx: CanvasRenderingContext2D, rects: Point[][]) {
    ctx.beginPath()
    ctx.strokeStyle = 'black'
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    rects.forEach((rect) => {
        drawRect(rect, ctx)
    })
    drawAxis(ctx)

}

export function handleOnKey(key: any, rects: Point[][], startpos?: Point[][]) {
    switch (key.key) {
        case 'm':
            window.location.reload()
            break

        case '-':
            globalThis.depth = DEPTH
            break

        case '0':
            return startpos

        case 'u':
            globalThis.depth += DEPTH_JUMP
            break

        case 'i':
            globalThis.depth -= DEPTH_JUMP
            break

        case 'a':
            return nextPos(rects, 'left')

        case 'd':
            return nextPos(rects, 'right')

        case 'w':
            return nextPos(rects, 'up')

        case 's':
            return nextPos(rects, 'down')

        case 'f':
            return nextPos(rects, 'front')

        case 'b':
            return nextPos(rects, 'back')

        case 'x':
            return nextPos(rects, 'rotX')

        case 'y':
            return nextPos(rects, 'rotY')

        case 'z':
            return nextPos(rects, 'rotZ')

        case '1':
            return nextPos(rects, 'rotXneg')

        case '2':
            return nextPos(rects, 'rotYneg')

        case '3':
            return nextPos(rects, 'rotZneg')

    }
}

function nextPos(rects: Point[][], move: Move): Point[][] {
    const newPositions: Point[][] = rects.map(r => r.map(p => tr(p, move)))
    return newPositions
}

function drawRect(rect: Point[], ctx: CanvasRenderingContext2D) {
    const projected: Point2D[] = rect.map(rect => proj(rect))

    for (let i = 0; i < 4; i++) {
        connect(i, (i + 1) % 4, projected, ctx);
        connect(i + 4, ((i + 1) % 4) + 4, projected, ctx);
        connect(i, i + 4, projected, ctx);
    }
}

function drawAxis(ctx: CanvasRenderingContext2D) {
    const startpos: Point2D = proj({
        x: 0,
        y: 0,
        z: 0,
    })

    const x: Point2D = proj({
        x: window.innerWidth,
        y: 0,
        z: 0,
    })
    const y: Point2D = proj({
        x: 0,
        y: window.innerWidth,
        z: 0
    })
    // const z: Point2D = proj({
    //     x: 0,
    //     y: 0,
    //     z: window.innerWidth,
    // })


    ctx.beginPath()
    ctx.strokeStyle = 'green'
    ctx.moveTo(startpos.x, startpos.y)
    ctx.lineTo(x.x, x.y)
    ctx.stroke()

    ctx.beginPath()
    ctx.strokeStyle = 'red'
    ctx.moveTo(startpos.x, startpos.y)
    ctx.lineTo(y.x, y.y)
    ctx.stroke()
}

function connect(i: number, j: number, points: Point2D[], ctx: CanvasRenderingContext2D) {
    const a = points[i]
    const b = points[j]
    ctx.moveTo(a.x, a.y)
    ctx.lineTo(b.x, b.y)
    ctx.stroke()
}
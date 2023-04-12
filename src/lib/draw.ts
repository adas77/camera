import { proj, tr } from "./matrix"

export function rerender(ctx: CanvasRenderingContext2D, rects: Point[][]) {
    ctx.beginPath()
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    rects.forEach((rect) => {
        drawRect(rect, ctx)
    })
}

export function handleOnKey(key: any, rects: Point[][], startpos?: Point[][]) {
    switch (key.key) {
        case 'm':
            window.location.reload()
        case '0':
            return startpos

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

function connect(i: number, j: number, points: Point2D[], ctx: CanvasRenderingContext2D) {
    const a = points[i]
    const b = points[j]
    ctx.moveTo(a.x, a.y)
    ctx.lineTo(b.x, b.y)
    ctx.stroke()
}
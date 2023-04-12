import { randomInt } from "mathjs"

export function rand1(rectsNum: number, maxCord: number): Point[][] {
    const rects = []
    for (let i = 0; i < rectsNum; i++) {
        const x1 = randomInt(0, maxCord)
        const x2 = randomInt(x1, x1 + maxCord)

        const y1 = randomInt(x2, x2 + maxCord)
        const y2 = randomInt(y1, y1 + maxCord)

        const z1 = randomInt(y2, y2 + maxCord)
        const z2 = randomInt(z1, z1 + maxCord)

        rects.push(
            [
                { x: x1, y: y2, z: z1 },
                { x: x2, y: y2, z: z1 },
                { x: x2, y: y2, z: z2 },
                { x: x1, y: y2, z: z2 },
                { x: x1, y: y1, z: z1 },
                { x: x2, y: y1, z: z1 },
                { x: x2, y: y1, z: z2 },
                { x: x1, y: y1, z: z2 },
            ],
        )
    }
    return rects
}

export function rand2(rectsNum: number, maxCord: number): Point[][] {
    const rects = []
    for (let i = 0; i < rectsNum; i++) {
        const x1 = randomInt(0, maxCord)
        const x2 = randomInt(x1, x1 + maxCord)

        const y1 = randomInt(0, maxCord)
        const y2 = randomInt(y1, y1 + maxCord)

        const z1 = randomInt(0, maxCord)
        const z2 = randomInt(z1, z1 + maxCord)

        rects.push(
            [
                { x: x1, y: y2, z: z1 },
                { x: x2, y: y2, z: z1 },
                { x: x2, y: y2, z: z2 },
                { x: x1, y: y2, z: z2 },
                { x: x1, y: y1, z: z1 },
                { x: x2, y: y1, z: z1 },
                { x: x2, y: y1, z: z2 },
                { x: x1, y: y1, z: z2 },
            ],
        )
    }
    return rects
}
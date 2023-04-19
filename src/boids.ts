let mousePos:Position = {x: 0, y: 0}

canvas.addEventListener("mousemove", event => {
    mousePos.x = event.pageX
    mousePos.y = event.pageY
})

class Boid
{
    pos:Position = {x: 0, y: 0}

    detectionSpaces = {
        left: {x: 7, y: -15} as Position,
        right: {x: 7, y: 15} as Position,
        leftfront: {x: 17, y: -12} as Position,
        rightfront: {x: 17, y: 12} as Position,
        leftfurtherfront: {x: 25, y: -5} as Position,
        rightfurtherfront: {x: 25, y: 5} as Position
    }
    
    speed:number = Math.random() * currentPreset.defaultSpeedMax + currentPreset.defaultSpeedMin

    // DEBUG: rotspd:number = Math.random() * 2 - 1

    dir:number = Math.floor(Math.random() * 360)

    // display stuff
    readonly radius:number = 6

    following:boolean = false

    color:string = colors[Math.floor(Math.random() * colors.length)]

    calculate(): void
    {
        // do the thing

        // debug
        if (this.following)
        {
            this.pos.x = mousePos.x
            this.pos.y = mousePos.y
            this.speed = 0
            this.dir = 90
        }

        //#region calculate detection spaces

        for (let k in this.detectionSpaces)
        {
            let space = this.detectionSpaces[k]

            let coords = getRotatedCoordinates(this.pos, space, this.dir)

            let hasHit = boidList.testPosTouchingBoid(coords)

            if (hasHit)
            {
                let turnAmount:number = k.length
                //turnAmount = 45 // funny (also change initial turn)
                if (getSide(k) == "left")
                {
                    this.dir += turnAmount
                    hasHit.dir -= turnAmount // turn other boid away
                }
                else
                {
                    this.dir -= turnAmount
                    hasHit.dir += turnAmount // turn other boid away
                }
            }
        }

        //#endregion

        //#region movement
        this.pos = moveInDirection(this)

        if (this.pos.x > WIDTH)  this.pos.x = 0
        if (this.pos.x < 0)      this.pos.x = WIDTH
        if (this.pos.y > HEIGHT) this.pos.y = 0
        if (this.pos.y < 0)      this.pos.y = HEIGHT
        //#endregion

        // normalise dir

        if (this.dir < 0)
        {
            this.dir = 360 - Math.abs(this.dir)
        }

        this.dir = this.dir % 360
    }

    draw(): void
    {
        ctx.fillStyle = this.color
        ctx.strokeStyle = "#000"
        
        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()

        let forwardsCoords = getRotatedCoordinates(this.pos, {x: 10, y: 0}, this.dir)
        ctx.beginPath()
        ctx.arc(forwardsCoords.x, forwardsCoords.y, this.radius / 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()

        if (drawDetectionSpaces) for (let k in this.detectionSpaces)
        {
            let space:Position = this.detectionSpaces[k]
            let coords:Position = getRotatedCoordinates(this.pos, space, this.dir)

            if (boidList.testPosTouchingBoid(coords)) ctx.fillStyle = "#0f0"
            else                                      ctx.fillStyle = this.color

            ctx.beginPath()
            ctx.arc(coords.x, coords.y, this.radius / 2, 0, Math.PI * 2)
            ctx.fill()
            //ctx.stroke() // DO NOT ENABLE - 1FPS
        }

        // draw average pos
        if (drawAveragePos)
        {
            let center = boidList.getAveragePos()
            ctx.fillStyle = "#f00"
            ctx.beginPath()
            ctx.arc(center.x, center.y, 10, 0, Math.PI * 2)
            ctx.fill()
            ctx.stroke()
        }
    }
}

class BoidList
{
    boids:Array<Boid> = new Array()

    calculateAll():void
    {
        for (let boid of this.boids)
        {
            boid.calculate()
        }
    }

    drawAll(): void
    {
        for (let boid of this.boids)
        {
            boid.draw()
        }
    }

    testPosTouchingBoid(pos: Position):Boid | undefined
    {
        let touches:Boid | undefined = undefined
        for (let boid of this.boids)
        {
            if (isWithinBoid(pos, boid)) touches = boid
        }

        return touches
    }

    getAveragePos():Position
    {
        let avgx:number = 0
        let avgy:number = 0

        for (let boid of this.boids)
        {
            avgx += boid.pos.x
            avgy += boid.pos.y
        }

        avgx /= this.boids.length
        avgy /= this.boids.length

        return {x: avgx, y: avgy}
    }
}

interface Position
{
    x:number
    y:number
}

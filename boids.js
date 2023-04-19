let mousePos = { x: 0, y: 0 };
canvas.addEventListener("mousemove", event => {
    mousePos.x = event.pageX;
    mousePos.y = event.pageY;
});
class Boid {
    constructor() {
        this.pos = { x: 0, y: 0 };
        this.detectionSpaces = {
            left: { x: 7, y: -15 },
            right: { x: 7, y: 15 },
            leftfront: { x: 17, y: -12 },
            rightfront: { x: 17, y: 12 },
            leftfurtherfront: { x: 25, y: -5 },
            rightfurtherfront: { x: 25, y: 5 }
        };
        this.speed = Math.random() * currentPreset.defaultSpeedMax + currentPreset.defaultSpeedMin;
        // DEBUG: rotspd:number = Math.random() * 2 - 1
        this.dir = Math.floor(Math.random() * 360);
        // display stuff
        this.radius = 6;
        this.following = false;
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    calculate() {
        // do the thing
        if (this.following) {
            this.pos.x = mousePos.x;
            this.pos.y = mousePos.y;
            this.speed = 0;
            this.dir = 90;
        }
        else {
            // right so calculating new direction to move in.
            //this.dir += 2
        }
        //#region calculate detection spaces
        for (let k in this.detectionSpaces) {
            let space = this.detectionSpaces[k];
            let coords = getRotatedCoordinates(this.pos, space, this.dir);
            let hasHit = boidList.testPosTouchingBoid(coords);
            if (hasHit) {
                let turnAmount = k.length;
                //turnAmount = 45 // funny (also change initial turn)
                if (getSide(k) == "left") {
                    this.dir += turnAmount;
                    hasHit.dir -= turnAmount; // turn other boid away
                }
                else {
                    this.dir -= turnAmount;
                    hasHit.dir += turnAmount; // turn other boid away
                }
            }
        }
        //#endregion
        //#region movement
        this.pos = moveInDirection(this);
        if (this.pos.x > WIDTH)
            this.pos.x = 0;
        if (this.pos.x < 0)
            this.pos.x = WIDTH;
        if (this.pos.y > HEIGHT)
            this.pos.y = 0;
        if (this.pos.y < 0)
            this.pos.y = HEIGHT;
        //#endregion
        // normalise dir
        if (this.dir < 0) {
            this.dir = 360 - Math.abs(this.dir);
        }
        this.dir = this.dir % 360;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.strokeStyle = "#000";
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        let forwardsCoords = getRotatedCoordinates(this.pos, { x: 10, y: 0 }, this.dir);
        ctx.beginPath();
        ctx.arc(forwardsCoords.x, forwardsCoords.y, this.radius / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        if (drawDetectionSpaces)
            for (let k in this.detectionSpaces) {
                let space = this.detectionSpaces[k];
                let coords = getRotatedCoordinates(this.pos, space, this.dir);
                if (boidList.testPosTouchingBoid(coords))
                    ctx.fillStyle = "#0f0";
                else
                    ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(coords.x, coords.y, this.radius / 2, 0, Math.PI * 2);
                ctx.fill();
                //ctx.stroke() // DO NOT ENABLE - 1FPS
            }
        // draw average pos
        if (drawAveragePos) {
            let center = boidList.getAveragePos();
            ctx.fillStyle = "#f00";
            ctx.beginPath();
            ctx.arc(center.x, center.y, 10, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        }
    }
}
class BoidList {
    constructor() {
        this.boids = new Array();
    }
    calculateAll() {
        for (let boid of this.boids) {
            boid.calculate();
        }
    }
    drawAll() {
        for (let boid of this.boids) {
            boid.draw();
        }
    }
    testPosTouchingBoid(pos) {
        let touches = undefined;
        for (let boid of this.boids) {
            if (isWithinBoid(pos, boid))
                touches = boid;
        }
        return touches;
    }
    getAveragePos() {
        let avgx = 0;
        let avgy = 0;
        for (let boid of this.boids) {
            avgx += boid.pos.x;
            avgy += boid.pos.y;
        }
        avgx /= this.boids.length;
        avgy /= this.boids.length;
        return { x: avgx, y: avgy };
    }
}
//# sourceMappingURL=boids.js.map
// ts file for library-like functions
// you'll see:
// (also credit for the functions are put before them. e.g a stackoverflow link, or chatgpt.)

let colors:Array<string> = [
    "#eb4034",
    "#12fc35",
    "#2629ed",
    "#ed9c11",
    "#11ede6",
    "#cc11ed"
]

let drawDetectionSpaces:boolean = false
let drawAveragePos:boolean = false

// chatGPT
function moveInDirection(boid: Boid): Position
{
    const angleDegrees:number = boid.dir
    const x:number = boid.pos.x
    const y:number = boid.pos.y
    const speed:number = boid.speed

    // convert angle to radians
    const angleRadians:number = angleDegrees * Math.PI / 180;
    
    // calculate new x and y position based on angle and speed
    const newX:number = x + speed * Math.cos(angleRadians);
    const newY:number = y + speed * Math.sin(angleRadians);
    
    // return new position as object with x and y properties
    return {x: newX, y: newY}
}

// chatGPT
function getRotatedCoordinates(pos:Position, offset:Position, angle: number): Position
{
    const radians = angle * (Math.PI / 180); // convert degrees to radians
    const rotatedX = offset.x * Math.cos(radians) - offset.y * Math.sin(radians);
    const rotatedY = offset.x * Math.sin(radians) + offset.y * Math.cos(radians);
    return {x: pos.x + rotatedX, y: pos.y + rotatedY};
}

// chatGPT
function isWithinBoid(pos:Position, boid:Boid): boolean
{
    // Calculate the distance between the two points using the Pythagorean theorem
    const distance = Math.sqrt((boid.pos.x - pos.x) ** 2 + (boid.pos.y - pos.y) ** 2);
  
    // If the distance is less than or equal to the radius, the point is within the circle
    return distance <= boid.radius;
}

function getSide(detectionSpaceName:string): string
{
    if (detectionSpaceName.includes("left")) return "left"
    else return "right"
}

// chatGPT
function getSmallestAngle(boid:Boid, x2: number, y2: number): number {
    const deltaX = x2 - boid.pos.x;
    const deltaY = y2 - boid.pos.y;
    let angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
    if (angle < 0) {
        angle += 360;
    }

    return angle;
}
  

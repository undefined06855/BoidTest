let boidList = new BoidList();
function main() {
    // make boids
    let DEBUG = false; // CHANGES THE FIRST BOID'S FOLLOWING=TRUE IF ENABLED
    canvas.style.backgroundColor = "rgb(60, 60, 60)";
    do {
        let boid = new Boid();
        boid.pos.x = Math.random() * WIDTH;
        boid.pos.y = Math.random() * HEIGHT;
        boid.following = DEBUG;
        boidList.boids.push(boid);
        DEBUG = false;
    } while (boidList.boids.length < currentPreset.boids);
    frame();
}
function frame() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    boidList.calculateAll();
    boidList.drawAll();
    requestAnimationFrame(frame);
}
//canvas.style.cursor = "none"
main();
//# sourceMappingURL=main.js.map
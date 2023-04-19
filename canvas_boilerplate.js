// Canvas Boilerplate code for an only canvas application / game.
// Made by undefined06855 13/4/2023
/*
 *NOTE: the index.html MUST have a html, body and head tag. There must be nothing in
 * the body tag. The canvas will be inserted into the body tag, and the style will be
 * inserted after everything else in the head tag.
 */
let canvas, ctx, WIDTH, HEIGHT;
(() => {
    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    let b = document;
    WIDTH = 0;
    HEIGHT = 0;
    // add css
    let a = b.createElement("style");
    a.innerText = "*{margin:0;padding:0;width:100vw;height:100vh;overflow:hidden;}";
    b.head.appendChild(a);
    b.body.appendChild(canvas);
    let A = window;
    const r = () => {
        // MODIFIED
        let scale = 1;
        canvas.width = A.innerWidth * scale;
        canvas.height = A.innerHeight * scale;
        WIDTH = canvas.width * scale;
        HEIGHT = canvas.height * scale;
    };
    // eventlisteners!
    A.addEventListener("resize", r);
    r();
})();
//# sourceMappingURL=canvas_boilerplate.js.map
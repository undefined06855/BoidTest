const PRESETS = {
    "normal-200": {
        boids: 750,
        defaultSpeedMin: 2,
        defaultSpeedMax: 2 // the default max speed subtract the minimum
    },
    "debug": {
        boids: 2,
        defaultSpeedMin: 0,
        defaultSpeedMax: 0
    }
};
let currentPreset = PRESETS["normal-200"];
//# sourceMappingURL=presets.js.map
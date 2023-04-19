interface Preset
{
    boids:number,
    defaultSpeedMin:number,
    defaultSpeedMax:number
}

const PRESETS:object = {
    "normal-200": {
        boids: 750,
        defaultSpeedMin: 2,
        defaultSpeedMax: 2 // the default max speed subtract the minimum
    } as Preset,
    "debug": {
        boids: 2,
        defaultSpeedMin: 0,
        defaultSpeedMax: 0
    } as Preset
}

let currentPreset:Preset = PRESETS["normal-200"]

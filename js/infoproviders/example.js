import { update } from '../overlay.js';

function exampleInit(ip, port, prefix, updateRate) {
    console.log('exampleInit');
    setTimeout(update, updateRate); // For the example this is only run once, so putting it here is fine.
}

function exampleShipInfo() {
    return {
        "maxHealth": 11800.0,
        "minHealth": 1888.0,
        "currentHealth": 10180.333,
        "maxFuel": 16,
        "currentFuel": 6,
        "currentSalvage": 13,
        "currentGems": 72
    }
}

function exampleCrewList() {
    return [{
        "name": "MoSadie",
        "archetype": "hamster",
        "skin": "HamsterWildWest",
        "level": 15,
        "xp": 87661,
        "currentHealth": 40.0,
        "maxHealth": 40.0,
        "currentShields": 0.0,
        "maxShields": 40.0,
        "isCaptain": true,
        "isLocalPlayer": true
    }];
}

function exampleEnemyShipInfo() {
    return {
        "maxHealth": 10868.0,
        "minHealth": 0.0,
        "currentHealth": 3053.50952,
        "name": "FUEL SPEEDER",
        "invaders": "None",
        "intel": "Automated fuel supply ship. Lightly armed but built for extreme speed.",
        "threatLevel": 5,
        "cargoLevel": 5,
        "speedLevel": 10
    }
}

function exampleUnload() {
    console.log('exampleUnload');
}

export { exampleInit, exampleShipInfo, exampleCrewList, exampleEnemyShipInfo, exampleUnload };
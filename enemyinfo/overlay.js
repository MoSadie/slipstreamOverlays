import { getSettings, init, infoProviderEnemyShipInfo } from '../js/overlay.js';

var overlay = document.getElementById('overlay');

function updateOverlay(updateData) {
    var shipInfo = undefined;

    if (updateData) {
        shipInfo = infoProviderEnemyShipInfo();
    }

    if (!shipInfo || shipInfo == null || shipInfo.maxHealth == 0 || shipInfo.currentHealth == 0) {
        // Hide overlay
        overlay.style.display = 'none';
    } else {
        // Show overlay
        overlay.style.display = 'block';
    }

    var settings = getSettings();

    // Health
    var health = document.getElementById('health');
    var healthText = document.getElementById('health-text');

    switch (settings.health) {
        case 'number':
            health.style.display = 'block';
            healthText.style.display = 'block';
            healthText.style.fontFamily = settings.font;
            healthText.style.fontSize = `${settings.size}px`;
            healthText.style.color = `#${settings.color}`;
            // cut the decimal places off of the health numbers
            shipInfo.currentHealth = Math.floor(shipInfo.currentHealth);
            shipInfo.maxHealth = Math.floor(shipInfo.maxHealth);

            healthText.innerText = shipInfo ? `${shipInfo.currentHealth - shipInfo.minHealth} / ${shipInfo.maxHealth - shipInfo.minHealth} Health` : healthText.innerText;
            break;
        case 'percentage':
            health.style.display = 'block';
            healthText.style.display = 'block';
            healthText.style.fontFamily = settings.font;
            healthText.style.fontSize = `${settings.size}px`;
            healthText.style.color = `#${settings.color}`;
            healthText.innerText = shipInfo ? `${Math.round((shipInfo.currentHealth - shipInfo.minHealth) / (shipInfo.maxHealth - shipInfo.minHealth) * 100)}% Health` : healthText.innerText;
            break;
        case 'hide':
            health.style.display = 'none';
            healthText.style.display = 'none';
            break;
    }

    // Name
    var name = document.getElementById('name');
    var nameText = document.getElementById('name-text');

    // Convert the string to a boolean, if needed
    settings.name = settings.name === "true" || settings.name === true;

    if (settings.name) {
        name.style.display = 'block';
        nameText.style.display = 'block';
        nameText.style.fontFamily = settings.font;
        nameText.style.fontSize = `${settings.size}px`;
        nameText.style.color = `#${settings.color}`;
        nameText.innerText = shipInfo ? shipInfo.name : nameText.innerText;
    } else {
        name.style.display = 'none';
        nameText.style.display = 'none';
    }

    // Intel
    var intel = document.getElementById('intel');
    var intelText = document.getElementById('intel-text');

    // Convert the string to a boolean, if needed
    settings.intel = settings.intel === "true" || settings.intel === true;

    if (settings.intel) {
        intel.style.display = 'block';
        intelText.style.display = 'block';
        intelText.style.fontFamily = settings.font;
        intelText.style.fontSize = `${settings.size}px`;
        intelText.style.color = `#${settings.color}`;
        intelText.innerText = shipInfo ? `${shipInfo.intel}` : intelText.innerText;
    } else {
        intel.style.display = 'none';
        intelText.style.display = 'none';
    }

    // Invader
    var invader = document.getElementById('invaders');
    var invaderText = document.getElementById('invaders-text');

    // Convert the string to a boolean, if needed
    settings.invaders = settings.invaders === "true" || settings.invaders === true;

    if (settings.invaders) {
        invader.style.display = 'block';
        invaderText.style.display = 'block';
        invaderText.style.fontFamily = settings.font;
        invaderText.style.fontSize = `${settings.size}px`;
        invaderText.style.color = `#${settings.color}`;
        invaderText.innerText = shipInfo ? `${shipInfo.invaders}` : invaderText.innerText;
    } else {
        invader.style.display = 'none';
        invaderText.style.display = 'none';
    }

    // Threat
    var threat = document.getElementById('threat');
    var threatText = document.getElementById('threat-text');

    // Convert the string to a boolean, if needed
    settings.threat = settings.threat === "true" || settings.threat === true;

    if (settings.threat) {
        threat.style.display = 'block';
        threatText.style.display = 'block';
        threatText.style.fontFamily = settings.font;
        threatText.style.fontSize = `${settings.size}px`;
        threatText.style.color = `#${settings.color}`;
        threatText.innerText = shipInfo ? `Threat: ${shipInfo.threatLevel}` : threatText.innerText;
    } else {
        threat.style.display = 'none';
        threatText.style.display = 'none';
    }

    // Cargo
    var cargo = document.getElementById('cargo');
    var cargoText = document.getElementById('cargo-text');

    // Convert the string to a boolean, if needed
    settings.cargo = settings.cargo === "true" || settings.cargo === true;

    if (settings.cargo) {
        cargo.style.display = 'block';
        cargoText.style.display = 'block';
        cargoText.style.fontFamily = settings.font;
        cargoText.style.fontSize = `${settings.size}px`;
        cargoText.style.color = `#${settings.color}`;
        cargoText.innerText = shipInfo ? `Cargo: ${shipInfo.cargoLevel}` : cargoText.innerText;
    } else {
        cargo.style.display = 'none';
        cargoText.style.display = 'none';
    }

    // Speed
    var speed = document.getElementById('speed');
    var speedText = document.getElementById('speed-text');

    // Convert the string to a boolean, if needed
    settings.speed = settings.speed === "true" || settings.speed === true;

    if (settings.speed) {
        speed.style.display = 'block';
        speedText.style.display = 'block';
        speedText.style.fontFamily = settings.font;
        speedText.style.fontSize = `${settings.size}px`;
        speedText.style.color = `#${settings.color}`;
        speedText.innerText = shipInfo ? `Speed: ${shipInfo.speedLevel}` : speedText.innerText;
    } else {
        speed.style.display = 'none';
        speedText.style.display = 'none';
    }
}

addEventListener('beforeunload', function () {
    infoHandlerUnload();
});

init(updateOverlay);
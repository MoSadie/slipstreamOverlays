import { getSettings, init, infoProviderShipInfo } from '../js/overlay.js';

function updateOverlay(updateData) {
    var shipInfo = undefined;

    if (updateData) {
        shipInfo = infoProviderShipInfo();
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
            healthText.innerText = shipInfo ? `${shipInfo.currentHealth - shipInfo.minHealth} / ${shipInfo.maxHealth - shipInfo.minHealth}` : healthText.innerText;
            break;
        case 'percentage':
            health.style.display = 'block';
            healthText.style.display = 'block';
            healthText.style.fontFamily = settings.font;
            healthText.style.fontSize = `${settings.size}px`;
            healthText.style.color = `#${settings.color}`;
            healthText.innerText = shipInfo ? `${Math.round((shipInfo.currentHealth - shipInfo.minHealth) / (shipInfo.maxHealth - shipInfo.minHealth) * 100)}%` : healthText.innerText;
            break;
        case 'hide':
            health.style.display = 'none';
            healthText.style.display = 'none';
            break;
    }

    // Fuel
    var fuel = document.getElementById('fuel');
    var fuelText = document.getElementById('fuel-text');

    // Convert the string to a boolean, if needed
    settings.fuel = settings.fuel === "true" || settings.fuel === true;

    if (settings.fuel) {
        fuel.style.display = 'block';
        fuelText.style.display = 'block';
        fuelText.style.fontFamily = settings.font;
        fuelText.style.fontSize = `${settings.size}px`;
        fuelText.style.color = `#${settings.color}`;
        fuelText.innerText = shipInfo ? `${shipInfo.currentFuel}/${shipInfo.maxFuel} Fuel` : fuelText.innerText;
    } else {
        fuel.style.display = 'none';
        fuelText.style.display = 'none';
    }

    // Salvage
    var salvage = document.getElementById('salvage');
    var salvageText = document.getElementById('salvage-text');

    // Convert the string to a boolean, if needed
    settings.salvage = settings.salvage === "true" || settings.salvage === true;

    if (settings.salvage) {
        salvage.style.display = 'block';
        salvageText.style.display = 'block';
        salvageText.style.fontFamily = settings.font;
        salvageText.style.fontSize = `${settings.size}px`;
        salvageText.style.color = `#${settings.color}`;
        salvageText.innerText = shipInfo ? `${shipInfo.currentSalvage} Salvage` : salvageText.innerText;
    } else {
        salvage.style.display = 'none';
        salvageText.style.display = 'none';
    }

    // Gems
    var gems = document.getElementById('gems');
    var gemsText = document.getElementById('gems-text');

    // Convert the string to a boolean, if needed
    settings.gems = settings.gems === "true" || settings.gems === true;

    if (settings.gems) {
        gems.style.display = 'block';
        gemsText.style.display = 'block';
        gemsText.style.fontFamily = settings.font;
        gemsText.style.fontSize = `${settings.size}px`;
        gemsText.style.color = `#${settings.color}`;
        gemsText.innerText = shipInfo ? `${shipInfo.currentGems} Gems` : gemsText.innerText;
    } else {
        gems.style.display = 'none';
        gemsText.style.display = 'none';

        console.log(gemsText);
        gemsText.innerText = "banana";
    }
}

addEventListener('beforeunload', function () {
    infoHandlerUnload();
});

init(updateOverlay);
import { exampleInit, exampleShipInfo, exampleCrewList, exampleEnemyShipInfo, exampleUnload } from "./infoproviders/example.js";
import { slipInfoInit, slipInfoShipInfo, slipInfoCrewList, slipInfoEnemyShipInfo, slipInfoUnload } from "./infoproviders/slipinfo.js";

var infoProviderInit = undefined;
export var infoProviderShipInfo = undefined;
export var infoProviderCrewList = undefined;
export var infoProviderEnemyShipInfo = undefined;
export var infoProviderUnload = undefined;

var settings = {};
export function getSettings() {
    return settings;
}
var hideOnError = undefined;
var isErrored = false;
export function setError(error) {
    isErrored = error;
}

var updateOverlay = undefined;

export function init(updateFunction) {
    updateOverlay = updateFunction;

    // Parse the URL parameters
    var url = new URL(window.location.href);

    // Create an object to hold the parameters
    var params = {};

    // Iterate over the URL search parameters
    url.searchParams.forEach(function (value, key) {
        // Add the parameter to the object
        params[key] = value;
    });

    console.log(params);

    // Get the hideOnError parameter
    hideOnError = params["onerror"] === "hide";
    // Remove the hideOnError parameter from the object
    delete params["onerror"];

    // Get the info provider from the URL parameters
    switch (params["provider"]) {
        case "example":
            infoProviderInit = exampleInit;
            infoProviderShipInfo = exampleShipInfo;
            infoProviderCrewList = exampleCrewList;
            infoProviderEnemyShipInfo = exampleEnemyShipInfo;
            infoProviderUnload = exampleUnload;
            break;
        case "slipinfo":
            infoProviderInit = slipInfoInit;
            infoProviderShipInfo = slipInfoShipInfo;
            infoProviderCrewList = slipInfoCrewList;
            infoProviderEnemyShipInfo = slipInfoEnemyShipInfo;
            infoProviderUnload = slipInfoUnload;
            break;
        default:
            console.error("Unknown info provider: " + params["provider"]);
            isErrored = true;
            update();
            return;
    }

    // Remove the provider parameter from the object
    delete params["provider"];

    // Get the IP, port, and updateRate from the URL parameters
    var ip = params["ip"];
    var port = params["port"];
    var prefix = params["prefix"];
    var updateRate = params["updateRate"] || 1000;

    // Check if the IP, port, and prefix are valid
    if (ip == undefined || port == undefined || prefix == undefined) {
        console.error("IP, port, and prefix are required");
        isErrored = true;
        return;
    }

    // Remove the IP and port parameters from the object
    delete params["ip"];
    delete params["port"];
    delete params["prefix"];
    delete params["updateRate"];

    // Initialize the info provider
    infoProviderInit(ip, port, prefix, updateRate);

    // Set the reset of the parameters as settings
    settings = params;

    update(); // Defined in overlay.html for the specific overlay
}

export function update() {
    if (isErrored) {
        // Hide the overlay if there was an error and hideOnError is true
        if (hideOnError) {
            document.getElementById("overlay").style.display = "none";
        }
        updateOverlay(false); // Defined in overlay.html for the specific overlay
        return;
    }

    updateOverlay(true); // Defined in overlay.html for the specific overlay
}

export function unload() {
    infoProviderUnload();
}
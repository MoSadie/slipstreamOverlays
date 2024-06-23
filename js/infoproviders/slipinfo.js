import { setError, update } from '../overlay.js';

var ip;
var port;
var prefix;
var interval;

var shipInfo = {};
var crewList = [];
var enemyInfo = {};

function slipInfoInit(ipIn, portIn, prefixIn, updateRate) {
    console.log('slipInfoInit');
    ip = ipIn;
    port = portIn;
    prefix = prefixIn;

    interval = setInterval(pingGame, updateRate);
}

async function pingGame() {
    try {
        // Ship Info
        var shipResponse = await fetch(`http://${ip}:${port}/${prefix}/getShipInfo`);
        var newShipInfo = await shipResponse.json();


        if (shipResponse.status != 200) {
            setError(true);
            console.error(`Failed to fetch ship info: ${shipResponse.status}`);
            return;
        }

        shipInfo = newShipInfo

        // Crew List

        var crewListResponse = await fetch(`http://${ip}:${port}/${prefix}/getCrew`);
        var newCrewList = await crewListResponse.json();

        if (crewListResponse.status != 200) {
            setError(true);
            console.error(`Failed to fetch crew list: ${crewListResponse.status}`);
            return;
        } else if (!newCrewList.crewList) {
            setError(true);
            console.error(`Failed to resolve crew list: ${newCrewList.error}`);
            return;
        }

        crewList = newCrewList.crewList;

        // Enemy Info

        var enemyResponse = await fetch(`http://${ip}:${port}/${prefix}/getEnemyShipInfo`);
        var newEnemyInfo = await enemyResponse.json();

        if (enemyResponse.status != 200) {
            setError(true);
            console.error(`Failed to fetch enemy info: ${enemyResponse.status}`);
            return;
        } else if (!newEnemyInfo.enemyShip) {
            setError(true);
            console.error(`Failed to resolve enemy info: ${newEnemyInfo.error}`);
            return;
        }


        enemyInfo = newEnemyInfo.enemyShip;

        setError(false);
        update();
    } catch (e) {
        setError(true);
        console.error(`Failed to fetch ship info: ${e}`);
        update();
    }
}

function slipInfoShipInfo() {
    return shipInfo;
}

function slipInfoCrewList() {
    return crewList;
}

function slipInfoEnemyShipInfo() {
    return enemyInfo;
}

function slipInfoUnload() {
    console.log('slipInfoUnload');
    clearInterval(interval);
}

export { slipInfoInit, slipInfoShipInfo, slipInfoCrewList, slipInfoEnemyShipInfo, slipInfoUnload };
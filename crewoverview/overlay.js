import { getSettings, init, infoProviderCrewList, infoProviderUnload } from '../js/overlay.js';

// get the animals in the crew list
var bearLI = document.getElementById('bear');
var catLI = document.getElementById('cat');
var crocLI = document.getElementById('croc');
var hamsterLI = document.getElementById('hamster');
var octopusLI = document.getElementById('octopus');
var turtleLI = document.getElementById('turtle');

function updateLI(li, liText, name, number, total) {
    var settings = getSettings();

    // Convert the strings to a boolean, if needed
    settings.hideempty = settings.hideempty === "true" || settings.hideempty === true;
    settings.percentage = settings.label === "percentage" || settings.percentage === true;


    if (number > 0 || !settings.hideempty) {
        li.style.display = 'block';
        liText.style.display = 'block';
        liText.style.fontFamily = settings.font;
        liText.style.fontSize = `${settings.size}px`;
        liText.style.color = `#${settings.color}`;

        switch (settings.label) {
            case 'percent':
                liText.innerText = `${name}: ${Math.round((number / total) * 100)}%`;
                break;

            case 'total':
                liText.innerText = `${name}: ${number}`;
                break;

            default:
                console.error('Unknown label setting: ' + settings.label);
                break;
        }
    } else {
        li.style.display = 'none';
        liText.style.display = 'none';
    }
}

function updateOverlay(updateData) {
    var crewList = undefined;

    if (updateData) {
        crewList = infoProviderCrewList();
    }

    var settings = getSettings();

    // Total Crew Text
    var totalCrew = document.getElementById('total-crew');
    var totalCrewText = document.getElementById('total-crew-text');

    // Convert the string to a boolean, if needed
    settings.total = settings.total === "true" || settings.total === true;

    if (settings.total) {
        totalCrew.style.display = 'block';
        totalCrewText.style.display = 'block';
        totalCrewText.style.fontFamily = settings.font;
        totalCrewText.style.fontSize = `${settings.size}px`;
        totalCrewText.style.color = `#${settings.color}`;
        totalCrewText.innerText = crewList ? `Total Crew: ${crewList.length}` : totalCrewText.innerText;
    } else {
        totalCrew.style.display = 'none';
        totalCrewText.style.display = 'none';
    }

    var crewLiList = [];

    // Bear

    var bear = document.getElementById('bear');
    var bearText = document.getElementById('bear-text');
    var bearCount = crewList.filter(crew => crew.archetype === 'bear').length;
    updateLI(bear, bearText, "Bear", bearCount, crewList.length);

    crewLiList.push({
        li: bearLI,
        count: bearCount,
        name: 'bear'
    });

    // Cat

    var cat = document.getElementById('cat');
    var catText = document.getElementById('cat-text');
    var catCount = crewList.filter(crew => crew.archetype === 'cat').length;
    updateLI(cat, catText, "Cat", catCount, crewList.length);

    crewLiList.push({
        li: catLI,
        count: catCount,
        name: 'cat'
    });

    // Crocodile

    var croc = document.getElementById('croc');
    var crocText = document.getElementById('croc-text');
    var crocCount = crewList.filter(crew => crew.archetype === 'croc').length;
    updateLI(croc, crocText, "Croc", crocCount, crewList.length);

    crewLiList.push({
        li: crocLI,
        count: crocCount,
        name: 'crocodile'
    });

    // Hamster

    var hamster = document.getElementById('hamster');
    var hamsterText = document.getElementById('hamster-text');
    var hamsterCount = crewList.filter(crew => crew.archetype === 'hamster').length;
    updateLI(hamster, hamsterText, "Hamster", hamsterCount, crewList.length);

    crewLiList.push({
        li: hamsterLI,
        count: hamsterCount,
        name: 'hamster'
    });

    // Octopus

    var octopus = document.getElementById('octopus');
    var octopusText = document.getElementById('octopus-text');
    var octopusCount = crewList.filter(crew => crew.archetype === 'octopus').length;
    updateLI(octopus, octopusText, "Octopus", octopusCount, crewList.length);

    crewLiList.push({
        li: octopusLI,
        count: octopusCount,
        name: 'octopus'
    });

    // Turtle

    var turtle = document.getElementById('turtle');
    var turtleText = document.getElementById('turtle-text');
    var turtleCount = crewList.filter(crew => crew.archetype === 'turtle').length;
    updateLI(turtle, turtleText, "Turtle", turtleCount, crewList.length);

    crewLiList.push({
        li: turtleLI,
        count: turtleCount,
        name: 'turtle'
    });

    // Sort the crew list based on the settings
    var crewListElement = document.getElementById('crew-list');
    crewListElement.innerHTML = '';

    switch (settings.sort) {
        case 'least':
            crewLiList.sort((a, b) => a.count - b.count);
            break;
        case 'most':
            crewLiList.sort((a, b) => b.count - a.count);
            break;
        case 'alphabetical':
            crewLiList.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            console.error('Unknown sort setting: ' + settings.sort);
            break;
    }

    crewLiList.forEach(crew => {
        crewListElement.appendChild(crew.li);
    });

}

addEventListener('beforeunload', function () {
    infoProviderUnload();
});

init(updateOverlay);
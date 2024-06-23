function generate() {
    console.log("Generating overlay...");

    // Get the values from the form and generate the URL relative to the current window (making sure to replace generator.html with overlay.html)
    var url = window.location.href;
    var path = url.substring(0, url.lastIndexOf("/"));
    var overlay = path + "/overlay.html";

    // Get all input children of the form element and get the values from them, appending them to the URL as query parameters
    var form = document.getElementById("generator");
    var inputs = form.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        var value = input.value;
        // If color, remove the # from the value
        if (input.type == "color") {
            value = value.substring(1);
        } else if (input.type == "checkbox") {
            value = input.checked;
        }
        overlay += (i == 0) ? "?" : "&";
        overlay += input.name + "=" + value;
    }

    // Get all select children of the form element and get the values from them, appending them to the URL as query parameters
    var selects = form.getElementsByTagName("select");
    for (var i = 0; i < selects.length; i++) {
        var select = selects[i];
        overlay += "&" + select.name + "=" + select.value;
    }

    // Update the URL display with the generated URL
    document.getElementById("generatedURL").innerText = overlay;

    // Update the iframe to show the overlay
    document.getElementById("preview").src = overlay;

    console.log("Generated overlay: " + overlay);
}

function copy() {
    var copyText = document.getElementById("generatedURL").innerText;

    console.log("Copying " + copyText);
    navigator.clipboard.writeText(copyText);
    document.getElementById("copyButton").innerHTML = "Copied!";
    setTimeout(function () { document.getElementById("copyButton").innerHTML = "Copy URL"; }, 2000);
}
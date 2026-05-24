function random(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;
}

function updateDashboard() {

    // WATER SYSTEM
    document.getElementById(
        "reservoirLevel"
    ).innerText =
        random(50, 100) + "%";

    document.getElementById(
        "mixingLevel"
    ).innerText =
        random(30, 90) + "%";

    document.getElementById(
        "flowRate"
    ).innerText =
        random(2, 10) + " L/min";

    // ENVIRONMENT
    document.getElementById(
        "temperature"
    ).innerText =
        random(25, 35) + "°C";

    document.getElementById(
        "humidity"
    ).innerText =
        random(50, 90) + "%";

    document.getElementById(
        "lightLevel"
    ).innerText =
        random(500, 3000) + " lux";

    document.getElementById(
        "soilA"
    ).innerText =
        random(40, 90) + "%";

    document.getElementById(
        "soilB"
    ).innerText =
        random(40, 90) + "%";

    document.getElementById(
        "soilC"
    ).innerText =
        random(40, 90) + "%";

    // FERTIGATION
    document.getElementById(
        "nitrogen"
    ).innerText =
        random(100, 250) + " ppm";

    document.getElementById(
        "phosphorus"
    ).innerText =
        random(50, 150) + " ppm";

    document.getElementById(
        "potassium"
    ).innerText =
        random(100, 300) + " ppm";

    document.getElementById(
        "phLevel"
    ).innerText =
        (Math.random() * 2 + 5.5)
        .toFixed(2);

    document.getElementById(
        "ecLevel"
    ).innerText =
        (Math.random() * 2 + 1)
        .toFixed(2) + " mS/cm";

    // ENERGY
    document.getElementById(
        "batteryLevel"
    ).innerText =
        random(40, 100) + "%";

    document.getElementById(
        "voltage"
    ).innerText =
        random(11, 14) + "V";

    document.getElementById(
        "current"
    ).innerText =
        random(1, 10) + "A";

    document.getElementById(
        "powerDraw"
    ).innerText =
        random(50, 500) + "W";

    // POWER SOURCE
    document.getElementById(
        "powerSource"
    ).innerText =
        Math.random() > 0.5
            ? "Solar"
            : "Battery";

    // DEVICE STATUS
    toggleDevice(
        "transferPumpStatus"
    );

    toggleDevice(
        "boosterPumpStatus"
    );
}

function toggleDevice(id) {

    let element =
        document.getElementById(id);

    let isOn =
        Math.random() > 0.5;

    element.innerText =
        isOn ? "ON" : "OFF";

    element.className =
        "device-status " +
        (isOn ? "on" : "off");
}

// BUTTONS

document.getElementById(
    "transferPumpBtn"
).addEventListener(
    "click",
    () => alert(
        "Transfer Pump toggled"
    )
);

document.getElementById(
    "boosterPumpBtn"
).addEventListener(
    "click",
    () => alert(
        "Booster Pump toggled"
    )
);

document.getElementById(
    "nutrientPumpBtn"
).addEventListener(
    "click",
    () => alert(
        "Nutrient Pump toggled"
    )
);

document.getElementById(
    "valveBtn"
).addEventListener(
    "click",
    () => alert(
        "Solenoid Valve toggled"
    )
);

document.getElementById(
    "mixerBtn"
).addEventListener(
    "click",
    () => alert(
        "Mixer Motor toggled"
    )
);

document.getElementById(
    "emergencyStop"
).addEventListener(
    "click",
    () => {

        alert(
            "EMERGENCY STOP ACTIVATED"
        );

        document.getElementById(
            "systemState"
        ).innerText =
            "EMERGENCY";

        document.getElementById(
            "systemState"
        ).className =
            "status off";
    }
);

// UPDATE EVERY 2 SECONDS
setInterval(
    updateDashboard,
    2000
);

// START IMMEDIATELY
updateDashboard();

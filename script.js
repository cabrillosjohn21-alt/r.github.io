function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* ==========================
   PHILIPPINE CROP DATABASE
========================== */
const cropDatabase = {
    pechay: {
        seedling: { n: 70, p: 35, k: 110, ph: "6.0 - 6.5", ec: "1.0 - 1.4", moisture: "65%" },
        vegetative: { n: 140, p: 50, k: 210, ph: "6.0 - 7.0", ec: "1.5 - 2.0", moisture: "75%" }
    },
    kangkong: {
        seedling: { n: 60, p: 30, k: 100, ph: "5.5 - 6.5", ec: "0.8 - 1.2", moisture: "75%" },
        vegetative: { n: 150, p: 45, k: 220, ph: "5.5 - 6.8", ec: "1.2 - 1.8", moisture: "85%" }
    },
    sitaw: {
        seedling: { n: 50, p: 40, k: 90, ph: "6.0 - 6.2", ec: "1.0 - 1.4", moisture: "60%" },
        vegetative: { n: 100, p: 60, k: 160, ph: "6.0 - 6.8", ec: "1.4 - 2.0", moisture: "70%" },
        flowering: { n: 90, p: 80, k: 200, ph: "6.0 - 6.8", ec: "1.8 - 2.2", moisture: "75%" }
    },
    talong: {
        seedling: { n: 100, p: 40, k: 110, ph: "5.8 - 6.2", ec: "1.2 - 1.6", moisture: "65%" },
        vegetative: { n: 190, p: 55, k: 210, ph: "5.8 - 6.5", ec: "2.0 - 2.5", moisture: "70%" },
        flowering: { n: 160, p: 65, k: 260, ph: "5.8 - 6.5", ec: "2.2 - 2.8", moisture: "75%" },
        fruiting: { n: 140, p: 70, k: 300, ph: "5.8 - 6.5", ec: "2.4 - 3.2", moisture: "80%" }
    },
    silinglabuyo: {
        seedling: { n: 90, p: 40, k: 110, ph: "5.8 - 6.2", ec: "1.0 - 1.5", moisture: "65%" },
        vegetative: { n: 170, p: 50, k: 210, ph: "5.8 - 6.5", ec: "1.8 - 2.4", moisture: "70%" },
        flowering: { n: 130, p: 65, k: 250, ph: "5.8 - 6.5", ec: "2.0 - 2.8", moisture: "75%" },
        fruiting: { n: 110, p: 70, k: 290, ph: "5.8 - 6.5", ec: "2.2 - 3.2", moisture: "75%" }
    },
    kamatis: {
        seedling: { n: 120, p: 50, k: 100, ph: "5.8 - 6.2", ec: "1.2 - 1.8", moisture: "65%" },
        vegetative: { n: 220, p: 60, k: 180, ph: "5.8 - 6.5", ec: "2.0 - 3.0", moisture: "70%" },
        flowering: { n: 180, p: 70, k: 250, ph: "5.8 - 6.5", ec: "2.5 - 3.2", moisture: "75%" },
        fruiting: { n: 160, p: 70, k: 300, ph: "5.8 - 6.5", ec: "2.5 - 3.5", moisture: "80%" }
    },
    ampalaya: {
        seedling: { n: 90, p: 50, k: 120, ph: "6.0 - 6.5", ec: "1.2 - 1.5", moisture: "65%" },
        vegetative: { n: 180, p: 60, k: 220, ph: "6.0 - 6.8", ec: "1.8 - 2.4", moisture: "70%" },
        flowering: { n: 150, p: 75, k: 260, ph: "6.0 - 6.8", ec: "2.2 - 2.8", moisture: "75%" },
        fruiting: { n: 130, p: 80, k: 310, ph: "6.0 - 6.8", ec: "2.4 - 3.2", moisture: "75%" }
    },
    kalamansi: {
        seedling: { n: 100, p: 30, k: 90, ph: "5.5 - 6.0", ec: "1.0 - 1.4", moisture: "60%" },
        vegetative: { n: 180, p: 50, k: 180, ph: "5.5 - 6.5", ec: "1.5 - 2.2", moisture: "65%" },
        flowering: { n: 150, p: 70, k: 220, ph: "5.5 - 6.5", ec: "2.0 - 2.6", moisture: "70%" },
        fruiting: { n: 120, p: 60, k: 280, ph: "5.5 - 6.5", ec: "2.2 - 3.0", moisture: "70%" }
    },
    strawberry: {
        seedling: { n: 70, p: 40, k: 90, ph: "5.5 - 6.0", ec: "1.0 - 1.5", moisture: "60%" },
        vegetative: { n: 130, p: 50, k: 180, ph: "5.5 - 6.2", ec: "1.5 - 2.0", moisture: "65%" },
        flowering: { n: 110, p: 60, k: 220, ph: "5.5 - 6.2", ec: "1.8 - 2.2", moisture: "70%" },
        fruiting: { n: 90, p: 60, k: 260, ph: "5.5 - 6.2", ec: "2.0 - 2.5", moisture: "70%" }
    },
    basil: {
        seedling: { n: 60, p: 30, k: 100, ph: "5.5 - 6.0", ec: "0.8 - 1.2", moisture: "60%" },
        vegetative: { n: 140, p: 45, k: 210, ph: "5.5 - 6.5", ec: "1.4 - 2.2", moisture: "70%" }
    }
};

const readableCropNames = {
    pechay: "Pechay (Native Leafy Cabbage)",
    kangkong: "Kangkong (Water Spinach)",
    sitaw: "Sitaw (String Beans)",
    talong: "Talong (Eggplant)",
    silinglabuyo: "Siling Labuyo (Native Chili)",
    kamatis: "Kamatis (Tomato)",
    ampalaya: "Ampalaya (Bitter Gourd)",
    kalamansi: "Kalamansi (Local Lime)",
    strawberry: "Strawberry (La Trinidad)",
    basil: "Basil (Sweet Local Cultivar)"
};

/* ==========================
   THEME TOGGLE SYSTEM
========================== */
const themeToggleBtn = document.getElementById('theme-toggle');
if (themeToggleBtn) {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggleBtn.textContent = currentTheme === 'dark' ? '☀️ Light' : '🌙 Dark';

    themeToggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeToggleBtn.textContent = theme === 'dark' ? '☀️ Light' : '🌙 Dark';
    });
}

/* ==========================
   POLYCULTURE CONTROLLER MODULE (TRIPLE ZONE MATRIX UPDATER)
========================== */
function syncZoneProfile(zoneId) {
    const cropSelect = document.getElementById(`cropSelect${zoneId}`);
    const growthStage = document.getElementById(`growthStage${zoneId}`);
    
    if (!cropSelect || !growthStage) return;

    const crop = cropSelect.value.toLowerCase().trim();
    const availableStages = Object.keys(cropDatabase[crop]);

    // Step 1: Manage available stages dynamically per zone container
    Array.from(growthStage.options).forEach(option => {
        if (availableStages.includes(option.value)) {
            option.disabled = false;
            option.style.opacity = "1";
        } else {
            option.disabled = true;
            option.style.opacity = "0.25";
            if (growthStage.value === option.value) {
                growthStage.value = availableStages[0];
            }
        }
    });

    // Step 2: Render unique target fields safely into card dashboard matrices
    const activeStage = growthStage.value;
    const data = cropDatabase[crop][activeStage];

    if (data) {
        const targetNEl = document.getElementById(`targetN${zoneId}`);
        const targetPEl = document.getElementById(`targetP${zoneId}`);
        const targetKEl = document.getElementById(`targetK${zoneId}`);
        const targetPHEl = document.getElementById(`targetPH${zoneId}`);
        const targetECEl = document.getElementById(`targetEC${zoneId}`);
        const targetMoistureEl = document.getElementById(`targetMoisture${zoneId}`);
        const recommendationBox = document.getElementById(`recommendationBox${zoneId}`);

        if (targetNEl) targetNEl.innerText = data.n + " ppm";
        if (targetPEl) targetPEl.innerText = data.p + " ppm";
        if (targetKEl) targetKEl.innerText = data.k + " ppm";
        if (targetPHEl) targetPHEl.innerText = data.ph;
        if (targetECEl) targetECEl.innerText = data.ec + " mS/cm";
        if (targetMoistureEl) targetMoistureEl.innerText = data.moisture;

        if (recommendationBox) {
            recommendationBox.innerHTML = `🎯 <b>${readableCropNames[crop]} [${activeStage.toUpperCase()}] Targets:</b> pH: ${data.ph} | EC: ${data.ec} mS/cm | Optimal Moisture: ${data.moisture}`;
        }
    }
}

// Attach distinct management event hooks
["A", "B", "C"].forEach(zone => {
    const cSel = document.getElementById(`cropSelect${zone}`);
    const gSel = document.getElementById(`growthStage${zone}`);
    if (cSel) cSel.addEventListener("change", () => { syncZoneProfile(zone); updateDashboard(); });
    if (gSel) gSel.addEventListener("change", () => { syncZoneProfile(zone); updateDashboard(); });
});

/* ==========================
   DASHBOARD TELEMETRY LOOP WITH DEFICIENCY CHECKER (NEW WORK)
========================== */
function setElementText(id, value) {
    const el = document.getElementById(id);
    if (el) el.innerText = value;
}

// Compares live numerical text vs target presets and injects red flashing alerts
function checkNutrientDeficiency(liveValue, targetElementId, liveDisplayElementId, unitString) {
    const targetElement = document.getElementById(targetElementId);
    const liveElement = document.getElementById(liveDisplayElementId);
    
    if (!targetElement || !liveElement) return;

    // Convert target text configuration into an integer (e.g. "140 ppm" -> 140)
    const targetNum = parseInt(targetElement.innerText);
    
    // Set standard readout string text
    liveElement.innerText = liveValue + " " + unitString;

    if (!isNaN(targetNum) && liveValue < targetNum) {
        // Condition matches deficiency trigger: throw CSS warning rules
        liveElement.className = "lacking-nutrient";
    } else {
        // Safe readout parameters
        liveElement.className = "";
    }
}

function updateDashboard() {
    // Environmental Infrastructure Readings
    setElementText("reservoirLevel", random(75, 98) + "%");
    setElementText("mixingLevel", random(45, 85) + "%");
    setElementText("flowRate", random(4, 8) + " L/min");
    setElementText("temperature", random(26, 31) + "°C"); 
    setElementText("humidity", random(70, 92) + "%");     
    setElementText("lightLevel", random(1200, 2800) + " lux");
    setElementText("phLevel", (Math.random() * 0.8 + 6.0).toFixed(2));
    setElementText("ecLevel", (Math.random() * 0.6 + 1.4).toFixed(2) + " mS/cm");

    // Dynamic Live Node Telemetry Readings (Ranges allow testing both normal and alert states)
    const nA = random(60, 180);  const pA = random(30, 60);  const kA = random(95, 250);
    setElementText("soilA", random(68, 74) + "%");
    checkNutrientDeficiency(nA, "targetNA", "nitrogenA", "ppm");
    checkNutrientDeficiency(pA, "targetPA", "phosphorusA", "ppm");
    checkNutrientDeficiency(kA, "targetKA", "potassiumA", "ppm");

    const nB = random(60, 180);  const pB = random(30, 60);  const kB = random(95, 250);
    setElementText("soilB", random(72, 82) + "%");
    checkNutrientDeficiency(nB, "targetNB", "nitrogenB", "ppm");
    checkNutrientDeficiency(pB, "targetPB", "phosphorusB", "ppm");
    checkNutrientDeficiency(kB, "targetKB", "potassiumB", "ppm");

    const nC = random(60, 180);  const pC = random(30, 60);  const kC = random(95, 250);
    setElementText("soilC", random(76, 84) + "%");
    checkNutrientDeficiency(nC, "targetNC", "nitrogenC", "ppm");
    checkNutrientDeficiency(pC, "targetPC", "phosphorusC", "ppm");
    checkNutrientDeficiency(kC, "targetKC", "potassiumC", "ppm");
    
    // Electrical parameters
    setElementText("batteryLevel", random(82, 100) + "%");
    setElementText("voltage", (Math.random() * 1 + 12).toFixed(1) + "V");
    setElementText("powerSource", Math.random() > 0.3 ? "Solar PV Matrix" : "Battery Storage");

    // System State Indicator evaluation rules
    const systemN = (nA + nB + nC) / 3;
    const systemK = (kA + kB + kC) / 3;
    
    const nutrientIndicator = document.getElementById("nutrientSystemIndicator");
    if (nutrientIndicator) {
        if (systemN < 120 || systemK < 150) {
            nutrientIndicator.innerText = "DOSING CORRECTION REQUIRED";
            nutrientIndicator.className = "device-status warning-status";
        } else {
            nutrientIndicator.innerText = "POLYCULTURE STABLE";
            nutrientIndicator.className = "device-status active";
        }
    }
}

/* ==========================
   ACTUATOR DIAGNOSTICS CONTROL
========================== */
function toggleDeviceState(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
        if (el.classList.contains('off')) {
            el.classList.remove('off'); el.classList.add('on'); el.innerText = 'ON';
        } else {
            el.classList.remove('on'); el.classList.add('off'); el.innerText = 'OFF';
        }
    }
}

const transferPumpBtn = document.getElementById("transferPumpBtn");
const boosterPumpBtn = document.getElementById("boosterPumpBtn");
const nutrientPumpBtn = document.getElementById("nutrientPumpBtn");
const valveBtn = document.getElementById("valveBtn");
const mixerBtn = document.getElementById("mixerBtn");
const emergencyStop = document.getElementById("emergencyStop");

if (transferPumpBtn) transferPumpBtn.addEventListener("click", () => toggleDeviceState("transferPumpStatus"));
if (boosterPumpBtn) boosterPumpBtn.addEventListener("click", () => toggleDeviceState("boosterPumpStatus"));
if (nutrientPumpBtn) nutrientPumpBtn.addEventListener("click", () => alert("Precision dosage loop injected manually."));
if (valveBtn) valveBtn.addEventListener("click", () => alert("Solenoid distribution valves toggled."));
if (mixerBtn) mixerBtn.addEventListener("click", () => alert("Tank agitator run loop completed."));

if (emergencyStop) {
    emergencyStop.addEventListener("click", () => {
        alert("EMERGENCY STOP ENGAGED");
        document.getElementById("systemState").innerText = "EMERGENCY";
        document.getElementById("systemState").className = "device-status danger"; 
        document.getElementById("nutrientSystemIndicator").innerText = "SHUTDOWN";
        document.getElementById("nutrientSystemIndicator").className = "device-status danger";
        document.getElementById("sensorArrayIndicator").innerText = "OFFLINE";
        document.getElementById("sensorArrayIndicator").className = "device-status danger";
    });
}

// System Execution Instantiation Hooks
setInterval(updateDashboard, 2000);
["A", "B", "C"].forEach(zone => syncZoneProfile(zone));
updateDashboard();

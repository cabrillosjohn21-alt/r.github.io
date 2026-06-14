function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* ==========================
   PHILIPPINE CROP DATABASE
========================== */
const cropDatabase = {
    pechay: {
        seedling: { n: 70, p: 35, k: 110, ph: "6.0", ec: "1.0", moisture: "65%" },
        vegetative: { n: 140, p: 50, k: 210, ph: "6.5", ec: "1.5", moisture: "75%" }
    },
    kangkong: {
        seedling: { n: 60, p: 30, k: 100, ph: "5.5", ec: "0.8", moisture: "75%" },
        vegetative: { n: 150, p: 45, k: 220, ph: "6.0", ec: "1.2", moisture: "85%" }
    },
    sitaw: {
        seedling: { n: 50, p: 40, k: 90, ph: "6.0", ec: "1.0", moisture: "60%" },
        vegetative: { n: 100, p: 60, k: 160, ph: "6.2", ec: "1.4", moisture: "70%" },
        flowering: { n: 90, p: 80, k: 200, ph: "6.5", ec: "1.8", moisture: "75%" }
    },
    talong: {
        seedling: { n: 100, p: 40, k: 110, ph: "5.8", ec: "1.2", moisture: "65%" },
        vegetative: { n: 190, p: 55, k: 210, ph: "6.2", ec: "2.0", moisture: "70%" },
        flowering: { n: 160, p: 65, k: 260, ph: "6.4", ec: "2.2", moisture: "75%" },
        fruiting: { n: 140, p: 70, k: 300, ph: "6.5", ec: "2.4", moisture: "80%" }
    },
    silinglabuyo: {
        seedling: { n: 90, p: 40, k: 110, ph: "5.8", ec: "1.0", moisture: "65%" },
        vegetative: { n: 170, p: 50, k: 210, ph: "6.2", ec: "1.8", moisture: "70%" },
        flowering: { n: 130, p: 65, k: 250, ph: "6.3", ec: "2.0", moisture: "75%" },
        fruiting: { n: 110, p: 70, k: 290, ph: "6.5", ec: "2.2", moisture: "75%" }
    },
    kamatis: {
        seedling: { n: 120, p: 50, k: 100, ph: "5.8", ec: "1.2", moisture: "65%" },
        vegetative: { n: 220, p: 60, k: 180, ph: "6.0", ec: "2.0", moisture: "70%" },
        flowering: { n: 180, p: 70, k: 250, ph: "6.2", ec: "2.5", moisture: "75%" },
        fruiting: { n: 160, p: 70, k: 300, ph: "6.5", ec: "2.5", moisture: "80%" }
    },
    ampalaya: {
        seedling: { n: 90, p: 50, k: 120, ph: "6.0", ec: "1.2", moisture: "65%" },
        vegetative: { n: 180, p: 60, k: 220, ph: "6.2", ec: "1.8", moisture: "70%" },
        flowering: { n: 150, p: 75, k: 260, ph: "6.5", ec: "2.2", moisture: "75%" },
        fruiting: { n: 130, p: 80, k: 310, ph: "6.6", ec: "2.4", moisture: "75%" }
    },
    kalamansi: {
        seedling: { n: 100, p: 30, k: 90, ph: "5.5", ec: "1.0", moisture: "60%" },
        vegetative: { n: 180, p: 50, k: 180, ph: "5.8", ec: "1.5", moisture: "65%" },
        flowering: { n: 150, p: 70, k: 220, ph: "6.0", ec: "2.0", moisture: "70%" },
        fruiting: { n: 120, p: 60, k: 280, ph: "6.2", ec: "2.2", moisture: "70%" }
    },
    strawberry: {
        seedling: { n: 70, p: 40, k: 90, ph: "5.5", ec: "1.0", moisture: "60%" },
        vegetative: { n: 130, p: 50, k: 180, ph: "5.6", ec: "1.5", moisture: "65%" },
        flowering: { n: 110, p: 60, k: 220, ph: "5.8", ec: "1.8", moisture: "70%" },
        fruiting: { n: 90, p: 60, k: 260, ph: "6.0", ec: "2.0", moisture: "70%" }
    },
    basil: {
        seedling: { n: 60, p: 30, k: 100, ph: "5.5", ec: "0.8", moisture: "60%" },
        vegetative: { n: 140, p: 45, k: 210, ph: "6.0", ec: "1.4", moisture: "70%" }
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
   POLYCULTURE CONTROLLER MODULE
========================== */
function syncZoneProfile(zoneId) {
    const cropSelect = document.getElementById(`cropSelect${zoneId}`);
    const growthStage = document.getElementById(`growthStage${zoneId}`);
    
    if (!cropSelect || !growthStage) return;

    const crop = cropSelect.value.toLowerCase().trim();
    const availableStages = Object.keys(cropDatabase[crop]);

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

    const activeStage = growthStage.value;
    const data = cropDatabase[crop][activeStage];

    if (data) {
        setElementText(`targetN${zoneId}`, data.n + " ppm");
        setElementText(`targetP${zoneId}`, data.p + " ppm");
        setElementText(`targetK${zoneId}`, data.k + " ppm");
        setElementText(`targetPH${zoneId}`, data.ph);
        setElementText(`targetEC${zoneId}`, data.ec + " mS/cm");
        setElementText(`targetMoisture${zoneId}`, data.moisture);

        const recommendationBox = document.getElementById(`recommendationBox${zoneId}`);
        if (recommendationBox) {
            recommendationBox.innerHTML = `🎯 <b>${readableCropNames[crop]} [${activeStage.toUpperCase()}] Active Targets:</b> NPK: ${data.n}-${data.p}-${data.k} | pH: ${data.ph} | EC: ${data.ec} mS/cm`;
        }
    }
}

["A", "B", "C"].forEach(zone => {
    const cSel = document.getElementById(`cropSelect${zone}`);
    const gSel = document.getElementById(`growthStage${zone}`);
    if (cSel) cSel.addEventListener("change", () => { syncZoneProfile(zone); updateDashboard(); });
    if (gSel) gSel.addEventListener("change", () => { syncZoneProfile(zone); updateDashboard(); });
});

/* ==========================
   SIDE-BY-SIDE MATRIX DEFICIENCY ENGINE
========================== */
function setElementText(id, value) {
    const el = document.getElementById(id);
    if (el) el.innerText = value;
}

function checkNutrientDeficiency(liveValue, targetElementId, liveDisplayElementId, unitString, isFloat = false) {
    const targetElement = document.getElementById(targetElementId);
    const liveElement = document.getElementById(liveDisplayElementId);
    
    if (!targetElement || !liveElement) return;

    const targetNum = isFloat ? parseFloat(targetElement.innerText) : parseInt(targetElement.innerText);
    const formattedUnit = unitString ? " " + unitString : "";
    
    liveElement.innerText = liveValue + formattedUnit;

    if (!isNaN(targetNum) && liveValue < targetNum) {
        liveElement.className = "lacking-nutrient";
    } else {
        liveElement.className = "";
    }
}

function updateDashboard() {
    // Environmental Readouts
    setElementText("reservoirLevel", random(75, 98) + "%");
    setElementText("mixingLevel", random(45, 85) + "%");
    setElementText("flowRate", random(4, 8) + " L/min");
    setElementText("temperature", random(26, 31) + "°C"); 
    setElementText("humidity", random(70, 92) + "%");     
    setElementText("lightLevel", random(1200, 2800) + " lux");
    setElementText("phLevel", (Math.random() * 0.8 + 6.0).toFixed(2));
    setElementText("ecLevel", (Math.random() * 0.6 + 1.4).toFixed(2) + " mS/cm");

    // --- SOIL ZONE A COMPONENT TELEMETRY ---
    const nA = random(60, 180);  const pA = random(30, 60);  const kA = random(95, 250);
    const phA = parseFloat((Math.random() * 1.2 + 5.5).toFixed(1));
    const ecA = parseFloat((Math.random() * 1.0 + 0.8).toFixed(1));
    const moistA = random(55, 85);

    checkNutrientDeficiency(nA, "targetNA", "nitrogenA", "ppm");
    checkNutrientDeficiency(pA, "targetPA", "phosphorusA", "ppm");
    checkNutrientDeficiency(kA, "targetKA", "potassiumA", "ppm");
    checkNutrientDeficiency(phA, "targetPHA", "soilPHA", "", true);
    checkNutrientDeficiency(ecA, "targetECA", "soilECA", "mS/cm", true);
    checkNutrientDeficiency(moistA, "targetMoistureA", "soilA", "%");

    // --- SOIL ZONE B COMPONENT TELEMETRY ---
    const nB = random(60, 180);  const pB = random(30, 60);  const kB = random(95, 250);
    const phB = parseFloat((Math.random() * 1.2 + 5.5).toFixed(1));
    const ecB = parseFloat((Math.random() * 1.0 + 0.8).toFixed(1));
    const moistB = random(55, 85);

    checkNutrientDeficiency(nB, "targetNB", "nitrogenB", "ppm");
    checkNutrientDeficiency(pB, "targetPB", "phosphorusB", "ppm");
    checkNutrientDeficiency(kB, "targetKB", "potassiumB", "ppm");
    checkNutrientDeficiency(phB, "targetPHB", "soilPHB", "", true);
    checkNutrientDeficiency(ecB, "targetECB", "soilECB", "mS/cm", true);
    checkNutrientDeficiency(moistB, "targetMoistureB", "soilB", "%");

    // --- SOIL ZONE C COMPONENT TELEMETRY ---
    const nC = random(60, 180);  const pC = random(30, 60);  const kC = random(95, 250);
    const phC = parseFloat((Math.random() * 1.2 + 5.5).toFixed(1));
    const ecC = parseFloat((Math.random() * 1.0 + 0.8).toFixed(1));
    const moistC = random(55, 85);

    checkNutrientDeficiency(nC, "targetNC", "nitrogenC", "ppm");
    checkNutrientDeficiency(pC, "targetPC", "phosphorusC", "ppm");
    checkNutrientDeficiency(kC, "targetKC", "potassiumC", "ppm");
    checkNutrientDeficiency(phC, "targetPHC", "soilPHC", "", true);
    checkNutrientDeficiency(ecC, "targetECC", "soilECC", "mS/cm", true);
    checkNutrientDeficiency(moistC, "targetMoistureC", "soilC", "%");
    
    // Infrastructure power
    setElementText("batteryLevel", random(82, 100) + "%");
    setElementText("voltage", (Math.random() * 1 + 12).toFixed(1) + "V");
    setElementText("powerSource", Math.random() > 0.3 ? "Solar PV Matrix" : "Battery Storage");

    // Indicator logic
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

// Initialization hooks
setInterval(updateDashboard, 2000);
["A", "B", "C"].forEach(zone => syncZoneProfile(zone));
updateDashboard();

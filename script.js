function random(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;
}

/* ==========================
   PHILIPPINE CROP DATABASE (10 Common Local Plants)
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

/* ==========================
   THEME TOGGLE SYSTEM
========================== */
const themeToggleBtn = document.getElementById('theme-toggle');
if (themeToggleBtn) {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateToggleText(currentTheme);

    themeToggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        theme = (theme === 'dark') ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateToggleText(theme);
    });
}

function updateToggleText(theme) {
    if (themeToggleBtn) {
        themeToggleBtn.textContent = theme === 'dark' ? '☀️ Light' : '🌙 Dark';
    }
}

/* ==========================
   CROP PRESET LOGIC & STAGE SYNC
========================== */
function adjustAvailableStages() {
    const cropSelect = document.getElementById("cropSelect");
    const growthStage = document.getElementById("growthStage");
    
    if (!cropSelect || !growthStage || !cropSelect.value) return;
    
    const crop = cropSelect.value.toLowerCase().trim();
    if (!cropDatabase[crop]) return;
    
    const availableStages = Object.keys(cropDatabase[crop]);
    
    Array.from(growthStage.options).forEach(option => {
        const optionVal = option.value.toLowerCase().trim();
        if (availableStages.includes(optionVal)) {
            option.disabled = false;
            option.style.opacity = "1";
        } else {
            option.disabled = true;
            option.style.opacity = "0.3"; 
            
            if (growthStage.value.toLowerCase().trim() === optionVal) {
                growthStage.value = availableStages[0]; 
            }
        }
    });
}

function updateCropPreset() {
    adjustAvailableStages();
    
    const cropSelect = document.getElementById("cropSelect");
    const growthStage = document.getElementById("growthStage");
    
    if (!cropSelect || !growthStage) return;

    const crop = cropSelect.value.toLowerCase().trim();
    const stage = growthStage.value.toLowerCase().trim();

    const targetN = document.getElementById("targetN");
    const targetP = document.getElementById("targetP");
    const targetK = document.getElementById("targetK");
    const targetPH = document.getElementById("targetPH");
    const targetEC = document.getElementById("targetEC");
    const targetMoisture = document.getElementById("targetMoisture");
    const recommendationBox = document.getElementById("recommendationBox");

    const data = cropDatabase[crop][stage];

    if (!data) {
        const targets = [targetN, targetP, targetK, targetPH, targetEC, targetMoisture];
        targets.forEach(el => { if (el) el.innerText = "N/A"; });
        return;
    }

    if (targetN) targetN.innerText = data.n + " ppm";
    if (targetP) targetP.innerText = data.p + " ppm";
    if (targetK) targetK.innerText = data.k + " ppm";
    if (targetPH) targetPH.innerText = data.ph;
    if (targetEC) targetEC.innerText = data.ec + " mS/cm";
    if (targetMoisture) targetMoisture.innerText = data.moisture;

    if (recommendationBox) {
        const readableCropNames = {
            pechay: "Pechay (Native Leafy Cabbage)",
            kangkong: "Kangkong (Water Spinach)",
            sitaw: "Sitaw (String Beans)",
            talong: "Talong (Eggplant)",
            silinglabuyo: "Siling Labuyo (Native Chili)",
            kamatis: "Kamatis (Tomato)",
            ampalaya: "Ampalaya (Bitter Gourd)",
            kalamansi: "Kalamansi (Local Lime)",
            strawberry: "Strawberry (La Trinidad Hybrid)",
            basil: "Basil (Sweet Local Cultivar)"
        };

        recommendationBox.innerHTML = `
            Recommended Profile for <b>${readableCropNames[crop] || crop.toUpperCase()}</b> (${stage})<br><br>
            <strong>Target Macronutrients (NPK):</strong><br>
            • Nitrogen (N): ${data.n} ppm<br>
            • Phosphorus (P): ${data.p} ppm<br>
            • Potassium (K): ${data.k} ppm<br><br>
            <strong>Target Environment Criteria:</strong><br>
            • Optimal pH: ${data.ph} | EC Range: ${data.ec} mS/cm | Ideal Moisture: ${data.moisture}
        `;
    }
}

const cropSelectEl = document.getElementById("cropSelect");
const growthStageEl = document.getElementById("growthStage");

if (cropSelectEl) cropSelectEl.addEventListener("change", updateCropPreset);
if (growthStageEl) growthStageEl.addEventListener("change", updateCropPreset);

/* ==========================
   DASHBOARD LIVE DATA & INDICATORS
========================== */
function setElementText(id, value) {
    const el = document.getElementById(id);
    if (el) el.innerText = value;
}

function updateDashboard() {
    // Shared Environment Data
    setElementText("reservoirLevel", random(50, 100) + "%");
    setElementText("mixingLevel", random(30, 90) + "%");
    setElementText("flowRate", random(2, 10) + " L/min");
    setElementText("temperature", random(25, 33) + "°C"); 
    setElementText("humidity", random(60, 95) + "%");     
    setElementText("lightLevel", random(500, 3000) + " lux");
    setElementText("phLevel", (Math.random() * 1.5 + 5.5).toFixed(2));
    setElementText("ecLevel", (Math.random() * 2 + 1).toFixed(2) + " mS/cm");

    // NODE 01: SOIL ZONE A TELEMETRY GENERATION
    const nA = random(120, 180);
    const pA = random(40, 70);
    const kA = random(180, 240);
    setElementText("soilA", random(65, 80) + "%");
    setElementText("nitrogenA", nA + " ppm");
    setElementText("phosphorusA", pA + " ppm");
    setElementText("potassiumA", kA + " ppm");

    // NODE 02: SOIL ZONE B TELEMETRY GENERATION
    const nB = random(80, 130);
    const pB = random(30, 55);
    const kB = random(110, 170);
    setElementText("soilB", random(45, 60) + "%");
    setElementText("nitrogenB", nB + " ppm");
    setElementText("phosphorusB", pB + " ppm");
    setElementText("potassiumB", kB + " ppm");

    // NODE 03: SOIL ZONE C TELEMETRY GENERATION
    const nC = random(150, 220);
    const pC = random(60, 90);
    const kC = random(220, 310);
    setElementText("soilC", random(70, 90) + "%");
    setElementText("nitrogenC", nC + " ppm");
    setElementText("phosphorusC", pC + " ppm");
    setElementText("potassiumC", kC + " ppm");
    
    // System Electrical Parameters
    setElementText("batteryLevel", random(40, 100) + "%");
    setElementText("voltage", random(11, 14) + "V");
    setElementText("current", random(1, 10) + "A");
    setElementText("powerDraw", random(50, 500) + "W");
    setElementText("powerSource", Math.random() > 0.5 ? "Solar" : "Battery");

    // Evaluate global nutrient system integrity using an average sample check
    const avgN = (nA + nB + nC) / 3;
    const avgK = (kA + kB + kC) / 3;
    updateRunningIndicators(avgN, avgK);
}

function updateRunningIndicators(avgN, avgK) {
    const nutrientIndicator = document.getElementById("nutrientSystemIndicator");
    const sensorIndicator = document.getElementById("sensorArrayIndicator");
    const systemState = document.getElementById("systemState");

    if (systemState && systemState.innerText === "EMERGENCY") return;

    if (nutrientIndicator) {
        if (avgN < 110 || avgK < 140) {
            nutrientIndicator.innerText = "DOSING REQUIRED";
            nutrientIndicator.className = "device-status warning-status";
        } else {
            nutrientIndicator.innerText = "BALANCED";
            nutrientIndicator.className = "device-status active";
        }
    }

    if (sensorIndicator) {
        if (Math.random() > 0.97) {
            sensorIndicator.innerText = "LAG/POLLING";
            sensorIndicator.className = "device-status warning-status";
        } else {
            sensorIndicator.innerText = "SAMPLING LIVE";
            sensorIndicator.className = "device-status active";
        }
    }
}

/* ==========================
   HARDWARE ACTUATOR OVERRIDES
========================== */
function toggleDeviceState(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
        if (el.classList.contains('off')) {
            el.classList.remove('off');
            el.classList.add('on');
            el.innerText = 'ON';
        } else {
            el.classList.remove('on');
            el.classList.add('off');
            el.innerText = 'OFF';
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
if (nutrientPumpBtn) nutrientPumpBtn.addEventListener("click", () => alert("Nutrient injection sequence triggered manually."));
if (valveBtn) valveBtn.addEventListener("click", () => alert("Distribution manifold valves rotated."));
if (mixerBtn) mixerBtn.addEventListener("click", () => alert("Agitator mixing cycle running."));

if (emergencyStop) {
    emergencyStop.addEventListener("click", () => {
        alert("EMERGENCY STOP ACTIVATED");
        
        const stateLabel = document.getElementById("systemState");
        if (stateLabel) {
            stateLabel.innerText = "EMERGENCY";
            stateLabel.className = "device-status danger"; 
        }

        const nutrientIndicator = document.getElementById("nutrientSystemIndicator");
        const sensorIndicator = document.getElementById("sensorArrayIndicator");
        if (nutrientIndicator) { nutrientIndicator.innerText = "SHUTDOWN"; nutrientIndicator.className = "device-status danger"; }
        if (sensorIndicator) { sensorIndicator.innerText = "OFFLINE"; sensorIndicator.className = "device-status danger"; }
        
        const transferPumpStatus = document.getElementById("transferPumpStatus");
        const boosterPumpStatus = document.getElementById("boosterPumpStatus");
        
        if (transferPumpStatus) { transferPumpStatus.className = "device-status off"; transferPumpStatus.innerText = "OFF"; }
        if (boosterPumpStatus) { boosterPumpStatus.className = "device-status off"; boosterPumpStatus.innerText = "OFF"; }
    });
}

// Initial System Ignition Execution
setInterval(updateDashboard, 2000);
updateDashboard();
updateCropPreset();

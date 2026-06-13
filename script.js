function random(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;
}

/* ==========================
   CROP DATABASE
========================== */
const cropDatabase = {
    tomato: {
        seedling: { n: 120, p: 50, k: 100, ph: "5.8 - 6.2", ec: "1.2 - 1.8", moisture: "65%" },
        vegetative: { n: 220, p: 60, k: 180, ph: "5.8 - 6.5", ec: "2.0 - 3.0", moisture: "70%" },
        flowering: { n: 180, p: 70, k: 250, ph: "5.8 - 6.5", ec: "2.5 - 3.2", moisture: "75%" },
        fruiting: { n: 160, p: 70, k: 300, ph: "5.8 - 6.5", ec: "2.5 - 3.5", moisture: "80%" }
    },
    lettuce: {
        seedling: { n: 80, p: 40, k: 120, ph: "5.5 - 6.5", ec: "0.8 - 1.2", moisture: "70%" },
        vegetative: { n: 150, p: 50, k: 200, ph: "5.5 - 6.5", ec: "1.2 - 1.8", moisture: "75%" }
    },
    spinach: {
        vegetative: { n: 180, p: 50, k: 220, ph: "6.0 - 7.0", ec: "1.8 - 2.3", moisture: "75%" }
    },
    eggplant: {
        vegetative: { n: 180, p: 60, k: 200, ph: "5.8 - 6.5", ec: "2.0 - 2.5", moisture: "70%" },
        fruiting: { n: 170, p: 70, k: 280, ph: "5.8 - 6.5", ec: "2.5 - 3.2", moisture: "75%" }
    },
    cucumber: {
        vegetative: { n: 180, p: 50, k: 220, ph: "5.5 - 6.5", ec: "1.8 - 2.5", moisture: "75%" },
        fruiting: { n: 170, p: 60, k: 260, ph: "5.5 - 6.5", ec: "2.0 - 3.0", moisture: "80%" }
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
   CROP PRESET LOGIC
========================== */
function updateCropPreset() {
    const cropSelect = document.getElementById("cropSelect");
    const growthStage = document.getElementById("growthStage");
    
    if (!cropSelect || !growthStage) return;

    const crop = cropSelect.value;
    const stage = growthStage.value;

    const targetN = document.getElementById("targetN");
    const targetP = document.getElementById("targetP");
    const targetK = document.getElementById("targetK");
    const targetPH = document.getElementById("targetPH");
    const targetEC = document.getElementById("targetEC");
    const targetMoisture = document.getElementById("targetMoisture");
    const recommendationBox = document.getElementById("recommendationBox");

    if (!cropDatabase[crop] || !cropDatabase[crop][stage]) {
        if (targetN) targetN.innerText = "N/A";
        if (targetP) targetP.innerText = "N/A";
        if (targetK) targetK.innerText = "N/A";
        if (targetPH) targetPH.innerText = "N/A";
        if (targetEC) targetEC.innerText = "N/A";
        if (targetMoisture) targetMoisture.innerText = "N/A";
        if (recommendationBox) recommendationBox.innerHTML = "No configuration data found for this stage.";
        return;
    }

    const data = cropDatabase[crop][stage];

    if (targetN) targetN.innerText = data.n + " ppm";
    if (targetP) targetP.innerText = data.p + " ppm";
    if (targetK) targetK.innerText = data.k + " ppm";
    if (targetPH) targetPH.innerText = data.ph;
    if (targetEC) targetEC.innerText = data.ec;
    if (targetMoisture) targetMoisture.innerText = data.moisture;

    if (recommendationBox) {
        recommendationBox.innerHTML = `
            Recommended for <b>${crop.toUpperCase()}</b> (${stage})<br><br>
            Nitrogen: ${data.n} ppm<br>
            Phosphorus: ${data.p} ppm<br>
            Potassium: ${data.k} ppm<br>
            pH Range: ${data.ph}<br>
            EC Range: ${data.ec}<br>
            Moisture Setpoint: ${data.moisture}
        `;
    }
}

const cropSelectEl = document.getElementById("cropSelect");
const growthStageEl = document.getElementById("growthStage");
if (cropSelectEl) cropSelectEl.addEventListener("change", updateCropPreset);
if (growthStageEl) growthStageEl.addEventListener("change", updateCropPreset);

/* ==========================
   DASHBOARD LIVE DATA
========================== */
function setElementText(id, value) {
    const el = document.getElementById(id);
    if (el) el.innerText = value;
}

function updateDashboard() {
    setElementText("reservoirLevel", random(50, 100) + "%");
    setElementText("mixingLevel", random(30, 90) + "%");
    setElementText("flowRate", random(2, 10) + " L/min");
    setElementText("temperature", random(25, 35) + "°C");
    setElementText("humidity", random(50, 90) + "%");
    setElementText("lightLevel", random(500, 3000) + " lux");
    setElementText("soilA", random(40, 90) + "%");
    setElementText("soilB", random(40, 90) + "%");
    setElementText("soilC", random(40, 90) + "%");
    setElementText("nitrogen", random(100, 250) + " ppm");
    setElementText("phosphorus", random(50, 150) + " ppm");
    setElementText("potassium", random(100, 300) + " ppm");
    setElementText("phLevel", (Math.random() * 2 + 5.5).toFixed(2));
    setElementText("ecLevel", (Math.random() * 2 + 1).toFixed(2) + " mS/cm");
    setElementText("batteryLevel", random(40, 100) + "%");
    setElementText("voltage", random(11, 14) + "V");
    setElementText("current", random(1, 10) + "A");
    setElementText("powerDraw", random(50, 500) + "W");
    setElementText("powerSource", Math.random() > 0.5 ? "Solar" : "Battery");
}

/* ==========================
   HARDWARE MANIPULATION OVERRIDES
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

// Event Bindings with structural safeguards
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
        
        const transferPumpStatus = document.getElementById("transferPumpStatus");
        const boosterPumpStatus = document.getElementById("boosterPumpStatus");
        
        if (transferPumpStatus) {
            transferPumpStatus.className = "device-status off";
            transferPumpStatus.innerText = "OFF";
        }
        if (boosterPumpStatus) {
            boosterPumpStatus.className = "device-status off";
            boosterPumpStatus.innerText = "OFF";
        }
    });
}

// Run Initial Setup Loops
setInterval(updateDashboard, 2000);
updateDashboard();
updateCropPreset();

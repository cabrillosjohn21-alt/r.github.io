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
    pechay: "Pechay (Native Leafy Cabbage)", kangkong: "Kangkong (Water Spinach)",
    sitaw: "Sitaw (String Beans)", talong: "Talong (Eggplant)",
    silinglabuyo: "Siling Labuyo (Chili)", kamatis: "Kamatis (Tomato)",
    ampalaya: "Ampalaya (Bitter Gourd)", kalamansi: "Kalamansi (Philippine Lime)",
    strawberry: "Strawberry (Benguet Variety)", basil: "Basil (Local Cultivar)"
};

/* ==========================================================================
   DYNAMIC PLUGGABLE TRACKER ARRAY
   ========================================================================== */
let activeZones = [
    { id: "A", name: "SOIL ZONE A (Precise Node 01)", defaultCrop: "talong", defaultStage: "vegetative" },
    { id: "B", name: "SOIL ZONE B (Precise Node 02)", defaultCrop: "pechay", defaultStage: "vegetative" },
    { id: "C", name: "SOIL ZONE C (Precise Node 03)", defaultCrop: "kamatis", defaultStage: "fruiting" }
];

const container = document.getElementById("dynamic-zones-container");

function renderZonesUI() {
    if (!container) return;
    container.innerHTML = "";

    activeZones.forEach(zone => {
        const block = document.createElement("div");
        block.className = `zone-block`;
        block.id = `zoneBlock-${zone.id}`;

        block.innerHTML = `
            <div class="zone-header">
                <h3>📍 ${zone.name}</h3>
                <div class="zone-selectors">
                    <select id="cropSelect${zone.id}" onchange="syncZoneProfile('${zone.id}')">
                        <option value="pechay" ${zone.defaultCrop==='pechay'?'selected':''}>Pechay (Native Cabbage)</option>
                        <option value="kangkong" ${zone.defaultCrop==='kangkong'?'selected':''}>Kangkong (Water Spinach)</option>
                        <option value="sitaw" ${zone.defaultCrop==='sitaw'?'selected':''}>Sitaw (String Beans)</option>
                        <option value="talong" ${zone.defaultCrop==='talong'?'selected':''}>Talong (Eggplant)</option>
                        <option value="silinglabuyo" ${zone.defaultCrop==='silinglabuyo'?'selected':''}>Siling Labuyo (Chili)</option>
                        <option value="kamatis" ${zone.defaultCrop==='kamatis'?'selected':''}>Kamatis (Tomato)</option>
                        <option value="ampalaya" ${zone.defaultCrop==='ampalaya'?'selected':''}>Ampalaya (Bitter Gourd)</option>
                        <option value="kalamansi" ${zone.defaultCrop==='kalamansi'?'selected':''}>Kalamansi (Philippine Lime)</option>
                        <option value="strawberry" ${zone.defaultCrop==='strawberry'?'selected':''}>Strawberry (Benguet)</option>
                        <option value="basil" ${zone.defaultCrop==='basil'?'selected':''}>Basil (Local Cultivar)</option>
                    </select>
                    <select id="growthStage${zone.id}" onchange="syncZoneProfile('${zone.id}')">
                        <option value="seedling" ${zone.defaultStage==='seedling'?'selected':''}>Seedling</option>
                        <option value="vegetative" ${zone.defaultStage==='vegetative'?'selected':''}>Vegetative</option>
                        <option value="flowering" ${zone.defaultStage==='flowering'?'selected':''}>Flowering</option>
                        <option value="fruiting" ${zone.defaultStage==='fruiting'?'selected':''}>Fruiting</option>
                    </select>
                    <button class="delete-zone-btn" onclick="deleteZone('${zone.id}')">🗑️ Delete</button>
                </div>
            </div>

            <div class="card-grid matrix-grid">
                <div class="card matrix-card">
                    <h3>Nitrogen (N)</h3>
                    <div class="comparison-values">
                        <div><span class="val-label">LIVE</span><p id="nitrogen${zone.id}">--</p></div>
                        <div class="divider-line"></div>
                        <div><span class="val-label">TARGET</span><p id="targetN${zone.id}" class="target-val">--</p></div>
                    </div>
                </div>
                <div class="card matrix-card">
                    <h3>Phosphorus (P)</h3>
                    <div class="comparison-values">
                        <div><span class="val-label">LIVE</span><p id="phosphorus${zone.id}">--</p></div>
                        <div class="divider-line"></div>
                        <div><span class="val-label">TARGET</span><p id="targetP${zone.id}" class="target-val">--</p></div>
                    </div>
                </div>
                <div class="card matrix-card">
                    <h3>Potassium (K)</h3>
                    <div class="comparison-values">
                        <div><span class="val-label">LIVE</span><p id="potassium${zone.id}">--</p></div>
                        <div class="divider-line"></div>
                        <div><span class="val-label">TARGET</span><p id="targetK${zone.id}" class="target-val">--</p></div>
                    </div>
                </div>
                <div class="card matrix-card">
                    <h3>Soil pH</h3>
                    <div class="comparison-values">
                        <div><span class="val-label">LIVE</span><p id="soilPH${zone.id}">--</p></div>
                        <div class="divider-line"></div>
                        <div><span class="val-label">TARGET</span><p id="targetPH${zone.id}" class="target-val">--</p></div>
                    </div>
                </div>
                <div class="card matrix-card">
                    <h3>Soil EC</h3>
                    <div class="comparison-values">
                        <div><span class="val-label">LIVE</span><p id="soilEC${zone.id}">--</p></div>
                        <div class="divider-line"></div>
                        <div><span class="val-label">TARGET</span><p id="targetEC${zone.id}" class="target-val">--</p></div>
                    </div>
                </div>
                <div class="card matrix-card">
                    <h3>Moisture</h3>
                    <div class="comparison-values">
                        <div><span class="val-label">LIVE</span><p id="soil${zone.id}">--</p></div>
                        <div class="divider-line"></div>
                        <div><span class="val-label">TARGET</span><p id="targetMoisture${zone.id}" class="target-val">--</p></div>
                    </div>
                </div>
            </div>
            
            <div id="recommendationBox${zone.id}" class="alert-box">Synchronizing...</div>
        `;
        container.appendChild(block);
        syncZoneProfile(zone.id);
    });
}

/* ==========================
   ADD & REMOVE ENGINE HANDLERS
========================== */
document.getElementById("addZoneBtn").addEventListener("click", () => {
    const inputField = document.getElementById("newZoneName");
    const nameText = inputField.value.trim();
    
    if (nameText === "") {
        alert("Please enter a valid label name for the new tracking zone.");
        return;
    }

    const uniqueId = "Z" + Date.now(); // Generate clean tracking timestamp hash id
    activeZones.push({
        id: uniqueId,
        name: nameText.toUpperCase(),
        defaultCrop: "pechay",
        defaultStage: "seedling"
    });

    inputField.value = "";
    renderZonesUI();
    updateDashboard();
});

function deleteZone(zoneId) {
    if(confirm("Are you sure you want to remove this monitoring zone setup?")) {
        activeZones = activeZones.filter(z => z.id !== zoneId);
        renderZonesUI();
        updateDashboard();
    }
}

/* ==========================
   DYNAMIC CALIBRATION PROFILE SYNC
========================== */
function syncZoneProfile(zoneId) {
    const cropSelect = document.getElementById(`cropSelect${zoneId}`);
    const growthStage = document.getElementById(`growthStage${zoneId}`);
    
    if (!cropSelect || !growthStage) return;

    const crop = cropSelect.value;
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
            recommendationBox.innerHTML = `🎯 <b>${readableCropNames[crop]} [${activeStage.toUpperCase()}] Targets:</b> NPK: ${data.n}-${data.p}-${data.k} | pH: ${data.ph} | EC: ${data.ec} mS/cm`;
        }
        
        // Save current user selection back into global array persistence
        const zoneObj = activeZones.find(z => z.id === zoneId);
        if (zoneObj) {
            zoneObj.defaultCrop = crop;
            zoneObj.defaultStage = activeStage;
        }
    }
}

/* ==========================
   DIAGNOSTIC TELEMETRY INTERRUPT
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
    // Environmental Infrastructure Telemetry
    setElementText("reservoirLevel", random(75, 98) + "%");
    setElementText("mixingLevel", random(45, 85) + "%");
    setElementText("flowRate", random(4, 8) + " L/min");
    setElementText("temperature", random(26, 31) + "°C"); 
    setElementText("humidity", random(70, 92) + "%");     
    setElementText("lightLevel", random(1200, 2800) + " lux");
    setElementText("phLevel", (Math.random() * 0.8 + 6.0).toFixed(2));
    setElementText("ecLevel", (Math.random() * 0.6 + 1.4).toFixed(2) + " mS/cm");
    setElementText("batteryLevel", random(82, 100) + "%");
    setElementText("voltage", (Math.random() * 1 + 12).toFixed(1) + "V");
    setElementText("powerSource", Math.random() > 0.3 ? "Solar PV Matrix" : "Battery Storage");

    // Dynamic Engine Multi-Zone Checker Loop
    activeZones.forEach(zone => {
        const nLive = random(60, 180);  
        const pLive = random(30, 60);  
        const kLive = random(95, 250);
        const phLive = parseFloat((Math.random() * 1.2 + 5.5).toFixed(1));
        const ecLive = parseFloat((Math.random() * 1.0 + 0.8).toFixed(1));
        const moistLive = random(55, 85);

        checkNutrientDeficiency(nLive, `targetN${zone.id}`, `nitrogen${zone.id}`, "ppm");
        checkNutrientDeficiency(pLive, `targetP${zone.id}`, `phosphorus${zone.id}`, "ppm");
        checkNutrientDeficiency(kLive, `targetK${zone.id}`, `potassium${zone.id}`, "ppm");
        checkNutrientDeficiency(phLive, `targetPH${zone.id}`, `soilPH${zone.id}`, "", true);
        checkNutrientDeficiency(ecLive, `targetEC${zone.id}`, `soilEC${zone.id}`, "mS/cm", true);
        checkNutrientDeficiency(moistLive, `targetMoisture${zone.id}`, `soil${zone.id}`, "%");
    });
}

/* ==========================
   THEME TOGGLE SETUP
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
   ACTUATOR CONTROLLER HANDLERS
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

if (document.getElementById("transferPumpBtn")) document.getElementById("transferPumpBtn").addEventListener("click", () => toggleDeviceState("transferPumpStatus"));
if (document.getElementById("boosterPumpBtn")) document.getElementById("boosterPumpBtn").addEventListener("click", () => toggleDeviceState("boosterPumpStatus"));
if (document.getElementById("nutrientPumpBtn")) document.getElementById("nutrientPumpBtn").addEventListener("click", () => alert("Precision dosage loop injected manually."));
if (document.getElementById("valveBtn")) document.getElementById("valveBtn").addEventListener("click", () => alert("Solenoid distribution valves toggled."));
if (document.getElementById("mixerBtn")) document.getElementById("mixerBtn").addEventListener("click", () => alert("Tank agitator run loop completed."));

if (document.getElementById("emergencyStop")) {
    document.getElementById("emergencyStop").addEventListener("click", () => {
        alert("EMERGENCY STOP ENGAGED");
        document.getElementById("systemState").innerText = "EMERGENCY";
        document.getElementById("systemState").className = "device-status danger"; 
        document.getElementById("nutrientSystemIndicator").innerText = "SHUTDOWN";
        document.getElementById("nutrientSystemIndicator").className = "device-status danger";
        document.getElementById("sensorArrayIndicator").innerText = "OFFLINE";
        document.getElementById("sensorArrayIndicator").className = "device-status danger";
    });
}

// System Init Engine Hooks
renderZonesUI();
setInterval(updateDashboard, 2000);
updateDashboard();

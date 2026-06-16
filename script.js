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
    pechay: "Pechay", kangkong: "Kangkong", sitaw: "Sitaw", talong: "Talong",
    silinglabuyo: "Siling Labuyo", kamatis: "Kamatis", ampalaya: "Ampalaya",
    kalamansi: "Kalamansi", strawberry: "Strawberry", basil: "Basil"
};

/* ==========================================================================
   DYNAMIC TRACKER STATE CONTAINER
   ========================================================================== */
let activeZones = [
    { id: "A", name: "SOIL ZONE A (Precise Node 01)", defaultCrop: "talong", defaultStage: "vegetative" },
    { id: "B", name: "SOIL ZONE B (Precise Node 02)", defaultCrop: "pechay", defaultStage: "vegetative" },
    { id: "C", name: "SOIL ZONE C (Precise Node 03)", defaultCrop: "kamatis", defaultStage: "fruiting" }
];

// Structural hardware switch hooks
let globalPumpsActive = { transfer: false, booster: false, mixer: false };

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
                        <option value="pechay" ${zone.defaultCrop==='pechay'?'selected':''}>Pechay</option>
                        <option value="kangkong" ${zone.defaultCrop==='kangkong'?'selected':''}>Kangkong</option>
                        <option value="sitaw" ${zone.defaultCrop==='sitaw'?'selected':''}>Sitaw</option>
                        <option value="talong" ${zone.defaultCrop==='talong'?'selected':''}>Talong</option>
                        <option value="silinglabuyo" ${zone.defaultCrop==='silinglabuyo'?'selected':''}>Siling Labuyo</option>
                        <option value="kamatis" ${zone.defaultCrop==='kamatis'?'selected':''}>Kamatis</option>
                        <option value="ampalaya" ${zone.defaultCrop==='ampalaya'?'selected':''}>Ampalaya</option>
                        <option value="kalamansi" ${zone.defaultCrop==='kalamansi'?'selected':''}>Kalamansi</option>
                        <option value="strawberry" ${zone.defaultCrop==='strawberry'?'selected':''}>Strawberry</option>
                        <option value="basil" ${zone.defaultCrop==='basil'?'selected':''}>Basil</option>
                    </select>
                    <select id="growthStage${zone.id}" onchange="syncZoneProfile('${zone.id}')">
                        <option value="seedling" ${zone.defaultStage==='seedling'?'selected':''}>Seedling</option>
                        <option value="vegetative" ${zone.defaultStage==='vegetative'?'selected':''}>Vegetative</option>
                        <option value="flowering" ${zone.defaultStage==='flowering'?'selected':''}>Flowering</option>
                        <option value="fruiting" ${zone.defaultStage==='fruiting'?'selected':''}>Fruiting</option>
                    </select>
                    <button class="delete-zone-btn" onclick="deleteZone('${zone.id}')">🗑️ Remove</button>
                </div>
            </div>

            <div class="card-grid matrix-grid">
                <div class="card matrix-card"><h3>Nitrogen</h3><div class="comparison-values"><div><span class="val-label">LIVE</span><p id="nitrogen${zone.id}">--</p></div><div class="divider-line"></div><div><span class="val-label">TARGET</span><p id="targetN${zone.id}" class="target-val">--</p></div></div></div>
                <div class="card matrix-card"><h3>Phosphorus</h3><div class="comparison-values"><div><span class="val-label">LIVE</span><p id="phosphorus${zone.id}">--</p></div><div class="divider-line"></div><div><span class="val-label">TARGET</span><p id="targetP${zone.id}" class="target-val">--</p></div></div></div>
                <div class="card matrix-card"><h3>Potassium</h3><div class="comparison-values"><div><span class="val-label">LIVE</span><p id="potassium${zone.id}">--</p></div><div class="divider-line"></div><div><span class="val-label">TARGET</span><p id="targetK${zone.id}" class="target-val">--</p></div></div></div>
                <div class="card matrix-card"><h3>Soil pH</h3><div class="comparison-values"><div><span class="val-label">LIVE</span><p id="soilPH${zone.id}">--</p></div><div class="divider-line"></div><div><span class="val-label">TARGET</span><p id="targetPH${zone.id}" class="target-val">--</p></div></div></div>
                <div class="card matrix-card"><h3>Soil EC</h3><div class="comparison-values"><div><span class="val-label">LIVE</span><p id="soilEC${zone.id}">--</p></div><div class="divider-line"></div><div><span class="val-label">TARGET</span><p id="targetEC${zone.id}" class="target-val">--</p></div></div></div>
                <div class="card matrix-card"><h3>Moisture</h3><div class="comparison-values"><div><span class="val-label">LIVE</span><p id="soil${zone.id}">--</p></div><div class="divider-line"></div><div><span class="val-label">TARGET</span><p id="targetMoisture${zone.id}" class="target-val">--</p></div></div></div>
            </div>
            
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                <div id="recommendationBox${zone.id}" class="alert-box" style="flex:1; margin-top:0;">Synchronizing...</div>
                
                <div class="zone-valve-strip">
                    <div class="sub-valve-indicator">
                        <span>🚪 Distribution Solenoid [SV-${zone.id}]:</span>
                        <b id="solenoidState-${zone.id}" style="color:var(--danger)">CLOSED</b>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(block);
        syncZoneProfile(zone.id);
    });
}

/* ==========================================================================
   DOM OPERATIONS & ZONE SELECTION PERSISTENCE
   ========================================================================== */
document.getElementById("addZoneBtn").addEventListener("click", () => {
    const inputField = document.getElementById("newZoneName");
    const nameText = inputField.value.trim();
    if (nameText === "") return alert("Please enter a valid label name.");

    const uniqueId = "Z" + Date.now().toString().slice(-4); 
    activeZones.push({ id: uniqueId, name: nameText.toUpperCase(), defaultCrop: "pechay", defaultStage: "seedling" });
    inputField.value = "";
    renderZonesUI();
    updateDashboard();
});

function deleteZone(zoneId) {
    if(confirm("Remove this configuration matrix?")) {
        activeZones = activeZones.filter(z => z.id !== zoneId);
        renderZonesUI();
        updateDashboard();
    }
}

function syncZoneProfile(zoneId) {
    const cropSelect = document.getElementById(`cropSelect${zoneId}`);
    const growthStage = document.getElementById(`growthStage${zoneId}`);
    if (!cropSelect || !growthStage) return;

    const crop = cropSelect.value;
    const availableStages = Object.keys(cropDatabase[crop]);

    Array.from(growthStage.options).forEach(opt => {
        if (availableStages.includes(opt.value)) {
            opt.disabled = false; opt.style.opacity = "1";
        } else {
            opt.disabled = true; opt.style.opacity = "0.25";
            if (growthStage.value === opt.value) growthStage.value = availableStages[0];
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

        const recBox = document.getElementById(`recommendationBox${zoneId}`);
        if (recBox) recBox.innerHTML = `🎯 <b>${readableCropNames[crop]} Targets:</b> NPK: ${data.n}-${data.p}-${data.k} | pH: ${data.ph}`;
        
        const zoneObj = activeZones.find(z => z.id === zoneId);
        if (zoneObj) { zoneObj.defaultCrop = crop; zoneObj.defaultStage = activeStage; }
    }
}

function setElementText(id, value) {
    const el = document.getElementById(id); if (el) el.innerText = value;
}

/* ==========================================================================
   DYNAMIC INDUSTRIAL SIMULATION LOOP (RPM / VALVES / NUTRIENTS)
   ========================================================================== */
function updateValveCardUI(valveId, isOpen) {
    const card = document.getElementById(`valveCard-${valveId}`);
    const badge = document.getElementById(`valveStatus-${valveId}`);
    if(!card || !badge) return;

    if(isOpen) {
        card.classList.add('valve-open');
        badge.innerText = "OPEN"; badge.className = "valve-badge open";
    } else {
        card.classList.remove('valve-open');
        badge.innerText = "CLOSED"; badge.className = "valve-badge closed";
    }
}

function updateRPMGauge(displayId, barId, targetRPM, isActive) {
    const display = document.getElementById(displayId);
    const bar = document.getElementById(barId);
    if(!display || !bar) return;

    let currentRPM = 0;
    if(isActive) {
        // Add minor operational variance to the reading
        currentRPM = targetRPM + random(-25, 25);
    }
    
    display.innerText = `${currentRPM} RPM`;
    let percent = (currentRPM / 3600) * 100; // Calibrated against a 3600 max speed limit
    bar.style.width = `${Math.min(percent, 100)}%`;
}

function checkNutrientDeficiency(liveValue, targetElementId, liveDisplayElementId, unitString, isFloat = false) {
    const targetElement = document.getElementById(targetElementId);
    const liveElement = document.getElementById(liveDisplayElementId);
    if (!targetElement || !liveElement) return false;

    const targetNum = isFloat ? parseFloat(targetElement.innerText) : parseInt(targetElement.innerText);
    liveElement.innerText = liveValue + (unitString ? " " + unitString : "");

    if (!isNaN(targetNum) && liveValue < targetNum) {
        liveElement.className = "lacking-nutrient";
        return true; // Deficiency discovered
    } else {
        liveElement.className = "";
        return false;
    }
}

function updateDashboard() {
    // Environmental Infrastructure
    setElementText("reservoirLevel", random(75, 98) + "%");
    setElementText("mixingLevel", random(45, 85) + "%");
    setElementText("flowRate", (globalPumpsActive.booster || globalPumpsActive.transfer ? (random(50, 75)/10).toFixed(1) : "0.0") + " L/min");
    setElementText("temperature", random(26, 31) + "°C"); 
    setElementText("humidity", random(70, 92) + "%");     
    setElementText("lightLevel", random(1200, 2800) + " lux");
    setElementText("phLevel", (Math.random() * 0.8 + 6.0).toFixed(2));
    setElementText("ecLevel", (Math.random() * 0.6 + 1.4).toFixed(2) + " mS/cm");
    setElementText("batteryLevel", random(82, 100) + "%");
    setElementText("voltage", (Math.random() * 1 + 12).toFixed(1) + "V");
    setElementText("powerSource", Math.random() > 0.3 ? "Solar PV Matrix" : "Battery Storage");

    // Dynamic SCADA System Infrastructure Processing
    updateRPMGauge("mixerRPM", "mixerRPMBar", 1200, globalPumpsActive.mixer);
    updateRPMGauge("transferRPM", "transferRPMBar", 2400, globalPumpsActive.transfer);
    updateRPMGauge("boosterRPM", "boosterRPMBar", 3100, globalPumpsActive.booster);

    // Sync structural flow distribution rules
    updateValveCardUI("V1", globalPumpsActive.transfer);
    updateValveCardUI("V2", globalPumpsActive.mixer);
    updateValveCardUI("V3", globalPumpsActive.mixer && !globalPumpsActive.booster);

    // Dynamic Engine Multi-Zone Analytics Loop
    activeZones.forEach(zone => {
        // Generate live context markers
        const nLive = random(60, 180);  const pLive = random(30, 60);  const kLive = random(95, 250);
        const phLive = parseFloat((Math.random() * 1.2 + 5.5).toFixed(1));
        const ecLive = parseFloat((Math.random() * 1.0 + 0.8).toFixed(1));
        const moistLive = random(45, 85);

        let nDeficit = checkNutrientDeficiency(nLive, `targetN${zone.id}`, `nitrogen${zone.id}`, "ppm");
        let pDeficit = checkNutrientDeficiency(pLive, `targetP${zone.id}`, `phosphorus${zone.id}`, "ppm");
        let kDeficit = checkNutrientDeficiency(kLive, `targetK${zone.id}`, `potassium${zone.id}`, "ppm");
        let phDeficit = checkNutrientDeficiency(phLive, `targetPH${zone.id}`, `soilPH${zone.id}`, "", true);
        let ecDeficit = checkNutrientDeficiency(ecLive, `targetEC${zone.id}`, `soilEC${zone.id}`, "mS/cm", true);
        let mDeficit = checkNutrientDeficiency(moistLive, `targetMoisture${zone.id}`, `soil${zone.id}`, "%");

        // Logic Mapping: If soil moisture or nutrients are low and booster is pumping, open local solenoid!
        const solenoidIndicator = document.getElementById(`solenoidState-${zone.id}`);
        if(solenoidIndicator) {
            if((mDeficit || nDeficit || kDeficit) && globalPumpsActive.booster) {
                solenoidIndicator.innerText = "OPEN"; solenoidIndicator.style.color = "var(--success)";
            } else {
                solenoidIndicator.innerText = "CLOSED"; solenoidIndicator.style.color = "var(--danger)";
            }
        }
    });
}

/* ==========================================================================
   MANUAL ACTUATOR DIAGNOSTICS & THEME CONFIGS
   ========================================================================== */
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

function toggleDeviceState(elementId, pumpKey) {
    const el = document.getElementById(elementId);
    if (!el) return;
    if (el.classList.contains('off')) {
        el.className = "device-status active"; el.innerText = 'ON';
        globalPumpsActive[pumpKey] = true;
    } else {
        el.className = "device-status off"; el.innerText = 'OFF';
        globalPumpsActive[pumpKey] = false;
    }
    updateDashboard();
}

if (document.getElementById("transferPumpBtn")) document.getElementById("transferPumpBtn").addEventListener("click", () => toggleDeviceState("transferPumpStatus", "transfer"));
if (document.getElementById("boosterPumpBtn")) document.getElementById("boosterPumpBtn").addEventListener("click", () => toggleDeviceState("boosterPumpStatus", "booster"));
if (document.getElementById("mixerBtn")) {
    document.getElementById("mixerBtn").addEventListener("click", () => {
        globalPumpsActive.mixer = !globalPumpsActive.mixer;
        alert(globalPumpsActive.mixer ? "Agitator sequence initialized." : "Agitator sequence deactivated.");
        updateDashboard();
    });
}
if (document.getElementById("nutrientPumpBtn")) document.getElementById("nutrientPumpBtn").addEventListener("click", () => alert("Precision dosing injection executed."));
if (document.getElementById("valveBtn")) document.getElementById("valveBtn").addEventListener("click", () => alert("Cycling distribution network manually..."));

if (document.getElementById("emergencyStop")) {
    document.getElementById("emergencyStop").addEventListener("click", () => {
        alert("EMERGENCY SYSTEM STOP ENGAGED");
        globalPumpsActive = { transfer: false, booster: false, mixer: false };
        document.getElementById("systemState").className = "device-status danger"; document.getElementById("systemState").innerText = "EMERGENCY";
        document.getElementById("nutrientSystemIndicator").className = "device-status danger"; document.getElementById("nutrientSystemIndicator").innerText = "SHUTDOWN";
        document.getElementById("sensorArrayIndicator").className = "device-status danger"; document.getElementById("sensorArrayIndicator").innerText = "OFFLINE";
        document.querySelectorAll('.device-status:not(#systemState):not(#nutrientSystemIndicator):not(#sensorArrayIndicator)').forEach(el => { el.className = "device-status off"; el.innerText = "OFF"; });
        updateDashboard();
    });
}

// Initialization Hooks
renderZonesUI();
setInterval(updateDashboard, 2000);
updateDashboard();

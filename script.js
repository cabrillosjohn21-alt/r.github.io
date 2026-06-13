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
        seedling: {
            n: 120,
            p: 50,
            k: 100,
            ph: "5.8 - 6.2",
            ec: "1.2 - 1.8",
            moisture: "65%"
        },
        vegetative: {
            n: 220,
            p: 60,
            k: 180,
            ph: "5.8 - 6.5",
            ec: "2.0 - 3.0",
            moisture: "70%"
        },
        flowering: {
            n: 180,
            p: 70,
            k: 250,
            ph: "5.8 - 6.5",
            ec: "2.5 - 3.2",
            moisture: "75%"
        },
        fruiting: {
            n: 160,
            p: 70,
            k: 300,
            ph: "5.8 - 6.5",
            ec: "2.5 - 3.5",
            moisture: "80%"
        }
    },
    lettuce: {
        seedling: {
            n: 80,
            p: 40,
            k: 120,
            ph: "5.5 - 6.5",
            ec: "0.8 - 1.2",
            moisture: "70%"
        },
        vegetative: {
            n: 150,
            p: 50,
            k: 200,
            ph: "5.5 - 6.5",
            ec: "1.2 - 1.8",
            moisture: "75%"
        }
    },
    spinach: {
        vegetative: {
            n: 180,
            p: 50,
            k: 220,
            ph: "6.0 - 7.0",
            ec: "1.8 - 2.3",
            moisture: "75%"
        }
    },
    eggplant: {
        vegetative: {
            n: 180,
            p: 60,
            k: 200,
            ph: "5.8 - 6.5",
            ec: "2.0 - 2.5",
            moisture: "70%"
        },
        fruiting: {
            n: 170,
            p: 70,
            k: 280,
            ph: "5.8 - 6.5",
            ec: "2.5 - 3.2",
            moisture: "75%"
        }
    },
    cucumber: {
        vegetative: {
            n: 180,
            p: 50,
            k: 220,
            ph: "5.5 - 6.5",
            ec: "1.8 - 2.5",
            moisture: "75%"
        },
        fruiting: {
            n: 170,
            p: 60,
            k: 260,
            ph: "5.5 - 6.5",
            ec: "2.0 - 3.0",
            moisture: "80%"
        }
    }
};

/* ==========================
   THEME TOGGLE SYSTEM
========================== */

const themeToggleBtn = document.getElementById('theme-toggle');

// Read existing configuration on load or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);
updateToggleText(currentTheme);

themeToggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    
    if (theme === 'dark') {
        theme = 'light';
    } else {
        theme = 'dark';
    }
    
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateToggleText(theme);
});

function updateToggleText(theme) {
    themeToggleBtn.textContent = theme === 'dark' ? '☀️ Light' : '🌙 Dark';
}

/* ==========================
   CROP PRESET LOGIC
========================== */

function updateCropPreset() {
    const crop = document.getElementById("cropSelect").value;
    const stage = document.getElementById("growthStage").value;

    if (!cropDatabase[crop] || !cropDatabase[crop][stage]) {
        document.getElementById("targetN").innerText = "N/A";
        document.getElementById("targetP").innerText = "N/A";
        document.getElementById("targetK").innerText = "N/A";
        document.getElementById("targetPH").innerText = "N/A";
        document.getElementById("targetEC").innerText = "N/A";
        document.getElementById("targetMoisture").innerText = "N/A";
        return;
    }

    const data = cropDatabase[crop][stage];

    document.getElementById("targetN").innerText = data.n + " ppm";
    document.getElementById("targetP").innerText = data.p + " ppm";
    document.getElementById("targetK").innerText = data.k + " ppm";
    document.getElementById("targetPH").innerText = data.ph;
    document.getElementById("targetEC").innerText = data.ec;
    document.getElementById("targetMoisture").innerText = data.moisture;

    document.getElementById("recommendationBox").innerHTML = `
        Recommended for <b>${crop}</b> (${stage})<br><br>
        Nitrogen: ${data.n} ppm<br>
        Phosphorus: ${data.p} ppm<br>
        Potassium: ${data.k} ppm<br>
        pH: ${data.ph}<br>
        EC: ${data.ec}<br>
        Moisture: ${data.moisture}
    `;
}

document.getElementById("cropSelect").addEventListener("change", updateCropPreset);
document.getElementById("growthStage").addEventListener("change", updateCropPreset);

/* ==========================
   DASHBOARD LIVE DATA
========================== */

function updateDashboard() {
    document.getElementById("reservoirLevel").innerText = random(50, 100) + "%";
    document.getElementById("mixingLevel").innerText = random(30, 90) + "%";
    document.getElementById("flowRate").innerText = random(2, 10) + " L/

/* ============================================================
   AirAware — script.js v4.0
   ============================================================ */

// ── Navbar Scroll Effect ──────────────────────────────────────
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── Smooth Scrolling ──────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ── Scroll Animation Observer ─────────────────────────────────
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.scroll-animate').forEach(el => scrollObserver.observe(el));
    createFloatingParticles();
    createGhostClouds();
    animateCounters();
});

// ── Floating Particles — Air/Breeze Edition ───────────────────
function createFloatingParticles() {
    const container = document.querySelector('.hero-bg-animation');
    if (!container) return;

    const tones = ['t1', 't2', 't3'];
    const sizes = [4, 5, 7, 8, 10, 12];
    const waveYs = [-14, -8, -4, 0, 5, 10, 16];

    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = `floating-particle ${tones[i % 3]}`;

        const size = sizes[Math.floor(Math.random() * sizes.length)];
        const delay = (Math.random() * 22).toFixed(2);
        const duration = (16 + Math.random() * 14).toFixed(2);
        const waveY = waveYs[Math.floor(Math.random() * waveYs.length)];
        const waveY2 = waveYs[Math.floor(Math.random() * waveYs.length)];

        p.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${(Math.random() * 18).toFixed(2)}%;
            top:  ${(15 + Math.random() * 70).toFixed(2)}%;
            --wave-y: ${waveY}px;
            --wave-y2: ${waveY2}px;
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
        `;
        container.appendChild(p);
    }
}

// ── Ghost Clouds — minimal, barely-visible wisps ──────────────
function createGhostClouds() {
    const container = document.querySelector('.hero-bg-animation');
    if (!container) return;

    // Two simple SVG cloud silhouettes (organic blobs)
    const cloudPaths = [
        'M25,60 Q40,30 60,40 Q75,15 100,30 Q130,10 150,35 Q170,20 185,40 Q200,30 210,50 Q215,65 200,70 Q180,80 140,75 Q100,82 60,75 Q35,78 25,65 Z',
        'M20,55 Q35,30 55,38 Q70,18 95,28 Q120,8 145,30 Q165,15 180,38 Q195,28 205,48 Q210,62 195,68 Q175,78 135,72 Q95,80 55,72 Q30,75 20,60 Z'
    ];

    const configs = [
        { w: 220, h: 90, top: '12%', dur: 55, delay: 0, opacity: 0.07 },
        { w: 180, h: 72, top: '28%', dur: 65, delay: 12, opacity: 0.06 },
        { w: 250, h: 100, top: '50%', dur: 48, delay: 20, opacity: 0.08 },
        { w: 160, h: 65, top: '68%', dur: 72, delay: 8, opacity: 0.05 },
        { w: 200, h: 80, top: '38%', dur: 58, delay: 30, opacity: 0.07 },
    ];

    configs.forEach((cfg, i) => {
        const cloud = document.createElement('div');
        cloud.className = 'hero-cloud';
        cloud.style.cssText = `
            width: ${cfg.w}px;
            height: ${cfg.h}px;
            top: ${cfg.top};
            --cloud-dur: ${cfg.dur}s;
            --cloud-delay: ${cfg.delay}s;
            --cloud-opacity: ${cfg.opacity};
            animation-delay: ${cfg.delay}s;
            animation-duration: ${cfg.dur}s;
        `;
        cloud.innerHTML = `<svg viewBox="0 0 220 90" preserveAspectRatio="none"><path d="${cloudPaths[i % 2]}"/></svg>`;
        container.appendChild(cloud);
    });
}


// ── Counter Animation ─────────────────────────────────────────
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let current = 0;
                    const duration = 1800;
                    const step = target / (duration / 16);
                    const update = () => {
                        current = Math.min(current + step, target);
                        counter.textContent = Number.isInteger(target) ? Math.floor(current) : current.toFixed(1);
                        if (current < target) requestAnimationFrame(update);
                        else counter.textContent = target;
                    };
                    update();
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        obs.observe(counter);
    });
}

// ── Toast Notification System ─────────────────────────────────
function showToast(message, type = 'info', title = null) {
    const icons = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle' };
    const defaults = { success: 'Success', error: 'Error', info: 'Information' };
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast-item ${type}`;
    toast.innerHTML = `
        <i class="fas ${icons[type]} toast-icon"></i>
        <div class="toast-body-text">
            <div class="toast-title">${title || defaults[type]}</div>
            <div class="toast-message">${message}</div>
        </div>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(60px)';
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

// ── AQI Color Helpers ─────────────────────────────────────────
function getAQIColor(aqi) {
    if (aqi <= 50) return '#22c55e';
    if (aqi <= 100) return '#eab308';
    if (aqi <= 150) return '#f97316';
    if (aqi <= 200) return '#ef4444';
    if (aqi <= 300) return '#8b5cf6';
    return '#7e0023';
}

function getAQICategoryInfo(aqi) {
    if (aqi <= 50) return { label: '✅ Good', bg: '#dcfce7', color: '#16a34a' };
    if (aqi <= 100) return { label: '🟡 Moderate', bg: '#fef9c3', color: '#a16207' };
    if (aqi <= 150) return { label: '⚠️ Unhealthy for Sensitive', bg: '#ffedd5', color: '#c2410c' };
    if (aqi <= 200) return { label: '🔴 Unhealthy', bg: '#fee2e2', color: '#b91c1c' };
    if (aqi <= 300) return { label: '🟣 Very Unhealthy', bg: '#ede9fe', color: '#6d28d9' };
    return { label: '💀 Hazardous', bg: '#fce7e7', color: '#7e0023' };
}

function getHealthAdvisory(aqi) {
    if (aqi <= 50) return { level: 'Risk Level: Low', title: 'Good Air Quality', msg: 'Air is satisfactory. Pollution poses little or no risk. Enjoy outdoor activities!' };
    if (aqi <= 100) return { level: 'Risk Level: Moderate', title: 'Acceptable Air Quality', msg: 'Acceptable for most people. Sensitive individuals should limit prolonged outdoor exertion.' };
    if (aqi <= 150) return { level: 'Risk Level: Elevated (Sensitive Groups)', title: 'Unhealthy for Sensitive Groups', msg: 'People with respiratory/heart conditions, children and elderly should reduce intensive outdoor activity.' };
    if (aqi <= 200) return { level: 'Risk Level: High', title: 'Unhealthy Air Quality', msg: 'Everyone may experience health effects. Avoid prolonged outdoor exposure and wear a mask outdoors.' };
    if (aqi <= 300) return { level: 'Risk Level: Very High', title: 'Very Unhealthy Conditions', msg: 'Health alert — everyone is at increased risk. Avoid all outdoor activities and keep windows closed.' };
    return { level: 'Risk Level: Emergency', title: 'Hazardous Air Quality', msg: 'Serious health risk for all. Stay indoors, use air purifiers, and seek medical help if symptomatic.' };
}

// ── Predict Button: Loading State ─────────────────────────────
function setPredictLoading(isLoading) {
    const btn = document.getElementById('predictBtn');
    const overlay = document.getElementById('loadingOverlay');
    const txtEl = document.getElementById('predictBtnText');
    if (!btn) return;
    if (isLoading) {
        btn.disabled = true;
        if (overlay) overlay.classList.remove('d-none');
        if (txtEl) txtEl.textContent = 'Analyzing…';
        btn.innerHTML = `<span class="spinner-border" role="status"></span><span id="predictBtnText">Analyzing…</span>`;
    } else {
        btn.disabled = false;
        if (overlay) overlay.classList.add('d-none');
        btn.innerHTML = `<i class="fas fa-calculator"></i><span id="predictBtnText">Predict AQI</span>`;
    }
}

// ── Main AQI Prediction ───────────────────────────────────────
function predictAQI() {
    const fields = ['pm25', 'pm10', 'no2', 'so2', 'co', 'o3'];
    const keys = ['PM2.5', 'PM10', 'NO2', 'SO2', 'CO', 'O3'];
    const data = {};
    let hasError = false;

    // Validate
    fields.forEach((id, i) => {
        const input = document.getElementById(id);
        const val = parseFloat(input.value);
        if (isNaN(val) || val < 0) {
            input.classList.add('is-invalid');
            hasError = true;
        } else {
            input.classList.remove('is-invalid');
            data[keys[i]] = val;
        }
    });

    if (hasError) {
        showToast('Please enter valid positive numbers for all fields.', 'error');
        return;
    }

    setPredictLoading(true);

    fetch('/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(r => r.json())
        .then(result => {
            setPredictLoading(false);
            renderPredictResult(result, data);
            const resultEl = document.getElementById('result');
            resultEl.classList.remove('d-none');
            setTimeout(() => resultEl.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
            showToast(`AQI predicted: ${result.aqi} — ${result.category}`, 'success', 'Prediction Complete');
        })
        .catch(() => {
            setPredictLoading(false);
            showToast('Prediction failed. Please check the server and try again.', 'error');
        });
}

function renderPredictResult(result, inputData) {
    const aqi = result.aqi;
    const color = getAQIColor(aqi);
    const cat = getAQICategoryInfo(aqi);
    const adv = getHealthAdvisory(aqi);

    // Gauge
    updateAQIGauge(aqi, color);

    // Category Badge
    const badge = document.getElementById('aqiCategory');
    badge.textContent = result.category;
    badge.style.background = cat.bg;
    badge.style.color = cat.color;

    // Advisory
    document.getElementById('advisoryLevel').textContent = adv.level;
    document.getElementById('advisoryTitle').textContent = adv.title;
    document.getElementById('advisoryText').textContent = adv.msg;
    const advEl = document.getElementById('healthAdvisory');
    if (advEl) advEl.style.borderLeftColor = color;

    // Dominant Pollutant
    updateDominantPollutant(inputData);

    // Pollutant Breakdown Table
    renderPollutantBars(inputData);
}

// ── AQI Gauge ─────────────────────────────────────────────────
function updateAQIGauge(aqi, color) {
    const gaugeVal = document.getElementById('aqiValue');
    const gaugeProg = document.getElementById('gaugeProgress');
    if (!gaugeProg) return;

    // Animate number
    const duration = 1400;
    const step = aqi / (duration / 16);
    let current = 0;
    const animate = () => {
        current = Math.min(current + step, aqi);
        if (gaugeVal) gaugeVal.textContent = Math.floor(current);
        if (current < aqi) requestAnimationFrame(animate);
        else if (gaugeVal) gaugeVal.textContent = aqi;
    };
    animate();

    // Gauge progress
    const circumference = 2 * Math.PI * 80;
    const pct = Math.min(aqi / 500, 1);
    gaugeProg.style.strokeDashoffset = circumference - pct * circumference;
    gaugeProg.style.stroke = color;
}

// ── Dominant Pollutant ────────────────────────────────────────
const THRESHOLDS = { 'PM2.5': 12, 'PM10': 54, 'NO2': 53, 'SO2': 35, 'CO': 4.4, 'O3': 54 };

function updateDominantPollutant(data) {
    const normalized = {};
    for (const key in data) {
        normalized[key] = (THRESHOLDS[key] > 0) ? data[key] / THRESHOLDS[key] : 0;
    }
    const dominant = Object.keys(normalized).reduce((a, b) => normalized[a] > normalized[b] ? a : b);
    const el = document.getElementById('dominantPollutant');
    if (el) el.innerHTML = `<i class="fas fa-exclamation-triangle"></i>${dominant}`;
}

// ── Pollutant Comparison Bars ─────────────────────────────────
function renderPollutantBars(data) {
    const body = document.getElementById('pollutantTableBody');
    if (!body) return;
    body.innerHTML = '';

    const labels = { 'PM2.5': 'PM2.5 (μg/m³)', 'PM10': 'PM10 (μg/m³)', 'NO2': 'NO₂ (ppb)', 'SO2': 'SO₂ (ppb)', 'CO': 'CO (ppm)', 'O3': 'O₃ (ppb)' };

    Object.entries(data).forEach(([key, val]) => {
        const threshold = THRESHOLDS[key] || 1;
        const ratio = Math.min(val / (threshold * 2.5), 1) * 100;
        const barColor = ratio > 75 ? '#ef4444'
            : ratio > 40 ? '#f97316'
                : '#22c55e';

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${labels[key] || key}</td>
            <td>
                <div class="bar-track">
                    <div class="bar-fill" style="width:0%;background:${barColor}" data-target="${ratio.toFixed(0)}"></div>
                </div>
            </td>
            <td style="text-align:right">${val.toFixed(1)}</td>
        `;
        body.appendChild(tr);
    });

    // Animate bars after DOM update
    setTimeout(() => {
        body.querySelectorAll('.bar-fill').forEach(bar => {
            bar.style.width = bar.dataset.target + '%';
        });
    }, 80);
}

// Clean up invalid styles on input change
document.addEventListener('DOMContentLoaded', () => {
    ['pm25', 'pm10', 'no2', 'so2', 'co', 'o3'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', () => el.classList.remove('is-invalid'));
    });
});

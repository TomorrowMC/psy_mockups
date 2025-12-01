// Experiment State Management
const experimentData = {
    participantId: null,
    demographics: {},
    condition: null, // 'warm' or 'cold'
    ratings: {},
    awareness: {},
    startTime: null,
    endTime: null
};

// Screen Navigation
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    window.scrollTo(0, 0);
}

// Initialize Experiment
function initializeExperiment() {
    experimentData.startTime = new Date().toISOString();

    // Randomly assign condition
    experimentData.condition = Math.random() < 0.5 ? 'warm' : 'cold';
    console.log('Assigned condition:', experimentData.condition);

    setupEventListeners();
}

// Event Listeners
function setupEventListeners() {
    // Consent checkbox
    const consentCheck = document.getElementById('consent-check');
    const startBtn = document.getElementById('start-btn');

    consentCheck.addEventListener('change', (e) => {
        startBtn.disabled = !e.target.checked;
    });

    // Start button
    startBtn.addEventListener('click', () => {
        showScreen('demographics-screen');
    });

    // Demographics form
    const demographicsForm = document.getElementById('demographics-form');
    demographicsForm.addEventListener('submit', handleDemographicsSubmit);

    // Play video button
    const playButton = document.getElementById('play-button');
    playButton.addEventListener('click', playVideo);

    // Continue to rating button
    const continueBtn = document.getElementById('continue-to-rating');
    continueBtn.addEventListener('click', () => {
        showScreen('rating-screen');
    });

    // Rating form
    const ratingForm = document.getElementById('rating-form');
    ratingForm.addEventListener('submit', handleRatingSubmit);

    // Awareness form
    const awarenessForm = document.getElementById('awareness-form');
    awarenessForm.addEventListener('submit', handleAwarenessSubmit);

    // Download button
    const downloadBtn = document.getElementById('download-btn');
    downloadBtn.addEventListener('click', downloadData);

    // Restart button
    const restartBtn = document.getElementById('restart-btn');
    restartBtn.addEventListener('click', () => {
        location.reload();
    });
}

// Handle Demographics Form
function handleDemographicsSubmit(e) {
    e.preventDefault();

    experimentData.demographics = {
        participantId: document.getElementById('participant-id').value || 'anonymous',
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        aiFamiliarity: document.getElementById('ai-familiarity').value
    };

    console.log('Demographics collected:', experimentData.demographics);
    showScreen('video-screen');
}

// Play Video Simulation
function playVideo() {
    const placeholder = document.getElementById('video-placeholder');
    const simulation = document.getElementById('video-simulation');
    const playButton = document.getElementById('play-button');
    const continueBtn = document.getElementById('continue-to-rating');

    // Hide play button, show simulation
    playButton.style.display = 'none';
    simulation.classList.remove('hidden');

    // Set avatar appearance based on condition
    const avatarMouth = document.getElementById('avatar-mouth');
    const subtitleText = document.getElementById('subtitle-text');

    if (experimentData.condition === 'warm') {
        avatarMouth.classList.add('warm');
        runWarmScript(subtitleText);
    } else {
        avatarMouth.classList.add('cold');
        runColdScript(subtitleText);
    }

    // Simulate video progress
    const timeline = document.getElementById('timeline-progress');
    const timeDisplay = document.getElementById('time-display');
    const duration = 30; // 30 seconds
    let currentTime = 0;

    const interval = setInterval(() => {
        currentTime += 0.1;
        const progress = (currentTime / duration) * 100;
        timeline.style.width = progress + '%';

        const mins = Math.floor(currentTime / 60);
        const secs = Math.floor(currentTime % 60);
        timeDisplay.textContent = `${mins}:${secs.toString().padStart(2, '0')} / 0:30`;

        if (currentTime >= duration) {
            clearInterval(interval);
            continueBtn.disabled = false;
            continueBtn.classList.add('pulse');
        }
    }, 100);
}

// Warm Condition Script
function runWarmScript(subtitleElement) {
    const script = [
        { time: 0, text: "Hello everyone! Welcome to Introduction to Psychology!" },
        { time: 3, text: "I'm so excited to explore the fascinating world of human behavior with you." },
        { time: 7, text: "Today we'll discuss cognitive biases and how they shape our perceptions." },
        { time: 12, text: "The halo effect is particularly interesting - it shows how one positive trait..." },
        { time: 17, text: "...can influence our overall judgment of a person or thing." },
        { time: 22, text: "I hope you find this as intriguing as I do!" },
        { time: 26, text: "Let's dive into this wonderful topic together!" }
    ];

    animateSubtitles(subtitleElement, script);
}

// Cold Condition Script
function runColdScript(subtitleElement) {
    const script = [
        { time: 0, text: "Welcome to Introduction to Psychology." },
        { time: 3, text: "We will cover cognitive biases in this session." },
        { time: 7, text: "Today's topic is the halo effect and related phenomena." },
        { time: 12, text: "The halo effect demonstrates how singular characteristics..." },
        { time: 17, text: "...can affect overall evaluations in predictable ways." },
        { time: 22, text: "This concludes the introduction." },
        { time: 26, text: "Proceed to the next section." }
    ];

    animateSubtitles(subtitleElement, script);
}

// Animate Subtitles
function animateSubtitles(element, script) {
    script.forEach(line => {
        setTimeout(() => {
            element.textContent = line.text;
            element.style.animation = 'none';
            setTimeout(() => {
                element.style.animation = 'fadeIn 0.5s ease-out';
            }, 10);
        }, line.time * 1000);
    });
}

// Handle Rating Form
function handleRatingSubmit(e) {
    e.preventDefault();

    experimentData.ratings = {
        likability: document.querySelector('input[name="likability"]:checked').value,
        visual: document.querySelector('input[name="visual"]:checked').value,
        mannerisms: document.querySelector('input[name="mannerisms"]:checked').value,
        voice: document.querySelector('input[name="voice"]:checked').value
    };

    console.log('Ratings collected:', experimentData.ratings);
    showScreen('awareness-screen');
}

// Handle Awareness Form
function handleAwarenessSubmit(e) {
    e.preventDefault();

    experimentData.awareness = {
        influenceQuestion: document.getElementById('influence-question').value,
        awarenessText: document.getElementById('awareness-text').value,
        noticedCondition: document.getElementById('noticed-condition').value
    };

    experimentData.endTime = new Date().toISOString();

    console.log('Awareness data collected:', experimentData.awareness);
    console.log('Complete experiment data:', experimentData);

    // Display results
    displayResults();
    showScreen('thankyou-screen');
}

// Display Results
function displayResults() {
    // Reveal condition
    const conditionReveal = document.getElementById('condition-reveal');
    conditionReveal.textContent = experimentData.condition.toUpperCase();
    conditionReveal.style.color = experimentData.condition === 'warm' ? '#48bb78' : '#4299e1';

    // Display response summary
    const summaryContainer = document.getElementById('response-summary');
    summaryContainer.innerHTML = `
        <div class="summary-item">
            <strong>Condition</strong>
            <p>${experimentData.condition === 'warm' ? 'Warm (Friendly)' : 'Cold (Neutral)'}</p>
        </div>
        <div class="summary-item">
            <strong>Overall Likability</strong>
            <p>${experimentData.ratings.likability} / 8</p>
        </div>
        <div class="summary-item">
            <strong>Visual Design</strong>
            <p>${experimentData.ratings.visual} / 8</p>
        </div>
        <div class="summary-item">
            <strong>Mannerisms</strong>
            <p>${experimentData.ratings.mannerisms} / 8</p>
        </div>
        <div class="summary-item">
            <strong>Voice Quality</strong>
            <p>${experimentData.ratings.voice} / 8</p>
        </div>
        <div class="summary-item">
            <strong>Average Rating</strong>
            <p>${calculateAverageRating().toFixed(2)} / 8</p>
        </div>
    `;
}

// Calculate Average Rating
function calculateAverageRating() {
    const ratings = experimentData.ratings;
    const sum = parseInt(ratings.likability) + parseInt(ratings.visual) +
                parseInt(ratings.mannerisms) + parseInt(ratings.voice);
    return sum / 4;
}

// Download Data
function downloadData() {
    const dataStr = JSON.stringify(experimentData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `halo-effect-data-${experimentData.demographics.participantId}-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
}

// Store data to localStorage (for researcher access)
function saveToLocalStorage() {
    const allData = JSON.parse(localStorage.getItem('haloEffectData') || '[]');
    allData.push(experimentData);
    localStorage.setItem('haloEffectData', JSON.stringify(allData));
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeExperiment();
    console.log('Halo Effect Experiment Initialized');
    console.log('Condition:', experimentData.condition);
});

// Save data before leaving (backup)
window.addEventListener('beforeunload', () => {
    if (experimentData.ratings.likability) {
        saveToLocalStorage();
    }
});

// Utility: Get all collected data (for researchers)
function getAllParticipantData() {
    const data = JSON.parse(localStorage.getItem('haloEffectData') || '[]');
    console.log('Total participants:', data.length);
    return data;
}

// Utility: Export all data
function exportAllData() {
    const allData = getAllParticipantData();
    const dataStr = JSON.stringify(allData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `halo-effect-all-data-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
}

// Utility: Clear all data (for researchers)
function clearAllData() {
    if (confirm('Are you sure you want to clear all participant data?')) {
        localStorage.removeItem('haloEffectData');
        console.log('All data cleared');
    }
}

// Utility: Analyze data
function analyzeData() {
    const allData = getAllParticipantData();

    if (allData.length === 0) {
        console.log('No data to analyze');
        return;
    }

    const warmData = allData.filter(d => d.condition === 'warm');
    const coldData = allData.filter(d => d.condition === 'cold');

    const warmAvg = warmData.reduce((sum, d) => {
        const avg = (parseInt(d.ratings.likability) + parseInt(d.ratings.visual) +
                    parseInt(d.ratings.mannerisms) + parseInt(d.ratings.voice)) / 4;
        return sum + avg;
    }, 0) / warmData.length;

    const coldAvg = coldData.reduce((sum, d) => {
        const avg = (parseInt(d.ratings.likability) + parseInt(d.ratings.visual) +
                    parseInt(d.ratings.mannerisms) + parseInt(d.ratings.voice)) / 4;
        return sum + avg;
    }, 0) / coldData.length;

    console.log('=== Data Analysis ===');
    console.log('Total participants:', allData.length);
    console.log('Warm condition:', warmData.length, 'participants, avg rating:', warmAvg.toFixed(2));
    console.log('Cold condition:', coldData.length, 'participants, avg rating:', coldAvg.toFixed(2));
    console.log('Difference:', (warmAvg - coldAvg).toFixed(2));

    return {
        total: allData.length,
        warm: { count: warmData.length, average: warmAvg },
        cold: { count: coldData.length, average: coldAvg },
        difference: warmAvg - coldAvg
    };
}

// Make utility functions available in console
window.haloEffect = {
    getData: getAllParticipantData,
    exportAll: exportAllData,
    clearAll: clearAllData,
    analyze: analyzeData
};

console.log('Researcher utilities available: window.haloEffect.getData(), .exportAll(), .clearAll(), .analyze()');

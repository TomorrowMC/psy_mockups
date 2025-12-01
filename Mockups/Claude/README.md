# Halo Effect in AI Virtual Instructors - Web Experiment

A modern, interactive web-based psychology experiment investigating whether the classic halo effect applies to AI-generated virtual instructors.

## 📋 Project Overview

This experiment replicates and extends the classic 1977 Nisbett & Wilson study on the halo effect, examining whether humans exhibit unconscious biases toward AI-generated virtual agents in educational contexts.

**Research Team:**
- Yadong Hou (NetID: yh2278)
- Yifei Hu (NetID: yh2277)
- Zhihao Mo (NetID: zm329)

## ✨ Features

- **Modern UI/UX**: Clean, professional interface with smooth animations
- **Randomized Assignment**: Automatic random assignment to warm/cold conditions
- **Data Collection**: Comprehensive data capture including:
  - Demographics
  - Attribute ratings (8-point scales)
  - Awareness/reflection responses
  - Timestamps and condition tracking
- **Data Export**: Individual and aggregate data export in JSON format
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Animated Avatar**: Simulated AI instructor with dynamic expressions
- **Progress Tracking**: Visual progress bar throughout the experiment
- **Local Storage**: Automatic data backup and researcher utilities

## 🚀 How to Run

### Method 1: Simple Double-Click (Easiest)

1. Navigate to the `Mockups/Claude` folder
2. Double-click `index.html`
3. The experiment will open in your default web browser

### Method 2: Local Web Server (Recommended for Development)

```bash
# Navigate to the project directory
cd "/Users/yifei.hu/Documents/Cornell/研二上/Psy/Final/Mockups/Claude"

# Start a simple HTTP server (Python 3)
python3 -m http.server 8000

# OR using Python 2
python -m SimpleHTTPServer 8000

# OR using Node.js (if you have npx installed)
npx http-server -p 8000
```

Then open your browser and go to:
```
http://localhost:8000
```

### Method 3: Using Live Server (VS Code)

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 📱 Experiment Flow

1. **Welcome Screen**
   - Study introduction
   - Consent agreement
   - Study details (duration, tasks)

2. **Demographics**
   - Participant ID (optional)
   - Age, gender
   - AI familiarity rating

3. **Video Presentation**
   - 30-second simulated AI instructor video
   - Random assignment to warm/cold condition
   - Animated avatar with condition-specific behavior

4. **Rating Screen**
   - Overall likability (1-8 scale)
   - Visual design rating
   - Mannerisms/animations rating
   - Voice/vocal tone rating

5. **Awareness Questions**
   - Self-reflection on rating influences
   - Open-ended responses
   - Condition awareness check

6. **Thank You / Debrief**
   - Condition reveal
   - Study explanation
   - Data summary
   - Download options

## 🎨 Experimental Conditions

### Warm Condition
- Friendly, enthusiastic demeanor
- Smiling avatar expression
- Warm, engaging script delivery
- Positive body language cues

### Cold Condition
- Neutral, distant demeanor
- Neutral/flat avatar expression
- Monotone, matter-of-fact script delivery
- Minimal engagement cues

## 📊 Data Collection

### Collected Data
All data is stored in JSON format with the following structure:

```json
{
  "participantId": "string",
  "demographics": {
    "age": "number",
    "gender": "string",
    "aiFamiliarity": "1-5"
  },
  "condition": "warm|cold",
  "ratings": {
    "likability": "1-8",
    "visual": "1-8",
    "mannerisms": "1-8",
    "voice": "1-8"
  },
  "awareness": {
    "influenceQuestion": "string",
    "awarenessText": "string",
    "noticedCondition": "string"
  },
  "startTime": "ISO timestamp",
  "endTime": "ISO timestamp"
}
```

### Accessing Data (For Researchers)

The experiment includes built-in researcher utilities accessible via browser console:

```javascript
// Get all participant data
window.haloEffect.getData()

// Export all data to JSON file
window.haloEffect.exportAll()

// Analyze data (shows warm vs cold averages)
window.haloEffect.analyze()

// Clear all data (with confirmation)
window.haloEffect.clearAll()
```

### Example Analysis Output

```
=== Data Analysis ===
Total participants: 30
Warm condition: 15 participants, avg rating: 6.25
Cold condition: 15 participants, avg rating: 3.75
Difference: 2.50
```

## 🛠️ Technical Details

### File Structure
```
Mockups/Claude/
├── index.html          # Main experiment interface
├── styles.css          # Styling and animations
├── script.js           # Experiment logic and data handling
└── README.md          # This file
```

### Technologies Used
- **HTML5**: Semantic structure
- **CSS3**: Modern styling with gradients, animations, flexbox/grid
- **Vanilla JavaScript**: No dependencies, pure ES6+
- **LocalStorage API**: Data persistence
- **JSON**: Data format

### Browser Compatibility
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive design

## 🎯 Experiment Purpose

This study investigates whether:

1. **Global evaluations** of an AI instructor influence ratings of specific attributes (appearance, mannerisms, voice)
2. **Participants are aware** of this influence on their judgments
3. The **halo effect** extends from human-human interaction to human-AI interaction

### Expected Results

Based on the original 1977 study, we anticipate:

- **Warm condition** participants will rate all attributes significantly higher
- **Cold condition** participants will rate attributes lower, despite identical visual/audio design
- Participants will be **largely unaware** of the influence of demeanor on attribute ratings
- Average rating difference of **2-3 points** on the 8-point scale between conditions

## 📈 Next Steps for Actual Implementation

To use this with real AI-generated videos:

1. **Generate Videos**:
   - Use Sora, Veo, or similar AI video generation platforms
   - Create two versions: warm demeanor and cold demeanor
   - Same avatar, same content, different emotional tone

2. **Replace Video Simulation**:
   - Replace the `#video-simulation` div with actual `<video>` element
   - Update `playVideo()` function to handle real video playback
   - Maintain the same 30-second duration

3. **Deploy**:
   - Host on a web server (GitHub Pages, Netlify, etc.)
   - Configure data export to a backend (optional)
   - Set up database for large-scale data collection

4. **Recruit Participants**:
   - Target sample size: 30+ participants (15 per condition)
   - Use random assignment (already implemented)
   - Monitor completion rates

## 🔒 Ethics & Privacy

- All data is anonymized
- Participant consent required before starting
- Full debrief provided after completion
- Data stored locally, under participant control
- Option to download personal data
- No external tracking or analytics

## 🐛 Troubleshooting

**Issue**: Page doesn't load properly
- **Solution**: Try opening in a different browser or using a local server

**Issue**: Animations not smooth
- **Solution**: Close other browser tabs, ensure hardware acceleration is enabled

**Issue**: Data not saving
- **Solution**: Check if browser allows localStorage, try in non-incognito mode

**Issue**: Video simulation not playing
- **Solution**: Click the play button, check browser console for errors

## 📝 Notes for Researchers

- **Randomization**: Condition assignment happens on page load (50/50 split)
- **Data Persistence**: Data saved to localStorage on form submission
- **Backup**: Data auto-saved before page unload
- **Console Logging**: All major events logged to console for debugging
- **Testing**: Test both conditions by refreshing the page multiple times

## 🎓 Academic Context

**Original Study**: Nisbett, R. E., & Wilson, T. D. (1977). The Halo Effect: Evidence for Unconscious Alteration of Judgments. *Journal of Personality and Social Psychology, 35*(4), 250-256.

**This Adaptation**: Extends the classic halo effect paradigm to AI-generated virtual agents, examining whether unconscious biases persist in human-AI interaction contexts.

## 📞 Contact

For questions about this implementation or the experiment:
- Yadong Hou: yh2278@cornell.edu
- Yifei Hu: yh2277@cornell.edu
- Zhihao Mo: zm329@cornell.edu

---

**Built with ❤️ for Psychology Research**

*Last Updated: 2025*

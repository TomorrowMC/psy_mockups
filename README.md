# AI Instructor Evaluation Experiment - Mockup

This project is a React-based web prototype designed for a Psychology experiment investigating the **Halo Effect in AI-Human Interaction**.

It simulates an online learning platform ("EduStream AI") where participants interact with an AI instructor (Aura) exhibiting either a "Warm" or "Cold" demeanor. The goal is to test whether the AI's demeanor influences the user's perception of unrelated attributes, such as the platform's UI design and the AI's perceived intelligence.

## Project Structure

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **Data Collection**: Local JSON file storage (via Vite middleware)
- **Assets**: `public/warm.mp4`, `public/cold.mp4` (Video stimuli)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/TomorrowMC/psy_mockups.git
    cd psy_mockups
    ```
    *(Note: If you are running this locally from the provided folder, just navigate to `Mockups/gemini`)*

2.  Install dependencies:
    ```bash
    cd Mockups/gemini
    npm install
    ```

### Running the Experiment

1.  Start the local development server:
    ```bash
    npm run dev
    ```
2.  Open your browser and navigate to `http://localhost:5173/` (or the URL shown in your terminal).

### Collecting Data

The application is configured to save participant data locally.
1.  When a participant finishes the survey and clicks "Submit", a JSON file is generated.
2.  Data is stored in: `Mockups/gemini/experiment_data/`.
3.  Filename format: `participant_[TIMESTAMP]_[CONDITION].json`.

## Tech Stack

- **React 19**: UI Component library.
- **Framer Motion**: Smooth animations for page transitions and UI elements.
- **Recharts**: Data visualization for the debrief screen.
- **Lucide React**: Modern icon set.
- **Tailwind CSS**: Utility-first styling.

## License

This project is for educational and experimental use only.

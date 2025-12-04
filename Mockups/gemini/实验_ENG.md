# Experiment Design and Implementation Report: Halo Effect in AI Instructor Interaction

## 1. Background
**Importance of the Research Question**

With the rapid advancement of Artificial Intelligence, AI-driven virtual instructors (AI Tutors) are increasingly entering the educational landscape. Classic psychological research (Nisbett & Wilson, 1977) confirmed the existence of the "Halo Effect," where people's overall impression of someone (e.g., "warm" or "cold") subtly influences their evaluation of specific attributes (e.g., appearance, accent).

This experiment aims to investigate whether this classic social psychological phenomenon **transfers** to Human-Computer Interaction (HCI). Specifically, we address the following questions:
*   **Core Question**: When an AI instructor exhibits "warm" or "cold" traits, will users consequently show biased evaluations of system attributes unrelated to the instructor (such as **the aesthetic appeal of the platform's UI design**, **the perceived intelligence of the system**, and **the ease of use of its features**)?
*   **Importance**: If the Halo Effect exists in AI interactions, it implies that system designers could potentially mask technical flaws or boost user trust by adjusting the AI's "personality." This has significant implications for future Educational Technology (EdTech) design, User Experience (UX) optimization, and AI ethics.

## 2. Methods
**Experiment Setup and Technological Adaptation**

To adapt to the modern technological environment and enhance the ecological validity of the experiment, we have entirely reconstructed the original offline experiment into a high-fidelity **online AI learning platform (Web Prototype)**.

### 2.1 Cover Story
To prevent the concept of the "Halo Effect" from priming participants, we disguised the experiment as an **"AI Instructor Effectiveness Evaluation"** study.
*   **Course Content**: We chose a concrete and classic chapter from psychology, "Behaviorism" (Pavlov's Classical Conditioning), instead of abstract concepts, to enhance realism.
*   **Platform Identity**: We built a virtual Learning Management System (LMS) named "EduStream AI".

### 2.2 Experiment Flow and Technical Implementation
We developed a full-featured Single-Page Application (SPA) using **React + Vite + Tailwind CSS**, with the following flow:

1.  **Landing Page**: Introduces the experiment's stated purpose as "optimizing AI instructor algorithms," concealing the true intent.
2.  **Condition Manipulation**:
    *   **Independent Variable**: AI instructor's tone/demeanor (Warm vs. Cold).
    *   **Implementation**: The system loads different MP4 video resources (`warm.mp4` / `cold.mp4`) based on the assigned condition. The AI persona (Aura v2.5) in the videos maintains a consistent appearance, differing only in vocal tone, intonation, and subtle micro-expressions.
3.  **Video Learning Task**:
    *   We constructed an immersive LMS interface, including a **sidebar course syllabus**, a **real-time notes section**, an **instructor information panel** (displaying "Powered by Gemini"), a **mock quiz**, and **gamification elements** (daily streaks, experience points).
    *   These rich features are designed to make users believe they are interacting with a mature product, thereby enabling them to provide meaningful evaluations of the "Platform UI" and "System Features."
4.  **Multi-dimensional Questionnaire (Measurement)**:
    *   After the video playback concludes, the questionnaire is unlocked. We expanded the evaluation metrics into three dimensions:
        *   **Part 1 Instructor Evaluation**: Likability, naturalness of voice (replicates original experiment).
        *   **Part 2 Platform Experience**: UI aesthetics, navigation ease ( **newly added for tech adaptation**).
        *   **Part 3 System Perception**: Perceived AI intelligence, trustworthiness ( **newly added for tech adaptation**).
5.  **Data Collection**: Via a custom Vite middleware, the participant's chosen condition, ratings, and notes are automatically saved as local JSON files for subsequent analysis.

## 3. Results
**Expected Outcomes and Data Visualization**

We have integrated a data visualization module (using Recharts) into the Debrief page, intended to show participants the experiment's hypotheses and expected data in real-time.

### Key Data Figures Planned:
1.  **Average Ratings Comparison Bar Chart (Average Ratings by Condition)**:
    *   Expected to show that **Warm condition** ratings are significantly higher than **Cold condition** across all dimensions.
    *   **Key Insight**: Emphasize "Platform UI" and "AI Trust" – metrics objectively unrelated to the instructor's demeanor. If, in the Warm condition, users perceive the "UI as more appealing" or the "AI as more intelligent," it strongly supports the transfer of the Halo Effect.
2.  **Sentiment Distribution Stacked Bar Chart**:
    *   Displays the percentage of attributes rated as "Appealing" versus "Irritating." The expectation is that the Warm condition will show 80%+ positive evaluations, while the Cold condition will show the opposite.

*The mock data currently in the prototype supports this expected trend and is used to explain the experiment's principles to users.*

## 4. Discussion
**Findings, Limitations, and Implications for Technology**

### 4.1 Preliminary Findings
Based on prototype testing and expected hypotheses, we anticipate that humans, when interacting with an anthropomorphized AI (like the "Aura" instructor), unconsciously apply social interaction rules. A "warm" AI voice is expected not only to enhance the acceptance of its teaching content but also to create a "halo" effect, boosting user perception of the entire software system's design quality and intelligence level.

### 4.2 Limitations and Threats to Validity
1.  **Uncanny Valley Effect**: Current AI video generation technology may not yet achieve perfect naturalness. If the videos appear too rigid, it could interfere with the "Warm" condition's intended expression, causing users to focus on technical flaws rather than tonal differences.
2.  **Sample Bias**: As a classroom experiment, participants are primarily university students who are generally familiar with AI technology, potentially making them less susceptible to the "halo" effect than the general population.
3.  **Uncontrolled Online Environment**: Compared to a laboratory setting, online participants may be subject to environmental distractions (e.g., not turning on audio), affecting the validity of the experimental manipulation.

### 4.3 Implications for Technology
1.  **New Dimension in UX Design**: In designing educational products or customer service bots, beyond optimizing interfaces and algorithms, **"Personality Design"** could be a critical lever for enhancing user experience.
2.  **Ethical Considerations**: Given that a "warm" AI can increase user trust, developers must be wary of exploiting this effect to promote low-quality content or induce users to disclose private information.
3.  **System Holistic Perception**: Users often perceive the AI agent and the platform hosting it as an integrated entity. Improving the quality of AI interaction can directly enhance users' value assessment of the entire SaaS platform.

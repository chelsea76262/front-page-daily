# Front Page Daily - App Rules & Web Design Specifications

Front Page Daily is a daily news puzzle and vocabulary game designed to start the day off with a lighthearted smile. This document serves as the official reference for the game's mechanics, design system, scoring structures, and compliance rules.

---

## 🎨 1. Visual Identity & Design System

The application utilizes a premium, vintage-inspired "newspaper dispatch" design combined with modern interactive micro-animations.

### Color Palette (HSL & Theme Variables)
*   **Ink Black (`--text-ink`)**: Primary text color, mimicking real newspaper print.
*   **Page Cream (`--bg-page`)**: Warm, off-white background resembling fresh newsprint paper.
*   **Card Background (`--bg-card`)**: Slightly brighter cream to create layered visual hierarchy.
*   **Accent Colors**:
    *   `--accent-gold`: Used for premium items, streaks, and Lexicon highlights.
    *   `--accent-green`: Success badges, verification cards.
    *   `--accent-blue`: Action highlights, share buttons.
    *   `--accent-red`: Failures, error flags, choice-removal indicators.

### Typography
*   **Logos & Section Headings (`--font-logo`)**: Classically styled serif font to mirror vintage journalism mastheads.
*   **Gameplay Text & Labels (`--font-sans`)**: Highly readable modern sans-serif (such as Inter or Outfit) to prevent reading fatigue on small screens.

---

## 🎮 2. Gameplay Flow & Mechanics

The game operates across a unified state-machine flow:

```
[HUB Screen] ➔ [Phase 1: Wires] ➔ [Category Transition] ➔ [Phase 2: Fact-Check Audit] ➔ [Summary Screen] ➔ [Optional: Editor's Lexicon]
```

### Phase 1: The Wires (Anagrams & Word Banks)
1.  **Word Scramble (Hard Mode)**: The user is presented with a scrambled headline where a key target word has its letters jumbled. The user must type the correct target word.
2.  **Multiple Choice (Easy Mode)**: If the user swaps to Easy Mode, the anagram is replaced with a Word Bank showing 5 candidate multiple-choice buttons.
3.  **Reveal & Verification**:
    *   Verified stories present the **Wire Snippet** (the contextual summary paragraph describing the event) *only after* a correct solve or reveal.
    *   Verified stories are marked with a checkmark or failure tag and logged to the current daily edition.

### Category Transition Screen
- Occurs after completing 5 stories of a given category.
- Shows current score and a grid of played/unplayed categories.
- Allows players to select another category (Headline News, Pop Culture, Sports, Tech & Science) to stack higher scores or proceed directly to Phase 2.

### Phase 2: Fact-Check Audit (Fact or Fiction)
- Presenting a card stack of 3 daily lighthearted stories.
- Swipe **Right** for **FACT**, swipe **Left** for **FICTION**.
- Swiping reveals the validation message.
- Client state logs completed headlines in `localStorage` under `fpd_seen_p2` to exclude them on subsequent days.

---

## 🛡️ 3. Legal & Compliance Rules (Brand-Safe Synthesis)

To eliminate trademark and copyright liabilities, the application executes automatic **AI-Synthesis** and content filtering on incoming news feeds:

1.  **Trademark Sanitization**: All publisher brand names (BBC, AP, Reuters, CNN, etc.) are stripped and replaced with generic terms (e.g., *"Global Agency"*).
2.  **Public Entity Generalization**: Specific public names and corporations are generalized to protect brand safety (e.g., *Biden* -> *The President*, *Boeing* -> *Aviation Giant*, *Google* -> *Search Pioneer*).
3.  **Tragedy Filter**: Feeds are scanned for dark keywords (*kill, die, dead, tragedy, fatal, murder*). A maximum of **one tragedy story** is allowed per category edition to preserve a positive, friendly app atmosphere.

---

## 📈 4. Standardized Point & Ranking System

To ensure smooth counting animations (under 200ms) and logical scoring progression:

### Scoring Breakdown
*   **Phase 1 (Wires)**:
    *   Hard Mode Perfect (No hints): **50 PTS**
    *   Hard Mode with Letter Hint: **40 PTS**
    *   Hard Mode with Definition Hint: **35 PTS**
    *   Easy Mode Solve / Word Bank: **25 PTS**
    *   Revealed Answer: **0 PTS**
*   **Phase 2 (Fact-Check Audit)**:
    *   Correct swipe guess: **25 PTS**
    *   Incorrect swipe guess: **0 PTS**
*   **Editor's Lexicon**:
    *   Correct definition matching: **+25 PTS Bonus** (added directly to globalScore).

### Editorial Ranks
*   **Executive Editor**: 250+ PTS
*   **Managing Editor**: 175 - 249 PTS
*   **Senior Reporter**: 100 - 174 PTS
*   **Cub Reporter**: 50 - 99 PTS
*   **Editorial Intern**: Under 50 PTS

---

## 🎓 5. Editor's Lexicon (Overtime Mode)

A permanent vocabulary builder accessible directly from the Summary Screen:
*   **3-Word Rounds**: Played in chunks of 3 words. Correct matching awards overall cumulative bonus points (+25 PTS).
*   **Concise Definitions**: Definitions are kept to a single, easily read line.
*   **Remove Choice Lifeline**: A lifeline allowing players to remove a wrong choice up to **2 times per word**, hiding distractors.
*   **Round Complete Flow**: After 3 words, players can start another 3-word challenge, continue endlessly, or return to the main paper.

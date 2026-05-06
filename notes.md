# 📚 LEETBOX

### Spaced Repetition Flashcards for Mastering LeetCode Patterns

LEETBOX is a focused learning system built on the **Leitner method** to help engineers retain problem-solving patterns through structured, time-based revision.

Instead of re-solving problems randomly, LEETBOX ensures you revisit concepts **at the right time**, maximizing long-term retention.

---

# ✨ Why LEETBOX?

Most developers:

- Solve a problem once ❌
- Forget it within days ❌

LEETBOX fixes this by:

- Reinforcing memory through **spaced repetition**
- Prioritizing **weak areas automatically**
- Structuring revision into **predictable daily sessions**

---

# 🧠 Core Concept — Leitner System

Cards move through 7 boxes based on performance:

| Box | Interval | Meaning    |
| --- | -------- | ---------- |
| 1   | 1 day    | New / weak |
| 2   | 2 days   |            |
| 3   | 4 days   |            |
| 4   | 8 days   |            |
| 5   | 16 days  |            |
| 6   | 32 days  | Strong     |
| 7   | ∞        | Mastered   |

---

# 🔁 Learning Flow

```text
          Wrong Answer
        ┌───────────────┐
        ▼               │
[ Box 1 ] → [ Box 2 ] → [ Box 3 ] → ... → [ Box 7 ]
   ▲                                          │
   └──────────── Correct Answer ───────────────┘
```

---

# ⚙️ Architecture Overview

## High-Level Flow

```text
          ┌──────────────┐
          │   UI Layer   │
          │ (React App)  │
          └──────┬───────┘
                 │
                 ▼
      ┌────────────────────┐
      │  State (Session)   │
      │  - dueCards        │
      │  - currentIndex    │
      │  - progress        │
      └────────┬───────────┘
               │
               ▼
      ┌────────────────────┐
      │ Business Logic     │
      │ - getIsDue         │
      │ - getNextReview    │
      │ - Leitner rules    │
      └────────┬───────────┘
               │
               ▼
      ┌────────────────────┐
      │ Persistence Layer  │
      │ IndexedDB (idb)    │
      └────────────────────┘
```

---

## 🧩 Study Session Architecture (Critical Design)

```text
App Load
   │
   ▼
Fetch All Cards (IndexedDB)
   │
   ▼
Filter → getDueCards()
   │
   ▼
SNAPSHOT → dueCards (immutable for session)
   │
   ▼
Iterate using currentIndex
   │
   ▼
User Action (Correct / Wrong)
   │
   ▼
Update Card → Save to DB
   │
   ▼
Move to Next Card (no re-filtering)
```

### ✅ Why this matters

- Prevents **card skipping bugs**
- Ensures **consistent UX**
- Matches **Anki-like behavior**

---

# 🗃️ Data Model

```js
{
  id: string,
  title: string,
  question: string,
  solution: string,
  box: number,              // 1 → 7
  nextReviewDate: string    // ISO date
}
```

---

# ⏱️ Scheduling Logic

### Interval Calculation

```js
intervalDays = 2 ^ (box - 1);
```

---

### Next Review Date

```js
date.setHours(0, 0, 0, 0); // normalize
date.setDate(date.getDate() + intervalDays);
```

---

### Due Logic

```js
isDue = now >= nextReviewDate;
```

---

# 🧠 Key Design Decisions

## 1. Session-Based State (Important)

Instead of recomputing due cards every render:

```js
const dueCards = getDueCards(cards); ❌
```

We use:

```js
const [dueCards, setDueCards] = useState([]); ✅
```

### Why?

- Prevents **index mismatch**
- Avoids **skipping last card**
- Ensures stable progress tracking

---

## 2. Start-of-Day Normalization

All review times are snapped to midnight:

```js
setHours(0, 0, 0, 0);
```

### Benefit:

- Eliminates time-based inconsistencies
- Matches real spaced repetition systems

---

## 3. Event-Driven Persistence

```text
User Action → Update Card → Save → Move Forward
```

- No background syncing
- No stale UI state
- Predictable data flow

---

# 📊 Features

### 🧠 Smart Revision

- Only shows **due cards**
- Missed cards remain available

### 🔄 Study Mode

- Flip cards (question → solution)
- Track progress visually
- Session-based review

### 📈 Dashboard

- Box distribution
- Due indicators
- Total cards overview

### 💾 Offline First

- IndexedDB storage
- No backend required

---

# 🏗️ Tech Stack

- **React** — UI
- **IndexedDB (idb)** — persistence
- **React Router** — navigation
- **Lucide Icons** — UI icons
- **CSS** — custom styling

---

# 📁 Project Structure

```text
src/
  components/
  pages/
    Home.jsx
    Study.jsx
    Cards.jsx
    AddCard.jsx
  utils/
    helper.js      // core logic
    store.js       // IndexedDB setup
  styles/
```

---

# 🚀 Getting Started

```bash
npm install
npm run dev
```

---

# 🧪 Future Enhancements

- 📅 Daily review limits (Anki-style)
- 🔁 Undo last action
- 📊 Performance analytics
- 🧠 Adaptive difficulty (leech detection)
- ☁️ Cloud sync
- 🔍 Tag-based filtering

---

# 🎯 What Makes This Interesting

This is not just a CRUD app.

It demonstrates:

- State vs derived data separation
- Time-based algorithms
- Session consistency design
- Offline-first architecture
- Real-world learning system modeling

---

# 👨‍💻 Author

Built as a deliberate system to master problem-solving patterns efficiently.

---

# 📜 License

MIT License

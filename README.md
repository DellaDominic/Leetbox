# 📚 LEETBOX — Spaced Repetition Flashcards for LeetCode

LEETBOX is a lightweight flashcard app built with React that helps you retain coding patterns using the **Leitner System** (spaced repetition).
It’s designed specifically for practicing and revising LeetCode problems effectively over time.

---

## 🚀 Features

* 🧠 **Leitner System (7 Boxes)**

  * Cards move across 7 boxes based on performance
  * Each box has increasing review intervals

* ⏱️ **Spaced Repetition**

  * Box 1 → Daily
  * Box 2 → Every 2 days
  * Box 3 → Every 4 days
  * ...
  * Box 7 → Mastered (no review)

* 📅 **Due Card Detection**

  * Cards appear only when they are due
  * Missed reviews remain available (no data loss)

* 🔄 **Study Mode**

  * Session-based review (like Anki)
  * Flip cards to reveal solutions
  * Track progress with animated progress bar

* 📊 **Dashboard**

  * Overview of all 7 boxes
  * Due cards highlighted
  * Total card count

* 💾 **Offline Storage**

  * Uses IndexedDB via `idb`
  * No backend required

---

## 🧠 How It Works

### Leitner System

| Box | Interval | Behavior        |
| --- | -------- | --------------- |
| 1   | 1 day    | Frequent review |
| 2   | 2 days   |                 |
| 3   | 4 days   |                 |
| 4   | 8 days   |                 |
| 5   | 16 days  |                 |
| 6   | 32 days  |                 |
| 7   | Mastered | No review       |

---

### Review Flow

* ✅ **Correct Answer**

  * Move card to next box
  * Schedule next review

* ❌ **Wrong Answer**

  * Reset card to Box 1
  * Review again soon

---

### Scheduling Logic

```js
intervalDays = 2^(box - 1)
```

Cards are shown when:

```js
now >= nextReviewDate
```

---

## 🏗️ Tech Stack

* **React** (Frontend)
* **IndexedDB (idb)** (Storage)
* **React Router** (Navigation)
* **Lucide Icons**
* **CSS (Custom styling)**

---

## 📁 Project Structure

```
src/
  components/
  pages/
    Home.jsx
    Study.jsx
    Cards.jsx
    AddCard.jsx
  utils/
    helper.js
    store.js
  styles/
```

---

## ⚙️ Setup & Run

```bash
# Install dependencies
npm install

# Run app
npm run dev
```

---

## 📌 Key Concepts Implemented

* Derived vs persisted state separation
* Session-based study flow (prevents skipping bugs)
* Time normalization (start-of-day scheduling)
* IndexedDB persistence

---

## 🧪 Future Improvements

* ⏳ Daily review limits (like Anki)
* 🔁 Undo last action
* 📈 Stats & streak tracking
* 🔍 Search + tag filtering
* 🎨 Improved UI/animations
* ☁️ Sync across devices

---

## 🎯 Why This Project?

Built as a focused learning tool for mastering problem-solving patterns through repetition. Most people solve LeetCode problems once and forget them.

LEETBOX solves that by:

* Reinforcing patterns over time
* Prioritizing weak areas
* Making revision systematic

---



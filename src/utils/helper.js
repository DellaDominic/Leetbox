import { initDB, STORE_NAME } from './store';

/* constant the determines the review intervals for each box in the Leitner system */

// to-do: make isDue dynamic based on nextReviewDate and current date and count of cards in each box
// to-do: count should be dynamic based on number of cards in each box

export const getBoxDetails = (cards = []) => {
  const boxData = {};

  // Initialize all 7 boxes
  for (let box = 1; box <= 7; box++) {
    const reviewDays = Math.pow(2, box - 1); // 1,2,4,8...

    boxData[box] = {
      count: 0,
      reviewDays,
      label: box === 1 ? 'Daily' : `Every ${reviewDays} Days`,
      isDue: false,
    };
  }

  // Populate counts + due state
  cards.forEach((card) => {
    const box = Math.min(Math.max(card.box, 1), 7);

    boxData[box].count += 1;

    // If ANY card in this box is due → mark box as due
    if (getIsDue(card)) {
      boxData[box].isDue = true;
    }
  });

  return boxData;
};

/* Save and update existing cards via put to indexedDB via idb */
export async function saveCard(card) {
  const db = await initDB();
  await db.put(STORE_NAME, card);
}

export async function getAllCards() {
  const db = await initDB();
  return db.getAll(STORE_NAME);
}

export async function getCardById(id) {
  const db = await initDB();
  const card = await db.get(STORE_NAME, id);
  console.log({ card });
  return card;
}

export async function deleteCard(id) {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
}

// returns the next review date based on the box number
export const getNextReviewDate = (boxNumber) => {
  // Mastered cards → no more reviews
  if (boxNumber >= 7) return null;

  const intervalDays = Math.pow(2, boxNumber - 1); // 1,2,4,8...

  const date = new Date();

  // ✅ Snap to start of today
  date.setHours(0, 0, 0, 0);

  // ✅ Add interval
  date.setDate(date.getDate() + intervalDays);

  return date.toISOString();
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export const getIsDue = (card) => {
  // New cards (never scheduled)
  if (!card.nextReviewDate) return true;

  // Mastered cards should never appear
  if (card.box >= 7) return false;

  const now = new Date();

  // ✅ Snap current time to start of today
  now.setHours(0, 0, 0, 0);

  const nextReview = new Date(card.nextReviewDate);

  return now >= nextReview;
};

export const getDueCards = (cards) => {
  return cards.filter((card) => getIsDue(card));
};

import { initDB } from './store';

/* constant the determines the review intervals for each box in the Leitner system */

// to-do: make isDue dynamic based on nextReviewDate and current date and count of cards in each box
// to-do: count should be dynamic based on number of cards in each box

export const BOX_INTERVALS = {
  1: { count: 14, reviewDays: 1, label: 'Daily', isDue: true },
  2: { count: 2, reviewDays: 2, label: 'Every 2 Days', isDue: false },
  3: { count: 1, reviewDays: 4, label: 'Every 4 Days', isDue: true },
  4: { count: 0, reviewDays: 8, label: 'Every 8 Days', isDue: false },
  5: { count: 8, reviewDays: 16, label: 'Every 16 Days', isDue: false },
  6: { count: 0, reviewDays: 32, label: 'Every 32 Days', isDue: false },
  7: { count: 0, reviewDays: 64, label: 'Every 64 Days', isDue: false },
};

/* Key for localStorage to store flashcards */
export const STORAGE_KEY = 'leetbox_cards';

/* Save cards to indexedDB via idb */
export async function saveCard(card) {
  const db = await initDB();
  await db.put('cards', card);
}

export async function getAllCards() {
  const db = await initDB();
  return db.getAll('cards');
}

/* Sample data for development purposes */
function seedCards() {
  const sampleCards = [
    {
      id: 1,
      title: '2 Sum',
      Description:
        'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nExample:\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]',
      solution:
        'Use a hash map to store each number and its index as you iterate.\n\nFor each number x, check if (target - x) already exists in the map.\nIf yes, return [map[target-x], currentIndex].\nIf no, store x → index in the map.\n\nTime: O(n), Space: O(n)\n\n```python\ndef twoSum(nums, target):\n    seen = {}\n    for i, x in enumerate(nums):\n        diff = target - x\n        if diff in seen:\n            return [seen[diff], i]\n        seen[x] = i\n```',
      box: 1,
      tags: ['Array', 'Hash Table'],
      difficulty: 'Easy',
      //   nextReviewDate: getReviewDate(getTodaysDate()), // review in 1 day
      //   createdAt: getTodaysDate(),
    },
  ];
  saveCard(sampleCards);
  return sampleCards;
} // to-do: remove seedCards in production

// returns the next review date based on the box number
export const getNextReviewDate = (boxNumber) => {
  const boxInterval = BOX_INTERVALS[boxNumber].reviewDays ?? 1;

  let date = new Date();
  date.setDate(date.getDate() + boxInterval);
  return date.toISOString();
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

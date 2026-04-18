/* constant the determines the review intervals for each box in the Leitner system */
export const BOX_INTERVALS = {
  1: 1,
  2: 2,
  3: 4,
  4: 8,
  5: 16,
  6: 32,
  7: 64,
};

/* Key for localStorage to store flashcards */
export const STORAGE_KEY = 'leetbox_cards';

/* Load cards from localStorage or initialize with sample data if no data */
export function loadCards() {
  const cards = localStorage.getItem(STORAGE_KEY);
  return cards ? JSON.parse(cards) : seedCards(); // to-do: remove seedCards in production
}

/* Save cards to localStorage */
export function saveCards(cards) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
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
  saveCards(sampleCards);
  return sampleCards;
} // to-do: remove seedCards in production

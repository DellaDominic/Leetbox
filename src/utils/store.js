import { openDB } from 'idb';

const DB_NAME = 'flashcards-db';
export const STORE_NAME = 'cards';

export async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
        });

        store.createIndex('createdAt', 'createdAt');
      }
    },
  });
}

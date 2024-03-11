
const DB_NAME = 'jate';
const DB_VERSION = 1;
const DB_KEY_PATH = 'id';
const DB_UPGRADE_MESSAGE = 'jate database created';
const DB_EXISTS_MESSAGE = 'jate database already exists';
const PUT_DB_SUCCESS_MESSAGE = 'Data saved to database.';
const GET_DB_SUCCESS_MESSAGE = 'Data retrieved.';

import { openDB } from 'idb';

const initdb = async () =>
  openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (db.objectStoreNames.contains(DB_NAME)) {
        console.log(DB_EXISTS_MESSAGE);
        return;
      }
      db.createObjectStore(DB_NAME, { keyPath: DB_KEY_PATH, autoIncrement: true });
      console.log(DB_UPGRADE_MESSAGE);
    },
  });

export const putDb = async (content) => {
  const db = await openDB(DB_NAME, DB_VERSION);
  const transaction = db.transaction(DB_NAME, 'readwrite');
  const store = transaction.objectStore(DB_NAME);
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log(PUT_DB_SUCCESS_MESSAGE, result);
};

export const getDb = async () => {
  const db = await openDB(DB_NAME, DB_VERSION);
  const transaction = db.transaction(DB_NAME, 'readonly');
  const store = transaction.objectStore(DB_NAME);
  const request = store.getAll();
  const result = await request;
  console.log(GET_DB_SUCCESS_MESSAGE, result);
};

initdb();

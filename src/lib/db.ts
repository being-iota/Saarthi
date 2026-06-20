// IndexedDB Helper for Shikshak-Saarthi (Client-Side Document Persistence)

const DB_NAME = "ShikshakSaarthiDB";
const DB_VERSION = 1;
const STORE_NAME = "studyDocs";

export function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      reject(new Error("IndexedDB is not supported in this environment."));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject(request.error);
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "filename" });
      }
    };
  });
}

export async function saveDoc(filename: string, docData: any): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(transaction.objectStoreNames[0] || STORE_NAME);
    
    const record = {
      filename,
      data: docData,
      savedAt: Date.now()
    };

    const request = store.put(record);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function getAllDocs(): Promise<Record<string, any>> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      const records = request.result;
      const docsMap: Record<string, any> = {};
      records.forEach((rec: any) => {
        docsMap[rec.filename] = rec.data;
      });
      resolve(docsMap);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function deleteDoc(filename: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(filename);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

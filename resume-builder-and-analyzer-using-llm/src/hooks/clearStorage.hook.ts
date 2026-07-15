type StorageType = Storage;

const clearStorage = {
    clear(storage: StorageType = localStorage) {
        storage.clear();
    },

    clearKey(key: string, storage: StorageType = localStorage) {
        storage.removeItem(key);
    },
};

export default clearStorage;
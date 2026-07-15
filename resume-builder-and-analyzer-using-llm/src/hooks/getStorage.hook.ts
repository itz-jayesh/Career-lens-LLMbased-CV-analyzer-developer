export default function getStorage(key: string, storage: "localStorage" | "sessionStorage" = "localStorage"): null | any {
    try {
        if (storage === "localStorage") {
            const storedValue = localStorage.getItem(key);
            if (storedValue && typeof storedValue === "string" && typeof JSON.parse(storedValue) === "object") {
                return JSON.parse(storedValue);
            }
            return null;
        }
        if (storage === "sessionStorage") {
            const storedValue = sessionStorage.getItem(key);
            if (storedValue && typeof storedValue === "string" && typeof JSON.parse(storedValue) === "object") {
                return JSON.parse(storedValue);
            }
            return null;
        }
        return null;
    } catch (error) {
        return null;
    }
}; 
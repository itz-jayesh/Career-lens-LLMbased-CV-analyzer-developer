export default function setStorage(key: string, value: any, storage: "localStorage" | "sessionStorage" = "localStorage") {
    try {
        if (storage === "localStorage") {
            localStorage.setItem(key, JSON.stringify(value));
        }
        else if (storage === "sessionStorage") {
            sessionStorage.setItem(key, JSON.stringify(value));
        }
    } catch (error) { }
};
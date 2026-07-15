export default function Generate_ID(): string {
    const segments = [
        randomCharManual(8),
        randomCharManual(4),
        randomCharManual(4),
        randomCharManual(4),
        randomCharManual(12)
    ];
    return segments.join('-');
}

function randomCharManual(length: number): string {
    // Pool containing all numbers, lowercase letters, and uppercase letters
    const charPool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    const poolLength = charPool.length;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * poolLength);
        result += charPool.charAt(randomIndex);
    }

    return result;
}
export default function SessionId() {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const sections = [8, 4, 4, 4, 12];

    function generateSection(length: number): string {
        let section = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            section += characters[randomIndex];
        }
        return section;
    }

    const sessionId = sections.map(generateSection).join('-');
    return sessionId;
}
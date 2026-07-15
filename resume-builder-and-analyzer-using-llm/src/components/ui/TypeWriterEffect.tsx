import { useEffect, useState } from "react";

export default function Typewriter() {
    const words = [
        "Smart AI Analyzer",
        "AI Powered",
        "Smart Resume Builder"];
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (index === words.length) return;

        const timeout = setTimeout(() => {
            const currentWord = words[index];

            if (!deleting && subIndex === currentWord.length) {
                setTimeout(() => setDeleting(true), 2000);
                return;
            }

            if (deleting && subIndex === 0) {
                setDeleting(false);
                setIndex((prev) => (prev + 1) % words.length);
                return;
            }

            setSubIndex((prev) =>
                deleting ? prev - 1 : prev + 1
            );
        }, deleting ? 50 : 150);

        return () => clearTimeout(timeout);
    }, [subIndex, deleting, index, words]);

    return (
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center w-fit mx-auto md:m-0">
            {words[index].substring(0, subIndex)}
            <span className="border-r-2 border-teal-400 animate-pulse ml-1"></span>
        </h1>
    );
}
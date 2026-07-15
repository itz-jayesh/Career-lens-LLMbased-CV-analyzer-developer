import { useEffect } from 'react';

export default function useScroll() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
};
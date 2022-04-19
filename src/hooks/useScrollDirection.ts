import { useEffect, useState } from 'react';
const useScrollDirection = (offset=0) => {
    const [scrollDirection, setScrollDirection] = useState<string | null>(null);
    const [prevOffset, setPrevOffset] = useState(0);
    const toggleScrollDirection = () => {
        const scrollY = Math.max(document.documentElement.scrollTop, window.pageYOffset, window.scrollY, document.body.scrollTop);
        if (scrollY <= offset) {
            setScrollDirection(null);
            setPrevOffset(scrollY);
            return;
        }
        if (scrollY > prevOffset) {
            setScrollDirection('down');
        } else if (scrollY < prevOffset) {
            setScrollDirection('up');
        }
        setPrevOffset(scrollY);
    };
    useEffect(() => {
        window.addEventListener('scroll', toggleScrollDirection);
        return () => {
            window.removeEventListener('scroll', toggleScrollDirection);
        };
    });
    return scrollDirection;
};

export default useScrollDirection;
import { useState, useEffect, useRef } from 'react';

const AnimatedCounter = ({ value, duration = 2000, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    // Parse numeric value from string (e.g., "+37%" -> 37)
    const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;
    const prefix = value.startsWith('+') ? '+' : '';
    const finalSuffix = suffix || value.replace(/[0-9+]/g, '');

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let start = 0;
        const end = numericValue;
        if (start === end) return;

        let startTime = null;

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = currentTime - startTime;
            const percentage = Math.min(progress / duration, 1);

            // Easing function: easeOutExpo
            const easing = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);

            setCount(Math.floor(easing * end));

            if (percentage < 1) {
                window.requestAnimationFrame(animate);
            }
        };

        window.requestAnimationFrame(animate);
    }, [isVisible, numericValue, duration]);

    return (
        <span ref={countRef}>
            {prefix}{count}{finalSuffix}
        </span>
    );
};

export default AnimatedCounter;

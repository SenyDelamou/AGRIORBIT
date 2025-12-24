import { useEffect } from 'react';

/**
 * Hook to apply 'visible' class to elements with 'reveal-on-scroll' class
 * when they enter the viewport.
 */
export const useScrollReveal = () => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: '0px 0px -50px 0px' // Trigger slightly before it hits the view
            }
        );

        const elements = document.querySelectorAll('.reveal-on-scroll');
        elements.forEach((el) => observer.observe(el));

        return () => {
            elements.forEach((el) => observer.unobserve(el));
        };
    }, []);
};

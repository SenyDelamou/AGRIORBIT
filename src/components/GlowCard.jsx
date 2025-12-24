import { useState, useRef } from 'react';

const GlowCard = ({ children, className = "" }) => {
    const cardRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });
    };

    return (
        <article
            ref={cardRef}
            className={`glow-hover ${className}`}
            onMouseMove={handleMouseMove}
            style={{
                '--mouse-x': `${mousePos.x}%`,
                '--mouse-y': `${mousePos.y}%`,
            }}
        >
            {children}
        </article>
    );
};

export default GlowCard;

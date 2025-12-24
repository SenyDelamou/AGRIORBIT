import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const MagneticButton = ({ children, className = "", strength = 30, to, onClick, ...props }) => {
    const buttonRef = useRef(null);
    const navigate = useNavigate();
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!buttonRef.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
        const x = (clientX - (left + width / 2)) / strength;
        const y = (clientY - (top + height / 2)) / strength;
        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const handleClick = (e) => {
        if (to) {
            e.preventDefault();
            navigate(to);
        }
        if (onClick) onClick(e);
    };

    return (
        <div
            className="magnetic-wrap"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
            }}
        >
            <div
                ref={buttonRef}
                className={`magnetic-content ${className}`}
                onClick={handleClick}
                style={{
                    transform: `translate3d(${position.x * 0.5}px, ${position.y * 0.5}px, 0)`,
                }}
                {...props}
            >
                {children}
            </div>
        </div>
    );
};

export default MagneticButton;

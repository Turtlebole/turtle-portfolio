import React, { useRef, useEffect } from 'react';

const HeroAnimation = ({ theme, themeObject }) => {
    return (
        <div 
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                pointerEvents: 'none',
                zIndex: 0
            }}
            aria-hidden="true"
        />
    );
};

export default HeroAnimation; 
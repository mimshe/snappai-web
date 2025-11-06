import React from 'react';

const FoodPattern = () => {
  // SVG pattern with food icons - more variety and random positioning
  const patternSvg = encodeURIComponent(`
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="foodPattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
          <!-- Pizza slice - random position -->
          <path d="M 25 20 L 45 40 L 25 40 Z" fill="none" stroke="#6b7280" stroke-width="2"/>
          <circle cx="25" cy="20" r="3.5" fill="#6b7280"/>
          
          <!-- Burger - random position -->
          <rect x="115" y="25" width="30" height="18" rx="2" fill="none" stroke="#6b7280" stroke-width="2"/>
          <line x1="115" y1="33" x2="145" y2="33" stroke="#6b7280" stroke-width="1.5"/>
          <line x1="115" y1="37" x2="145" y2="37" stroke="#6b7280" stroke-width="1.5"/>
          
          <!-- Drink - random position -->
          <rect x="35" y="115" width="18" height="25" rx="2" fill="none" stroke="#6b7280" stroke-width="2"/>
          <ellipse cx="44" cy="115" rx="9" ry="3" fill="#6b7280" opacity="0.4"/>
          
          <!-- Kebab - random position -->
          <line x1="145" y1="125" x2="145" y2="145" stroke="#6b7280" stroke-width="2.5"/>
          <circle cx="145" cy="130" r="3" fill="#6b7280"/>
          <circle cx="145" cy="135" r="3" fill="#6b7280"/>
          <circle cx="145" cy="140" r="3" fill="#6b7280"/>
          
          <!-- Rice bowl - random position -->
          <ellipse cx="75" cy="125" rx="12" ry="8" fill="none" stroke="#6b7280" stroke-width="2"/>
          <path d="M 63 125 Q 75 120 87 125" stroke="#6b7280" stroke-width="2" fill="none"/>
          
          <!-- Sandwich - random position -->
          <rect x="95" y="115" width="25" height="15" rx="2" fill="none" stroke="#6b7280" stroke-width="2"/>
          <line x1="95" y1="122" x2="120" y2="122" stroke="#6b7280" stroke-width="1.5"/>
          
          <!-- Fried Chicken -->
          <circle cx="60" cy="50" r="8" fill="none" stroke="#6b7280" stroke-width="2"/>
          <path d="M 60 42 Q 65 45 60 50 Q 55 45 60 42" stroke="#6b7280" stroke-width="1.5" fill="none"/>
          
          <!-- Sushi -->
          <ellipse cx="150" cy="80" rx="6" ry="4" fill="#6b7280" opacity="0.5"/>
          <ellipse cx="150" cy="80" rx="4" ry="2" fill="#6b7280"/>
          <line x1="150" y1="76" x2="150" y2="84" stroke="#6b7280" stroke-width="1"/>
          
          <!-- Ice Cream -->
          <path d="M 20 80 Q 20 70 30 70 Q 40 70 40 80 L 30 90 Z" fill="#6b7280" opacity="0.4"/>
          <circle cx="30" cy="70" r="3" fill="#6b7280"/>
          
          <!-- Coffee Cup -->
          <rect x="80" y="50" width="15" height="20" rx="2" fill="none" stroke="#6b7280" stroke-width="2"/>
          <ellipse cx="87.5" cy="50" rx="7.5" ry="3" fill="#6b7280" opacity="0.3"/>
          <line x1="95" y1="55" x2="100" y2="55" stroke="#6b7280" stroke-width="1.5"/>
          
          <!-- Donut -->
          <circle cx="170" cy="120" r="10" fill="none" stroke="#6b7280" stroke-width="2"/>
          <circle cx="170" cy="120" r="6" fill="none" stroke="#6b7280" stroke-width="1.5"/>
          <circle cx="175" cy="125" r="2" fill="#6b7280"/>
          
          <!-- Taco -->
          <path d="M 50 160 Q 50 150 60 150 Q 70 150 70 160" stroke="#6b7280" stroke-width="2" fill="none"/>
          <line x1="55" y1="155" x2="65" y2="155" stroke="#6b7280" stroke-width="1.5"/>
          
          <!-- Salad Bowl -->
          <ellipse cx="130" cy="170" rx="12" ry="6" fill="none" stroke="#6b7280" stroke-width="2"/>
          <path d="M 118 170 Q 130 165 142 170" stroke="#6b7280" stroke-width="2" fill="none"/>
          <circle cx="125" cy="168" r="2" fill="#6b7280"/>
          <circle cx="135" cy="168" r="2" fill="#6b7280"/>
          
          <!-- Hot Dog -->
          <ellipse cx="40" cy="75" rx="12" ry="5" fill="#6b7280" opacity="0.4"/>
          <line x1="28" y1="75" x2="52" y2="75" stroke="#6b7280" stroke-width="2"/>
          <line x1="35" y1="70" x2="45" y2="80" stroke="#6b7280" stroke-width="1.5"/>
          
          <!-- French Fries -->
          <rect x="160" y="50" width="3" height="15" rx="1" fill="#6b7280"/>
          <rect x="165" y="50" width="3" height="18" rx="1" fill="#6b7280"/>
          <rect x="170" y="50" width="3" height="16" rx="1" fill="#6b7280"/>
          <rect x="175" y="50" width="3" height="14" rx="1" fill="#6b7280"/>
          <ellipse cx="167.5" cy="50" rx="8" ry="3" fill="#6b7280" opacity="0.3"/>
          
          <!-- Ramen Bowl -->
          <ellipse cx="110" cy="160" rx="14" ry="7" fill="none" stroke="#6b7280" stroke-width="2"/>
          <path d="M 96 160 Q 110 155 124 160" stroke="#6b7280" stroke-width="2" fill="none"/>
          <line x1="105" y1="158" x2="105" y2="162" stroke="#6b7280" stroke-width="1.5"/>
          <line x1="115" y1="158" x2="115" y2="162" stroke="#6b7280" stroke-width="1.5"/>
          
          <!-- Croissant -->
          <path d="M 25 140 Q 35 130 45 140 Q 35 150 25 140" stroke="#6b7280" stroke-width="2" fill="none"/>
          <path d="M 30 135 Q 35 130 40 135" stroke="#6b7280" stroke-width="1.5" fill="none"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#foodPattern)"/>
    </svg>
  `);

  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `url("data:image/svg+xml,${patternSvg}")`,
        backgroundRepeat: 'repeat',
        opacity: 0.15,
        animation: 'float 20s ease-in-out infinite',
      }}
    />
  );
};

export default FoodPattern;

import React from 'react';
import clsx from 'clsx'; // Import clsx for merging class names

interface HorizonLayerProps {
  positionY: number; // Position from the top as a percentage (e.g., 50)
  className?: string; // Optional className prop
}

const HorizonLayer: React.FC<HorizonLayerProps> = ({ positionY, className }) => {
  return (
    <hr
      // Merge existing classes with the passed className
      className={clsx(
        "absolute left-0 right-0 border-t-2 border-dashed border-gray-400 opacity-50", // Base classes
        className // Additional classes from props
      )}
      style={{ top: `${positionY}%` }}
      aria-hidden="true" // Decorative element
    />
  );
};

export default HorizonLayer; 
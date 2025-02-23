"use client"

import React, { useEffect } from 'react';
import Isometrizer from 'isometrizer';
// Define the Mode enum
enum Mode {
  Edit = 'edit',
  View = 'view'
}

interface ViewportProps {
  mode: string;  // Will receive 'edit' or 'view' from Array.tsx
}

const Viewport: React.FC<ViewportProps> = ({ mode }) => {
  
  // Make case-insensitive comparison and handle exact string matches
  const currentMode = mode?.toLowerCase() === Mode.Edit.toLowerCase() ? Mode.Edit : Mode.View;
  
  const gridRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const iso = new Isometrizer("#isometrizer", {
      spacing: 50,
      orientation: Isometrizer.ISO_HORIZONTAL,
      // scale: 1,
      // transformOrigin: '50% 50%',
    });
    if (currentMode === Mode.Edit) {
      iso.on();
    }

    return () => {
      if (iso) {
        iso.off();
      }
    };
  }, [currentMode]);

  return (
    <main className="w-full h-full bg-black text-white flex justify-center items-center">
        {/* You can now use currentMode to conditionally render content */}
        {currentMode === Mode.Edit ? (
          <div className='absolute top-[6.5rem] left-[10rem]'>Edit Mode ({mode})</div>
        ) : (
          <div className='absolute top-[6.5rem] left-[10rem]'>View Mode ({mode})</div>
        )}
        <div ref={gridRef} id="isometrizer" className="grid grid-cols-10 gap-0">
          {Array(100).fill(null).map((_, index) => (
              <div
                key={index}
                data-color="black"
                iso-side-length="50"
                onClick={(e) => {
                  const cell = e.currentTarget;
                  const currentColor = cell.getAttribute('data-color');
                  const newColor = currentColor === 'red' ? 'white' : 'red';
                  cell.setAttribute('data-color', newColor);
                  cell.style.backgroundColor = newColor;
                }}
                className="w-8 h-8 bg-white cursor-pointer border border-gray-200"
              />
      ))}
    </div>
    </main>
  );
};

// const Grid: React.FC<{ isIsometric: boolean }> = ({ isIsometric }) => {

  // const gridRef = React.useRef<HTMLDivElement>(null);
  // const isoRef = React.useRef<Isometrizer | null>(null);

  // useEffect(() => {
  //   if (!gridRef.current) return;

  //   // Initialize isometrizer with correct parameter order
  //   isoRef.current = new Isometrizer(gridRef.current, {
  //     // angle: 30,
  //     // scale: 1,
  //     spacing: 10,
  //     orientation: Isometrizer.ISO_HORIZONTAL,
  //   });

  //   // Apply the isometric transformation
  //   if (isIsometric) {
  //     isoRef.current.on();
  //   }

  //   // Cleanup on unmount
  //   return () => {
  //     if (isoRef.current) {
  //       isoRef.current.off();
  //     }
  //   };
  // }, []);
  
  // useEffect(() => {
  //   if (!isoRef.current) return;
    
  //   if (isIsometric) {
  //     isoRef.current.on();
  //   } else {
  //     isoRef.current.off();
  //   }
  // }, [isIsometric]); // Ensure the effect runs when isIsometric updates
  
  
//   return (

//   );
// };

export default Viewport;

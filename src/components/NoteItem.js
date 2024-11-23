import React, { useState, useEffect } from 'react';
import { SiPinboard } from "react-icons/si";
import { Delete } from 'lucide-react';

const NoteItem = ({ note, onSelectNote, onTogglePin, onDelete, isHovered, setHovered }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    // Update `isSmallScreen` on window resize
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className="m-4 bg-gray-800 border border-gray-700 p-4 rounded-lg cursor-pointer relative hover:bg-gray-700"
      onClick={() => onSelectNote(note)}
      onMouseEnter={() => setHovered(note.id)}
      onMouseLeave={() => setHovered(null)}
    >
      {/* Pin Icon: Render only if the note is pinned */}
      {note.isPinned && (
        <span
          className="absolute top-2 left-2 cursor-pointer text-gray-400"
          onClick={(e) => {
            e.stopPropagation();
            onTogglePin(note);
          }}
        >
          <SiPinboard />
        </span>
      )}

      {/* Note Content */}
      <div className='mx-3'>
        <h2 className="text-lg font-semibold">{note.title}</h2>
        <p className="text-sm text-gray-400">
          {note.description.length > 70
            ? `${note.description.slice(0, 40)}...`
            : note.description}
        </p>
      </div>

      {/* Delete Button: Always visible on small screens, hover-based on larger screens */}
      {(isSmallScreen || isHovered) && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(note.id);
          }}
          className="absolute top-2 right-2 text-red-300 hover:text-red-500"
        >
          <Delete />
        </button>
      )}
    </div>
  );
};

export default NoteItem;

import React from 'react';
import { SiPinboard } from "react-icons/si";
import { Delete } from 'lucide-react';

const NoteItem = ({ note, onSelectNote, onTogglePin, onDelete, isHovered, setHovered }) => {
  return (
    <div
      className="m-4 bg-gray-800 border border-gray-700 p-4 rounded-lg cursor-pointer relative hover:bg-gray-700"
      onClick={() => onSelectNote(note)}
      onMouseEnter={() => setHovered(note.id)}
      onMouseLeave={() => setHovered(null)}
    >
      {note.isPinned && (
        <span 
          className={`absolute top-2 left-2 cursor-pointer ${note.isPinned ? 'text-gray-400' : null}`}
          onClick={(e) => {
            e.stopPropagation();
            onTogglePin(note);
          }}
        >
          <SiPinboard />
        </span>
      )}
      <div className='mx-3'>
        <h2 className="text-lg font-semibold">{note.title}</h2>
        <p className="text-sm text-gray-400">
          {note.description.length > 70
            ? `${note.description.slice(0, 70)}...`
            : note.description}
        </p>
      </div>
      {isHovered && (
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

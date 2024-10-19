import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNotes, selectAllNotes, deleteNote, updateNote } from '../redux/noteSlice';
import { MdDelete } from "react-icons/md";
import { StickyNote, Delete } from 'lucide-react';
import { SiPinboard } from "react-icons/si";
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications
import DeleteModal from './utils/Modal/Modal';

const NoteList = ({ searchTerm, shouldRefetch, onSelectNote }) => {
    const dispatch = useDispatch();
    const [hoveredNoteId, setHoveredNoteId] = useState(null); // Track hovered note by ID
    const notes = useSelector(selectAllNotes);
    const [isModalOpen, setModalOpen] = useState(false);
    const [noteToDelete, setNoteToDelete] = useState(null); // Track the note to delete

    const handleDeleteClick = (noteId) => {
        setNoteToDelete(noteId); // Set the note ID to delete
        setModalOpen(true); // Open the modal
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setNoteToDelete(null); // Reset note to delete
    };

    const handleConfirmDelete = () => {
        if (noteToDelete) {
            dispatch(deleteNote(noteToDelete)); // Dispatch delete action
            toast.success("Note deleted successfully!"); // Show success toast
        }
        handleCloseModal(); // Close the modal after confirming deletion
    };

    useEffect(() => {
        dispatch(fetchNotes());
    }, [dispatch, shouldRefetch]);

    const filteredNotes = notes
        .filter(note =>
            note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .sort((a, b) => {
            if (a.isPinned && b.isPinned) {
                return new Date(b.pinnedAt) - new Date(a.pinnedAt); // Sort by pinned date if both are pinned
            }
            return a.isPinned ? -1 : 1; // Pinned notes first
        });

    const handleTogglePin = (note) => {
        const updatedNote = {
            ...note,
            isPinned: !note.isPinned, // Toggle pinned status
        };
        dispatch(updateNote({ id: note.id, note: updatedNote })); // Dispatch update action
        const message = updatedNote.isPinned ? "Note pinned!" : "Note unpinned!"; // Message based on pinned status
        toast.success(message); // Show success toast
    };

    if (notes.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <StickyNote className="w-16 h-16 text-gray-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-300 mb-2">No notes yet</h3>
                <p className="text-gray-400">Create your first note by filling out the form on the right.</p>
            </div>
        );
    }

    return (
        <div className="flex-grow overflow-hidden">
            {filteredNotes.length === 0 ? (
                <p className="text-gray-400 p-4">No notes found</p>
            ) : (
                filteredNotes.map(note => (
                    <div
                        key={note.id}
                        className="m-4 bg-gray-800 border border-gray-700 p-4 rounded-lg cursor-pointer relative hover:bg-gray-700 "
                        onClick={() => onSelectNote(note)}
                        onMouseEnter={() => setHoveredNoteId(note.id)} // Set hovered note ID
                        onMouseLeave={() => setHoveredNoteId(null)} // Clear hovered note ID
                    >
                        {note.isPinned && (
                            <span 
                                className={`absolute top-2 left-2 cursor-pointer ${note.isPinned ? 'text-gray-400' : null}`}
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent triggering onSelectNote
                                    handleTogglePin(note); // Toggle pinned status
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
                        
                        {hoveredNoteId === note.id && (
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent triggering onSelectNote
                                    handleDeleteClick(note.id); // Open delete modal with note ID
                                }} 
                                className="absolute top-2 right-2 text-red-300 hover:text-red-500"
                            >
                                <Delete />
                            </button>
                        )}
                    </div>
                ))
            )}
            <DeleteModal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                onConfirm={handleConfirmDelete} 
            />
            <ToastContainer /> {/* ToastContainer for displaying notifications */}
        </div>
    );
};

export default NoteList;

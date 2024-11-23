import React, { useEffect, useState } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { fetchNotes, selectAllNotes, deleteNote, updateNote } from '../redux/noteSlice';
// import { ToastContainer, toast } from 'react-toastify'; 
// import 'react-toastify/dist/ReactToastify.css'; 
import { StickyNote } from 'lucide-react';
import DeleteModal from './utils/Modal/Modal';
import SyncLoader from 'react-spinners/SyncLoader';
import NoteItem from './NoteItem';  // Importing new component

const NoteList = ({ searchTerm, shouldRefetch, onSelectNote }) => {
  const dispatch = useDispatch();
  const [hoveredNoteId, setHoveredNoteId] = useState(null);
  const notes = useSelector(selectAllNotes);
  const status = useSelector((state) => state.notes.status);
  const [isModalOpen, setModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  const handleDeleteClick = (noteId) => {
    setNoteToDelete(noteId); 
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setNoteToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (noteToDelete) {
      dispatch(deleteNote(noteToDelete)); 
      // toast.success("Note deleted successfully!"); 
    }
    handleCloseModal(); 
  };

  const handleTogglePin = (note) => {
    const updatedNote = { ...note, isPinned: !note.isPinned };
    dispatch(updateNote({ id: note.id, note: updatedNote }));
    // const message = updatedNote.isPinned ? "Note pinned!" : "Note unpinned!";
    // toast.success(message);
  };

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch, shouldRefetch]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearchTerm(searchTerm), 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    note.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
  ).sort((a, b) => (a.isPinned && b.isPinned ? new Date(b.pinnedAt) - new Date(a.pinnedAt) : a.isPinned ? -1 : 1));

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-full">
        <SyncLoader color="#36d7b7" size={15} />&nbsp;&nbsp;<span>Loading</span>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <StickyNote className="w-16 h-16 text-gray-600 mb-4" />
        <h3 className="text-xl font-semibold text-gray-300 mb-2">No notes yet</h3>
        <p className="text-gray-400">Create a note !!</p>
      </div>
    );
}

  return (
    <div className="flex-grow overflow-hidden">
      {filteredNotes.length === 0 ? (
        <p className="text-gray-400 p-4">No notes found</p>
      ) : (
        filteredNotes.map(note => (
          <NoteItem
            key={note.id}
            note={note}
            onSelectNote={onSelectNote}
            onTogglePin={handleTogglePin}
            onDelete={handleDeleteClick}
            isHovered={hoveredNoteId === note.id}
            setHovered={setHoveredNoteId}
          />
        ))
      )}
      <DeleteModal isOpen={isModalOpen} onClose={handleCloseModal} onConfirm={handleConfirmDelete} />
      {/* <ToastContainer /> */}
    </div>
  );
};

export default NoteList;


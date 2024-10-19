// import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { addNote, updateNote } from '../redux/noteSlice';
// import { useAuth } from './useAuth';

// export const useNoteForm = (selectedNote, onNoteCreated) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [tags, setTags] = useState('');
//   const [isPinned, setIsPinned] = useState(false);
//   const [imageUrls, setImageUrls] = useState([]);
//   const dispatch = useDispatch();
//   const user = useAuth();

//   useEffect(() => {
//     if (selectedNote) {
//       setTitle(selectedNote.title);
//       setDescription(selectedNote.description);
//       setTags(selectedNote.tags.join(', '));
//       setIsPinned(selectedNote.isPinned);
//       setImageUrls(selectedNote.imageUrls || []);
//     } else {
//       resetForm();
//     }
//   }, [selectedNote]);

//   const resetForm = () => {
//     setTitle('');
//     setDescription('');
//     setTags('');
//     setIsPinned(false);
//     setImageUrls([]);
//   };

//   const saveNote = async (uploadedImageUrls) => {
//     const noteData = {
//       title,
//       description,
//       tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
//       isPinned,
//       userId: user.uid,
//       imageUrls: [...imageUrls, ...uploadedImageUrls],
//     };

//     if (selectedNote) {
//       await dispatch(updateNote({ id: selectedNote.id, note: noteData }));
//     } else {
//       await dispatch(addNote(noteData));
//     }
    
//     onNoteCreated();  // Callback to inform the parent component that a note has been created or updated
//     resetForm();  // Reset form fields after saving
//   };

//   return {
//     title,
//     setTitle,
//     description,
//     setDescription,
//     tags,
//     setTags,
//     isPinned,
//     setIsPinned,
//     imageUrls,
//     saveNote,
//     resetForm
//   };
// };

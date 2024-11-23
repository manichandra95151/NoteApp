import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addNote, updateNote } from '../redux/noteSlice';
import { storage } from '../firebase/firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { useAuth } from '../hooks/useAuth';
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

import NoteForm from './NoteForm';
import TagInput from './TagInput';
import PinNote from './PinNote';
import ImageUpload from './ImageUploader';


const NoteEditor = React.memo(({ onNoteCreated, selectedNote }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [tags, setTags] = useState('');
    const [isPinned, setIsPinned] = useState(false);
    const [alert, setAlert] = useState(null); 
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const user = useAuth();

    useEffect(() => {
        if (selectedNote) {
            setTitle(selectedNote.title);
            setDescription(selectedNote.description);
            setTags(selectedNote.tags.join(', '));
            setIsPinned(selectedNote.isPinned);
            setImageUrls(selectedNote.imageUrls || []);
            setImages([]);
        } else {
            resetForm();
        }
    }, [selectedNote]);

    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => {
                setAlert(null); // Clear alert after 3 seconds
            }, 2000);
            return () => clearTimeout(timer); // Cleanup on unmount or alert change
        }
    }, [alert]);

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setTags('');
        setImages([]);
        setImageUrls([]);
        setIsPinned(false);
    };

    const handleSaveNote = async () => {
        setLoading(true);
        if (!title.trim() || !description.trim() || !tags.trim()) {
            setAlert({ type: 'error', message: 'Fill in all required fields.' });
            setLoading(false);
            return;
        }
        const uploadedImageUrls = await uploadImages(images);
        const noteData = {
            title,
            description,
            tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
            isPinned,
            userId: user.uid,
            imageUrls: [...imageUrls, ...uploadedImageUrls],
        };

        try {
            if (selectedNote) {
                await dispatch(updateNote({ id: selectedNote.id, note: noteData }));
                setAlert({ type: 'success', message: 'Note updated successfully!' });
            } else {
                await dispatch(addNote(noteData));
                setAlert({ type: 'success', message: 'Note saved successfully!' });
            }
            onNoteCreated();
            resetForm();
        } catch (error) {
            setAlert({ type: 'error', message: 'Failed to save note. Try again.' });
        } finally {
            setLoading(false);
        }
    };

    const uploadImages = async (images) => {
        const uploadPromises = images.map((image) => {
            const storageRef = ref(storage, `notes/${user.uid}/${image.name}`);
            return uploadBytes(storageRef, image).then(() => getDownloadURL(storageRef));
        });
        return await Promise.all(uploadPromises);
    };

    const handleRemoveImage = async (index) => {
        if (index < images.length) {
            setImages(prevImages => prevImages.filter((_, i) => i !== index));
        } else {
            const existingIndex = index - images.length;
            const imageUrlToDelete = imageUrls[existingIndex];
            const imageRef = ref(storage, imageUrlToDelete);
            try {
                await deleteObject(imageRef);
                const updatedImageUrls = imageUrls.filter((_, i) => i !== existingIndex);
                setImageUrls(updatedImageUrls);
                await updateNoteInDatabase(updatedImageUrls);
            } catch (error) {
                setAlert({ type: 'error', message: 'Error deleting image.' });
            }
        }
    };

    const updateNoteInDatabase = async (updatedImageUrls) => {
        if (selectedNote) {
            const noteData = {
                title,
                description,
                tags: tags.split(',').map(tag => tag.trim()),
                isPinned,
                userId: user.uid,
                imageUrls: updatedImageUrls,
            };
            await dispatch(updateNote({ id: selectedNote.id, note: noteData }));
            setAlert({ type: 'success', message: 'Note updated successfully!' });
        }
    };

    return (
        <div className="nmax-h-[680px] overflow-y-auto space-y-6 p-4 bg-gray-800 rounded-md">
            {alert && (
                <div
                    className={`p-2 rounded text-center text-sm ${
                        alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                    } text-white`}
                >
                    {alert.message}
                </div>
            )}
            {loading ? ( // Loader displayed when loading
                <div className="flex justify-center items-center h-full">
                    <ClipLoader size={50} color="#ffffff" />&nbsp;&nbsp;<span>Loading</span>
                </div>
            ):(
                <>
                <NoteForm title={title} setTitle={setTitle} description={description} setDescription={setDescription} />
            <TagInput tags={tags} setTags={setTags} />
            <PinNote isPinned={isPinned} setIsPinned={setIsPinned} />
            <ImageUpload images={images} imageUrls={imageUrls} handleImageUpload={e => setImages([...images, ...Array.from(e.target.files)])} handleRemoveImage={handleRemoveImage} />
            <div className="flex justify-between items-center">
                <button
                    onClick={handleSaveNote}
                    className={`w-full border border-stone-100 hover:bg-gray-900 active:bg-gray-900 py-2 rounded-md transition-colors duration-300 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                      {selectedNote ? (loading ? "Updating..." : "Update Note") : (loading ? "Saving..." : "Save Note")}
                </button>
            </div>
            </>
            ) }
            
        </div>
    );
});

export default NoteEditor;

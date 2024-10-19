import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addNote, updateNote } from '../redux/noteSlice';
import {  storage } from '../firebase/firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { ImagePlus, Tag, X, } from 'lucide-react'
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css';

const NoteEditor = React.memo(({ onNoteCreated, selectedNote }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [tags, setTags] = useState('');
    const [isPinned, setIsPinned] = useState(false);
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

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setTags('');
        setImages([]);
        setImageUrls([]);
        setIsPinned(false);
    };

    const handleSaveNote = async () => {
        setLoading(true); // Start loading

        // Validation checks
        if (!title.trim() || !description.trim() || !tags.trim()) {
            toast.error("Please fill in the title, description, and at least one tag.");
            setLoading(false); // End loading
            return; // Stop the function execution
        }

        // Upload images and create note data
        const uploadedImageUrls = await uploadImages(images);
        const noteData = {
            title,
            description,
            tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag), // Filter out empty tags
            isPinned,
            userId: user.uid,
            imageUrls: [...imageUrls, ...uploadedImageUrls], // Combine existing and new URLs
        };

        try {
            if (selectedNote) {
                await dispatch(updateNote({ id: selectedNote.id, note: noteData }));
                toast.success("Note Updated!");
            } else {
                await dispatch(addNote(noteData));
                toast.success("Note Saved!");
            }
            onNoteCreated();
            resetForm();
            
        } catch (error) {
            console.error('Error saving note:', error);
            toast.error("Failed to save note. Please try again.");
        } finally {
            setLoading(false); // End loading
        }
    };


    const uploadImages = async (images) => {
        const uploadPromises = images.map((image) => {
            const storageRef = ref(storage, `notes/${user.uid}/${image.name}`);
            return uploadBytes(storageRef, image).then(() => getDownloadURL(storageRef));
        });
        return await Promise.all(uploadPromises);
    };

    const handleImageUpload = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setImages(prevImages => [...prevImages, ...selectedFiles]);
    };

    const handleRemoveImage = async (index) => {
        if (index < images.length) {
            // Remove from new images
            setImages(prevImages => prevImages.filter((_, i) => i !== index));
        } else {
            const existingIndex = index - images.length;
            const imageUrlToDelete = imageUrls[existingIndex];
            const imageRef = ref(storage, imageUrlToDelete);
            try {
                await deleteObject(imageRef);
                console.log('Image deleted successfully from storage');
                const updatedImageUrls = imageUrls.filter((_, i) => i !== existingIndex);
                setImageUrls(updatedImageUrls);
                await updateNoteInDatabase(updatedImageUrls);
            } catch (error) {
                toast.error('Error deleting image from storage:', error);
                console.error('Error deleting image from storage:', error);
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
            toast.success("Note updated successfully with new image URLs!");
            // alert('Note updated successfully with new image URLs!');
        }
    };


    return (
        <div className="nmax-h-[680px] overflow-y-auto space-y-6 p-4 bg-gray-800 rounded-md">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note Title"
                className="bg-gray-700 border-gray-600 text-gray-100 w-full py-2 px-3 rounded-md"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Note Description"
                className="bg-gray-700 border-gray-600 text-gray-100 w-full py-2 px-3 rounded-md"
                rows="4"

            />
            
            <div>

                <div className="flex items-center space-x-2 mb-2">
                <Tag size={20} className="text-gray-400" />
                <span className="text-gray-300">Tags</span>
              </div>
                <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Tags (comma separated)"
                    className="bg-gray-700 border-gray-600 text-gray-100 w-full py-2 px-3 rounded-md"
                />
            </div>
            <label className="flex items-center mb-2">
                <input
                    type="checkbox"
                    checked={isPinned}
                    onChange={(e) => setIsPinned(e.target.checked)}
                    className="mr-2"
                />
                Pin Note
            </label>



            <div>
                <label htmlFor="image-upload" className="cursor-pointer text-gray-300 hover:text-gray-100">
                    <div className="flex items-center space-x-2">
                        <span><ImagePlus size={20} /></span>
                        <span>Upload Images</span>
                        <input
                             id="image-upload"
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </div>
                </label>
                <div className="image-preview flex flex-wrap mb-2">
                    {images.map((image, index) => (
                        <div key={index} className="relative mr-2 mb-2">
                            <img src={URL.createObjectURL(image)} alt={`preview ${index}`} className="w-20 h-20 object-cover rounded-md" />
                            <button
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                            >
                                 <X size={14} />
                            </button>
                        </div>
                    ))}
                    {imageUrls.map((imageUrl, index) => (
                        <div key={index + images.length} className="relative mr-2 mb-2">
                            <img src={imageUrl} alt={`existing ${index}`} className="w-20 h-20 object-cover rounded-md" />
                            <button
                                onClick={() => handleRemoveImage(index + images.length)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                            >
                                 <X size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <button
    onClick={handleSaveNote}
    className={`w-full border border-stone-100 hover:bg-gray-900 active:bg-gray-900 py-2 rounded-md transition-colors duration-300 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    disabled={loading}
>
    {selectedNote ? (loading ? "Updating..." : "Update Note") : (loading ? "Saving..." : "Save Note")}
</button>

        </div>
    );
});

export default NoteEditor;

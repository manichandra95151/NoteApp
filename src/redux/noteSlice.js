import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase/firebase';
import { collection, addDoc, updateDoc, query, where, getDocs, doc,deleteDoc } from 'firebase/firestore'; // Ensure doc is imported
import { auth } from '../firebase/firebase';

// Fetch notes for the logged-in user
export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
    const user = auth.currentUser;
    if (user) {
        const notesCollection = query(collection(db, 'notes'), where('userId', '==', user.uid));
        const snapshot = await getDocs(notesCollection);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    return [];
});

// Add a new note
export const addNote = createAsyncThunk('notes/addNote', async (note) => {
    const noteData = {
        ...note,
        pinnedAt: note.isPinned ? new Date().toISOString() : null, // Save timestamp if pinned
    };
    const docRef = await addDoc(collection(db, 'notes'), noteData);
    return { id: docRef.id, ...noteData };
});

// Update an existing note
export const updateNote = createAsyncThunk(
    'notes/updateNote',
    async ({ id, note }) => {
        const noteData = {
            ...note,
            pinnedAt: note.isPinned ? new Date().toISOString() : null, // Update timestamp if pinned
        };
        const noteRef = doc(db, 'notes', id);
        await updateDoc(noteRef, noteData);
        return { id, note: noteData };
    }
);

export const deleteNote = createAsyncThunk('notes/deleteNote', async (id) => {
    const noteRef = doc(db, 'notes', id); // Get document reference
    await deleteDoc(noteRef); // Delete the document
    return id; // Return the id of the deleted note
});

// Create notes slice
const notesSlice = createSlice({
    name: 'notes',
    initialState: {
        notes: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotes.pending, (state) => {
                state.status = 'loading'; // Set status to loading when fetch starts
            })
            .addCase(fetchNotes.fulfilled, (state, action) => {
                state.notes = action.payload;
                state.status = 'succeeded'; // Set status to succeeded when fetch is done
            })
            .addCase(fetchNotes.rejected, (state) => {
                state.status = 'failed'; // Set status to failed in case of an error
            })
            .addCase(addNote.fulfilled, (state, action) => {
                state.notes.push(action.payload);
            })
            .addCase(updateNote.fulfilled, (state, action) => {
                const index = state.notes.findIndex(note => note.id === action.payload.id);
                if (index !== -1) {
                    state.notes[index] = { ...state.notes[index], ...action.payload.note };
                }
            })
            .addCase(deleteNote.fulfilled, (state, action) => {
                state.notes = state.notes.filter(note => note.id !== action.payload);
            });
    }
    
});
export const selectAllNotes = (state) => state.notes.notes; // Selector for all notes

export default notesSlice.reducer; // Export reducer


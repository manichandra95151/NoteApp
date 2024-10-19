import React, { useState } from 'react';
import NoteList from '../components/NoteList';
import NoteEditor from '../components/NoteEditor';
import Navbar from '../components/Navbar';
import { FaSearch } from "react-icons/fa";

const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [shouldRefetchNotes, setShouldRefetchNotes] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null); // State for selected note

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleNoteCreated = () => {
        setShouldRefetchNotes((prev) => !prev); // Toggle the refetch trigger
    };

    const handleSelectNote = (note) => {
        setSelectedNote(note); // Set the selected note for editing
    };

    const handleNewNote = () => {
        setSelectedNote(null); // Reset selected note when creating a new note
    };

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-gray-100"> {/* h-screen for full screen */}
            <Navbar onNewNote={handleNewNote} /> {/* Navbar remains fixed at the top */}
            <div className="flex flex-grow overflow-hidden"> {/* Ensure the main content section does not overflow */}
                {/* Sidebar (NoteList) */}
                <div className="w-1/3 border-r border-gray-700 flex flex-col">
                    <div className="p-4 border-b border-gray-700">
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"><FaSearch/></span>
                            <input
                                type="text"
                                placeholder="Search notes..."
                                className="pl-10 bg-gray-800 border-gray-700 text-gray-100 w-full py-2 px-3 rounded-md"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>
                    <div className="flex-grow overflow-y-auto"> {/* Allow scrolling within the NoteList */}
                        <NoteList searchTerm={searchTerm} shouldRefetch={shouldRefetchNotes} onSelectNote={handleSelectNote} />
                    </div>
                </div>
                {/* Main Content (NoteEditor) */}
                <div className="flex-grow p-6 bg-gray-800 overflow-y-auto"> {/* Allow scrolling within the NoteEditor */}
                    <h2 className="text-2xl font-bold mb-6">{selectedNote?"Update Note":"Create Note"}</h2>
                    <NoteEditor onNoteCreated={handleNoteCreated} selectedNote={selectedNote} />
                </div>
            </div>
        </div>
    );
    
};

export default Dashboard;

import React from 'react';

const NoteForm = ({ title, setTitle, description, setDescription }) => {
    return (
        <>
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
        </>
    );
};

export default NoteForm;

import React from 'react';

const PinNote = ({ isPinned, setIsPinned }) => {
    return (
        <label className="flex items-center mb-2">
            <input
                type="checkbox"
                checked={isPinned}
                onChange={(e) => setIsPinned(e.target.checked)}
                className="mr-2"
            />
            Pin Note
        </label>
    );
};

export default PinNote;

import React from 'react';
import { Tag } from 'lucide-react';

const TagInput = ({ tags, setTags }) => {
    return (
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
    );
};

export default TagInput;

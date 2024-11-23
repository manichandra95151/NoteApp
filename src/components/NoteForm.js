import React, { useState } from "react";

const NoteForm = ({ title, setTitle, description, setDescription }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempDescription, setTempDescription] = useState(description);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setTempDescription(description);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTempDescription(description);
  };

  const handleSave = () => {
    setDescription(tempDescription);
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Title Input */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note Title"
        className="bg-gray-700 border-gray-600 text-gray-100 w-full py-2 px-3 rounded-md"
      />

      {/* Description Textarea */}
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Note Description"
        className="bg-gray-700 border-gray-600 text-gray-100 w-full py-2 px-3 rounded-md"
        rows="4"
        onClick={handleOpenModal} // Open modal on click
        readOnly // Prevent editing directly in the small textarea
      />

      {/* Modal for Expanded Description */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          style={{ margin: 0, padding: 0 }} // Ensure no margins/padding are applied
        >
          {/* Modal Content */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-3/4 md:w-1/2">
            <textarea
              value={tempDescription}
              onChange={(e) => setTempDescription(e.target.value)}
              placeholder="Note Description"
              className="bg-gray-700 border-gray-600 text-gray-100 w-full py-2 px-3 rounded-md resize-none overflow-hidden"
              rows="6"
              autoFocus // Automatically focus when the modal opens
              style={{ height: "auto" }} // For dynamic height
            />
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={handleSave}
                className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Save
              </button>
              <button
                onClick={handleCloseModal}
                className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NoteForm;

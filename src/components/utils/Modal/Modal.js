import React from 'react';

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={onClose} // Close the modal when clicking outside
        >
            <div
                className="relative p-4 w-11/12 max-w-sm sm:max-w-md bg-white rounded-lg shadow-lg border border-gray-300 dark:bg-gray-800"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                >
                    &times;
                </button>

                {/* Icon */}
                <svg
                    className="text-gray-400 dark:text-gray-500 w-12 h-12 mb-4 mx-auto"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                    ></path>
                </svg>

                {/* Message */}
                <p className="mb-4 text-center text-gray-600 dark:text-gray-300">
                    Are you sure you want to delete this Note?
                </p>

                {/* Buttons */}
                <div className="flex justify-center gap-4 mt-4">
                    <button
                        onClick={onClose}
                        className="py-2 px-4 text-sm font-medium text-gray-600 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        No, cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="py-2 px-4 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                    >
                        Yes, I'm sure
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;

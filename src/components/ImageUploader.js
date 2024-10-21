import React from 'react';
import { ImagePlus, X } from 'lucide-react';

const ImageUpload = ({ images, imageUrls, handleImageUpload, handleRemoveImage }) => {
    return (
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
    );
};

export default ImageUpload;

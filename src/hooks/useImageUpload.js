// import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
// import { storage } from '../firebase/firebase';
// import { useAuth } from './useAuth';

// export const useImageUpload = () => {
//   const user = useAuth();

//   const uploadImages = async (images) => {
//     const uploadPromises = images.map((image) => {
//       const storageRef = ref(storage, `notes/${user.uid}/${image.name}`);
//       return uploadBytes(storageRef, image).then(() => getDownloadURL(storageRef));
//     });
    
//     try {
//       return await Promise.all(uploadPromises);
//     } catch (error) {
//       console.error('Error uploading images:', error);
//       throw error;  // Rethrow error to handle it in the calling function
//     }
//   };

//   const deleteImage = async (imageUrl) => {
//     const imageRef = ref(storage, imageUrl);
//     try {
//       await deleteObject(imageRef);
//       console.log('Image deleted successfully from storage');
//     } catch (error) {
//       console.error('Error deleting image from storage:', error);
//     }
//   };

//   return { uploadImages, deleteImage };
// };

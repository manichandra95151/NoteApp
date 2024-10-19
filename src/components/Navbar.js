import React from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { LogOut,NotebookPen } from 'lucide-react';
import { auth } from '../firebase/firebase'; // Import your Firebase auth
import { useAuth } from '../hooks/useAuth'; // Import the useAuth hook
import { toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css';


export default function Navbar({ onNewNote }) {
  const user = useAuth(); // Use the useAuth hook to get the current user
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('logged out!');
      navigate('/login');
    } catch (error) {
        toast.error(error.message);
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-800 border-b border-gray-700">
      <div className="flex items-center space-x-2">
        <NotebookPen/>
        <span className="text-xl font-bold">NoteApp</span>
      </div>
      {user ? (
        <>
          <button onClick={onNewNote} className="text-gray-300 hover:text-white">
            Create New Note
          </button>
          <button onClick={handleLogout} className="flex items-center text-gray-300 hover:text-white">
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </>
      ) : null}
    </nav>
  );
}


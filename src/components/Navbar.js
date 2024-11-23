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
  <nav className="flex flex-wrap items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
  {/* Logo Section */}
  <div className="flex items-center space-x-2">
    <NotebookPen />
    <span className="text-lg font-bold truncate">NoteApp</span>
  </div>

  {/* User Actions */}
  {user && (
    <div className="flex flex-wrap items-center space-x-4 mt-2 md:mt-0">
      {/* Create New Note Button */}
      <button
        onClick={onNewNote}
        className="text-gray-300 hover:text-white py-1 px-3 rounded-md bg-gray-700"
      >
        Create New Note
      </button>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center text-gray-300 hover:text-white py-1 px-3 rounded-md bg-gray-700"
      >
        <LogOut className="w-5 h-5 mr-2" />
        Logout
      </button>
    </div>
  )}
</nav>
  );
}


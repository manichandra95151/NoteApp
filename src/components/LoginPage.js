

import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Use the useAuth hook
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import { FcGoogle } from 'react-icons/fc'
import { NotebookPen } from 'lucide-react';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const user = useAuth(); // Get the current user

  // Redirect to home if the user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success('Logged in successfully!'); // Success message
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success('Account created successfully!'); // Success message
      }
      navigate('/'); // Redirect to home page after login/signup
    } catch (error) {
      console.error(error.message);
      toast.error(error.message); // Error message
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      toast.success('Logged in with Google successfully!'); // Success message
      navigate('/'); // Redirect to home page after Google login
    } catch (error) {
      console.error(error.message);
      toast.error(error.message); // Error message
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
        <ToastContainer /> {/* Include ToastContainer for displaying notifications */}
        <div className="w-full max-w-md bg-gray-800 border-gray-700 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-center flex items-center justify-center">
    {isLogin ? (
        <>
            Login to <span className="flex items-center ml-1"><NotebookPen /></span> NoteApp
        </>
    ) : (
        'Create an Account'
    )}
</h2>
            <p className="text-center text-gray-400 mb-4">
                {isLogin
                    ? 'Enter your email and password to access your account'
                    : 'Sign up to start creating and managing your notes'}
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-gray-200">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="m@example.com"
                        required
                        className="w-full bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500 rounded-md p-2"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="password" className="block text-gray-200">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500 rounded-md p-2"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded"
                >
                    {isLogin ? 'Login' : 'Sign Up'}
                </button>
            </form>
            <div className="mt-4 relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-600" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-gray-800 px-2 text-gray-400">
                        Or continue with
                    </span>
                </div>
            </div>
            <button
                type="button"
                className="w-full mt-4 bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600 flex items-center justify-center py-2 rounded"
                onClick={handleGoogleLogin}
            >
                <FcGoogle className="mr-2 h-4 w-4" />
                Google
            </button>
            <div className="mt-4">
                <button
                    className="w-full text-gray-300 hover:text-gray-100 text-left"
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin
                        ? "Don't have an account? Sign Up"
                        : 'Already have an account? Login'}
                </button>
            </div>
        </div>
    </div>
);

};

export default LoginPage;

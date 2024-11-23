import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FcGoogle } from 'react-icons/fc';
import { NotebookPen } from 'lucide-react';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(null); // Alert state
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const user = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Auto-dismiss alert after 3 seconds
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [alert]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        setAlert({ type: 'success', message: 'Logged in successfully!' });
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        setAlert({ type: 'success', message: 'Account created successfully!' });
      }
      navigate('/');
    } catch (error) {
      console.error(error.message);
      setAlert({ type: 'error', message: error.message });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      setAlert({ type: 'success', message: 'Logged in with Google successfully!' });
      navigate('/');
    } catch (error) {
      console.error(error.message);
      setAlert({ type: 'error', message: error.message });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm bg-gray-800 border-gray-700 rounded-lg shadow-md p-6">
        {/* Alert Section */}
        {alert && (
          <div
            className={`p-2 rounded text-center text-sm ${
              alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            } text-white mb-4`}
          >
            {alert.message}
          </div>
        )}

        <h2 className="text-xl sm:text-2xl font-bold text-center flex items-center justify-center">
          {isLogin ? (
            <>
              Login to <span className="flex items-center ml-1"><NotebookPen /></span> NoteApp
            </>
          ) : (
            'Create an Account'
          )}
        </h2>
        <p className="text-center text-gray-400 text-sm sm:text-base mb-4">
          {isLogin
            ? 'Enter your email and password to access your account'
            : 'Sign up to start creating and managing your notes'}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-200 text-sm sm:text-base">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="m@example.com"
              required
              className="w-full bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500 rounded-md p-2 text-sm sm:text-base"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-200 text-sm sm:text-base">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500 rounded-md p-2 text-sm sm:text-base"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded text-sm sm:text-base"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-4 relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-600" />
          </div>
          <div className="relative flex justify-center text-xs sm:text-sm uppercase">
            <span className="bg-gray-800 px-2 text-gray-400">Or continue with</span>
          </div>
        </div>
        <button
          type="button"
          className="w-full mt-4 bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600 flex items-center justify-center py-2 rounded text-sm sm:text-base"
          onClick={handleGoogleLogin}
        >
          <FcGoogle className="mr-2 h-4 w-4" />
          Google
        </button>
        <div className="mt-4">
          <button
            className="w-full text-gray-300 hover:text-gray-100 text-left text-sm sm:text-base"
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

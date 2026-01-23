import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { User, LogOut } from 'lucide-react';
import { useLogoutMutation } from '../redux/slices/api/authApiSlice';
import { logout } from '../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Login from '../pages/Login';


function UserAvatar() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const dispatch = useDispatch()
    const [logoutUser] = useLogoutMutation();
    const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfile = () => {
  
  };

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout())
      navigate("Login")
      
     } catch (error) {
      console.log(error)
     }
  };

 
  return (
    <div className="flex ">
      <div className="relative" ref={dropdownRef}>
        {/* Avatar Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg hover:shadow-lg transition-shadow duration-200 focus:outline-none"
        >
          JD
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-10 border border-gray-200">
            <button
              onClick={handleProfile}
              className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-100 transition-colors duration-150"
            >
              <User size={18} className="text-gray-600" />
              <span className="text-gray-700">Profile</span>
            </button>
            
            <div className="border-t border-gray-200 my-1"></div>
            
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-100 transition-colors duration-150"
            >
              <LogOut size={18} className="text-gray-600" />
              <span className="text-gray-700">Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


export default UserAvatar

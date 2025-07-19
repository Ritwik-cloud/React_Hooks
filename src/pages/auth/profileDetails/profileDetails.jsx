import React, { useState, useRef, useEffect } from 'react';
import { LogOut, ChevronDown } from 'lucide-react';
import { profile_pic } from '../../../api/axios/axios';

const Profile = ({ name, profileImg , logOut, email }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);



  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        aria-expanded={isProfileOpen}
        aria-haspopup="true"
      >
        <img
          src={profile_pic(profileImg)}
          alt={name}
          className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover"
        />
        <span className="hidden sm:block text-sm font-medium text-emerald-500 dark:text-gray-300 max-w-24 lg:max-w-32 truncate">
          {name}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      {isProfileOpen && (
        <>
          {/* Mobile backdrop */}
          <div className="fixed inset-0 z-40 bg-black bg-opacity-25 sm:hidden" onClick={() => setIsProfileOpen(false)} />

          <div className="absolute right-0 mt-2 w-72 sm:w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50 max-h-96 overflow-y-auto">
            {/* User Info */}
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <img
                  src={profile_pic(profileImg)}
                  alt={name}
                  className="w-12 h-12 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-emerald-500 dark:text-white truncate">{name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 truncate">{email}</div>
                </div>
              </div>
            </div>

         

            {/* Logout */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
              <button
                onClick={logOut}
                className="w-full flex items-center space-x-3 px-4 py-3 sm:py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors focus:outline-none focus:bg-red-50 dark:focus:bg-red-900/20"
              >
                <LogOut className="w-4 h-4 flex-shrink-0" />
                <span>LogOut</span>
              </button>


            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;

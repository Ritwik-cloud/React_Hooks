import React, { useState, useEffect, memo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Palette } from 'lucide-react';
import { profile_pic } from '../../api/axios/axios';
import toast from 'react-hot-toast';
import { useTokenStore } from '../../Store/AuthStore';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const hasToken = localStorage.getItem("token");
  const hasName = localStorage.getItem("firstName");
  const hasImg = localStorage.getItem("ProfilePic");
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
   setToken()
  }, [])
  
const token2 = useTokenStore((state) => state.token);
  const setToken = useTokenStore((state) => state.setToken);


  const logOut = () => {
    if (token2) {
        localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    localStorage.removeItem("profilePic"); 
    setToken()
    navigate('/');
    toast.success("LogOut Successfully!"); 
    }
  
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Articles', href: '/cms/articalList' },
  ];

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Artica
              </span>
            </Link>
          </div>

          {/* Center - Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8 absolute left-1/2 transform -translate-x-1/2">
           {hasToken ?
            <>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-medium transition-colors duration-200 hover:text-green-600 dark:hover:text-green-400 whitespace-nowrap text-gray-700 dark:text-gray-300"
              >
                {item.name}
              </Link>
            ))}
           </>
           :
           <>
            
           </>
           }
          </div>

          {/* Right side - Auth buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {hasToken ? (
              <>
                <button
                  onClick={logOut}
                  className="hover:shadow-lg hover:shadow-red-500/25 duration-200 text-sm font-medium px-4 py-2 rounded-md text-white bg-gradient-to-r from-red-600 to-red-600 hover:from-red-700 hover:to-red-700 transition-colors shadow-sm"
                >
                  LogOut
                </button>

                {hasName && (
                  <h3 className="text-green-400 text-lg">
                    {hasName.charAt(0).toUpperCase() + hasName.slice(1)}
                  </h3>
                )}

                {hasImg && (
                  <img
                    src={profile_pic(hasImg)} 
                    alt={hasName || 'Profile'}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
              </>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="text-sm font-medium px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  className="hover:shadow-lg hover:shadow-green-500/25 duration-200 text-sm font-medium px-4 py-2 rounded-md text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-colors shadow-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <>
            {/* Mobile backdrop */}
            <div className="fixed inset-0 z-40 bg-black bg-opacity-25 md:hidden" onClick={() => setIsMenuOpen(false)} />
            
            <div className="md:hidden fixed left-0 right-0 top-16 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 z-50 max-h-[calc(100vh-4rem)] overflow-y-auto">
              <div className="px-2 pt-2 pb-4 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                  {hasToken ? (
                    <>
                      <button
                        onClick={() => {
                          logOut();
                          setIsMenuOpen(false);
                        }}
                        className="block w-full px-3 py-3 mx-2 my-2 rounded-md text-base font-medium text-center text-white bg-gradient-to-r from-red-600 to-red-600 hover:from-red-700 hover:to-red-700 transition-colors shadow-sm"
                      >
                        LogOut
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/auth/login"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        Login
                      </Link>
                      <Link
                        to="/auth/register"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-3 py-3 mx-2 my-2 rounded-md text-base font-medium text-center text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-colors shadow-sm"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default memo(Navbar);
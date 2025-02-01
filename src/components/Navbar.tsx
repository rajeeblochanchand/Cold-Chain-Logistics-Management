import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Thermometer } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md fixed w-full z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Thermometer className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">ColdChain</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link 
                to="/dashboard" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/dashboard')
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Dashboard
              </Link>
              <Link 
                to="/regulate" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/regulate')
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Regulate
              </Link>
              <Link 
                to="/trace" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/trace')
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Trace
              </Link>
              <Link 
                to="/link" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/link')
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Link
              </Link>
              <button
                onClick={handleLogin}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/dashboard"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/dashboard')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/regulate"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/regulate')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Regulate
            </Link>
            <Link
              to="/trace"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/trace')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Trace
            </Link>
            <Link
              to="/link"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/link')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Link
            </Link>
            <button
              onClick={() => {
                handleLogin();
                setIsOpen(false);
              }}
              className="w-full text-left bg-blue-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
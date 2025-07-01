import { BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ activeSection, scrollToSection }) => {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              DataVision
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className={`transition-colors duration-200 font-medium ${
                activeSection === 'home' 
                  ? 'text-blue-600' 
                  : 'text-slate-700 hover:text-blue-600'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className={`transition-colors duration-200 font-medium ${
                activeSection === 'contact' 
                  ? 'text-blue-600' 
                  : 'text-slate-700 hover:text-blue-600'
              }`}
            >
              Contact
            </button>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            <Link to="/login" className="text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium px-4 py-2">
              Login
            </Link>
            <Link to="/signup" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar
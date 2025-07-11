import { useState } from 'react';
import { BarChart3, Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      console.log(data.user);

      login(data.user, data.token);
      navigate('/dashboard');

    } catch (error) {
      console.error(error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Back Button */}
        <Link
          to="/"
          className="mb-6 text-slate-600 hover:text-slate-900 transition-colors duration-200 flex items-center"
        >
          ← Back to Home
        </Link>

        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-400 to-blue-400 rounded-full opacity-10 transform translate-x-16 -translate-y-8"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400 to-indigo-400 rounded-full opacity-10 transform -translate-x-8 translate-y-8"></div>

          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl mb-4 shadow-lg">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
            <p className="text-slate-600">Sign in to your DataVision account</p>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/50"
                  placeholder="Enter your email"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-12 pr-12 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/50"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-4 rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-slate-600">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200"
            >
              Create one now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

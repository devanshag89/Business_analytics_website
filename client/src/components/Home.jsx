import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Target, ChevronRight, PlayCircle, Star, ArrowRight } from 'lucide-react';
import {Link} from 'react-router-dom';

const Home = ({ scrollToSection }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Advanced Analytics",
      description: "Transform raw data into actionable insights with our cutting-edge analytics platform."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Predictive Modeling",
      description: "Forecast trends and make data-driven decisions with machine learning algorithms."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Strategic Planning",
      description: "Align your business objectives with data-backed strategic recommendations."
    }
  ];

  const stats = [
    { number: "500+", label: "Happy Clients" },
    { number: "99.9%", label: "Uptime" },
    { number: "2M+", label: "Data Points" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  <Star className="w-4 h-4 mr-2" />
                  #1 Analytics Platform 2024
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                  Transform Your
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Data</span>
                  <br />
                  Into Success
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed">
                  Unlock the power of your business data with our advanced analytics platform. 
                  Make smarter decisions, predict trends, and drive growth with confidence.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to='/login' className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center font-semibold">
                  Get Started 
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <button className="border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-xl hover:border-blue-300 hover:text-blue-600 transition-all duration-200 flex items-center justify-center font-semibold">
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Watch Demo
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className={`text-center transform transition-all duration-500 delay-${index * 100}`}>
                    <div className="text-2xl font-bold text-slate-900">{stat.number}</div>
                    <div className="text-slate-600 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Visual */}
            <div className={`relative transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl transform rotate-6 scale-105 opacity-20"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-slate-200">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-slate-900">Revenue Analytics</h3>
                      <span className="text-green-600 text-sm font-medium">+24.5%</span>
                    </div>
                    
                    {/* Animated Chart Bars */}
                    <div className="space-y-3">
                      {[85, 92, 78, 96, 88, 94].map((height, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <span className="text-xs text-slate-500 w-8">Q{index + 1}</span>
                          <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out"
                              style={{ 
                                width: `${height}%`,
                                animationDelay: `${index * 200}ms`
                              }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium text-slate-700 w-8">{height}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-80 animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-60 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Powerful Features for 
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Modern Business</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our comprehensive suite of analytics tools helps you understand your data, 
              predict outcomes, and make informed decisions that drive success.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`group p-8 bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-2 ${
                  activeFeature === index ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
                }`}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mb-6 group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-300">
                  <div className="text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600 mb-6">{feature.description}</p>
                <button className="text-blue-600 font-medium flex items-center group-hover:text-blue-700 transition-colors duration-300">
                  Learn More
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section with Scroll to Contact */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
              <p className="text-xl mb-8 text-blue-100">
                Join thousands of companies already using DataVision to drive growth and make smarter decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to='/login' className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Start Your Journey
                </Link>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-200 transform hover:scale-105 font-semibold"
                >
                  Contact Us Today
                </button>
              </div>
            </div>
            
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
              <Users className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home
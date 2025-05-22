
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const navItems = [
    { path: "/", label: "Home", icon: "fa fa-home" },
    { path: "/about", label: "About", icon: "fa fa-user-circle" },
    { path: "/projects", label: "Projects", icon: "fa fa-code" },
    { path: "/socials", label: "Socials", icon: "fa fa-user" },
    { path: "/techstack", label: "Tech Stack", icon: "fa fa-cogs" }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-3 glassmorphism backdrop-blur-lg' : 'py-5 bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-cyber font-bold text-eva-primary">
            dimuzzo
          </Link>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <motion.li key={item.path} whileHover={{ scale: 1.05 }}>
                <Link 
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  <i className={`${item.icon} mr-2`}></i>
                  {item.label}
                </Link>
              </motion.li>
            ))}
          </ul>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-eva-light focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <motion.div 
        className="md:hidden"
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isMobileMenuOpen ? 'auto' : 0,
          opacity: isMobileMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        {isMobileMenuOpen && (
          <div className="px-4 py-3 glassmorphism backdrop-blur-lg">
            <ul className="flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path}
                    className={`block py-2 ${location.pathname === item.path ? 'text-eva-primary' : 'text-eva-light'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <i className={`${item.icon} mr-2`}></i>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </nav>
  );
};

export default Navbar;

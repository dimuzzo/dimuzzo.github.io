
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import ThemeToggle from '../components/ThemeToggle';
import { motion } from 'framer-motion';
import { useTheme } from '../components/ThemeProvider';

const Socials = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const socialLinks = [
    {
      id: 1,
      name: 'GitHub',
      icon: 'fa-brands fa-github',
      url: 'https://github.com/dimuzzo',
      color: 'from-[#333] to-[#171515]'
    },
    {
      id: 2,
      name: 'LinkedIn',
      icon: 'fa-brands fa-linkedin',
      url: 'https://www.linkedin.com/in/alessandro-demo-b844a8301',
      color: 'from-[#0077B5] to-[#0e76a8]'
    },
    {
      id: 3,
      name: 'Telegram',
      icon: 'fa-brands fa-telegram',
      url: 'https://t.me/dimuzzo',
      color: 'from-[#0088cc] to-[#29b6f6]'
    },
    {
      id: 4,
      name: 'LeetCode',
      icon: 'fa-solid fa-file-code',
      url: 'https://leetcode.com/dimuzzo/',
      color: 'from-[#f89f1b] to-[#FFA116]'
    },
    {
      id: 5,
      name: 'Letterboxd',
      icon: 'fa-solid fa-film',
      url: 'https://letterboxd.com/dimuzzo/',
      color: 'from-[#14181c] to-[#445566]'
    },
    {
      id: 6,
      name: 'Instagram',
      icon: 'fa-brands fa-square-instagram',
      url: 'https://instagram.com/_aledemo',
      color: 'from-[#833AB4] to-[#E1306C]'
    }
  ];

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''} hero-pattern min-h-screen`}>
      <CustomCursor />
      <Navbar />
      <ThemeToggle />
      
      <main className="max-w-4xl mx-auto px-4 py-16">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-16 text-center gradient-text inline-block"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Find me on
        </motion.h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialLinks.map((social, index) => (
            <SocialLink 
              key={social.id} 
              social={social} 
              index={index} 
            />
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

const SocialLink = ({ social, index }) => {
  return (
    <motion.a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className="social-item flex flex-col items-center justify-center p-8 relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
      <i className={`${social.icon} text-4xl mb-4 text-eva-primary group-hover:scale-110 transition-all duration-300`}></i>
      <p className="text-lg font-medium">{social.name}</p>
      
      <motion.div 
        className="absolute bottom-0 left-0 h-1 bg-eva-primary"
        initial={{ width: "0%" }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
};

export default Socials;

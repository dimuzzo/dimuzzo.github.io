
import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer 
      className="py-8 glassmorphism backdrop-blur-sm border-t border-white/10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-eva-primary mb-2">dimuzzo</h3>
            <p className="text-sm opacity-70">Computer Science student @ UniTo</p>
          </div>
          
          <div className="flex space-x-5 my-4 md:my-0">
            <a href="https://github.com/dimuzzo" target="_blank" rel="noopener noreferrer" 
               className="text-eva-light hover:text-eva-primary transition-colors">
              <i className="fab fa-github text-2xl"></i>
            </a>
            <a href="https://www.linkedin.com/in/alessandro-demo-b844a8301" target="_blank" rel="noopener noreferrer" 
               className="text-eva-light hover:text-eva-primary transition-colors">
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
            <a href="https://t.me/dimuzzo" target="_blank" rel="noopener noreferrer" 
               className="text-eva-light hover:text-eva-primary transition-colors">
              <i className="fab fa-telegram text-2xl"></i>
            </a>
          </div>
          
          <div className="text-center md:text-right">
            <p className="opacity-70 text-sm">© 2025 dimuzzo | All rights reserved</p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;

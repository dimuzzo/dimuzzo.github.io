
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import ThemeToggle from '../components/ThemeToggle';
import { motion } from 'framer-motion';
import { useTheme } from '../components/ThemeProvider';

const TechStack = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const technologies = [
    {
      id: 1,
      name: 'Java',
      icon: 'fab fa-java',
      iconType: 'font-awesome',
      color: '#f89820',
      level: 80,
      description: 'OOP principles, desktop applications, and server-side programming'
    },
    {
      id: 2,
      name: 'Jupyter Notebook',
      icon: 'https://simpleicons.org/icons/jupyter.svg',
      iconType: 'image',
      color: '#F37626',
      level: 80,
      description: 'Interactive computing, data visualization, and documentation'
    },
    {
      id: 3,
      name: 'Arduino',
      icon: 'https://simpleicons.org/icons/arduino.svg',
      iconType: 'image',
      color: '#00979D',
      level: 80,
      description: 'Electronics prototyping, IoT, and hardware programming'
    },
    {
      id: 4,
      name: 'Python',
      icon: 'fab fa-python',
      iconType: 'font-awesome',
      color: '#3776AB',
      level: 65,
      description: 'Currently learning - data analysis and backend development'
    },
    {
      id: 5,
      name: 'PostgreSQL',
      icon: 'fas fa-database',
      iconType: 'font-awesome',
      color: '#336791',
      level: 70,
      description: 'Database design and SQL queries'
    }
  ];

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''} hero-pattern min-h-screen`}>
      <CustomCursor />
      <Navbar />
      <ThemeToggle />
      
      <main className="max-w-6xl mx-auto px-4 py-16">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-16 text-center gradient-text inline-block"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Tech Stack
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <TechItem 
              key={tech.id} 
              tech={tech} 
              index={index} 
            />
          ))}
        </div>
        
        <motion.div
          className="mt-20 glassmorphism rounded-xl p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold mb-6 gradient-text inline-block">Learning Next</h2>
          <div className="flex flex-wrap gap-4">
            {['React', 'TypeScript', 'GraphQL', 'Docker', 'AWS'].map((tech, i) => (
              <motion.span 
                key={tech}
                className="glassmorphism px-4 py-2 rounded-full text-sm font-medium"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * i + 0.5, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

const TechItem = ({ tech, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="glassmorphism rounded-xl overflow-hidden hover:shadow-[0_0_15px_rgba(255,34,34,0.3)] transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6 flex flex-col items-center gap-4">
        {tech.iconType === 'font-awesome' ? (
          <i 
            className={`${tech.icon} text-5xl mb-2 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}
            style={{ color: tech.color }}
          ></i>
        ) : (
          <img 
            src={tech.icon} 
            alt={tech.name} 
            className={`w-16 h-16 mb-2 invert transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`} 
          />
        )}
        <h3 className="text-xl font-medium">{tech.name}</h3>
        
        <div className="w-full bg-gray-700/30 rounded-full h-2.5 mt-2">
          <motion.div 
            className="h-2.5 rounded-full bg-gradient-to-r from-eva-primary to-eva-secondary"
            style={{ width: `${tech.level}%` }}
            initial={{ width: '0%' }}
            animate={{ width: `${tech.level}%` }}
            transition={{ delay: index * 0.2 + 0.5, duration: 0.8, ease: "easeOut" }}
          ></motion.div>
        </div>
        
        <motion.p 
          className="text-sm text-center opacity-70 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0.7 }}
        >
          {tech.description}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default TechStack;

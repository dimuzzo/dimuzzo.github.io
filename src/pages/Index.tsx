
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import ThemeToggle from '../components/ThemeToggle';
import { motion } from 'framer-motion';
import { useTheme } from '../components/ThemeProvider';

const Index = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''} hero-pattern min-h-screen`}>
      <CustomCursor />
      <Navbar />
      <ThemeToggle />
      
      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="mb-20">
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-between gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="md:w-1/2 space-y-6">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold leading-tight"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Hi, I'm Ale aka <span className="gradient-text">dimuzzo</span>
              </motion.h1>
              
              <motion.p 
                className="text-lg opacity-90 max-w-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Computer Science student passionate about coding, AI, and geospatial data.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <a 
                  href="/projects" 
                  className="inline-flex items-center gap-2 bg-eva-primary hover:bg-eva-primary/80 text-white px-6 py-3 rounded-md transition-all shadow-lg shadow-eva-primary/20 hover:shadow-eva-primary/40 font-medium"
                >
                  View projects
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
                  </svg>
                </a>
              </motion.div>
            </div>
            
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="relative">
                <div className="absolute -inset-0.5 bg-eva-gradient rounded-xl blur-md opacity-70 animate-pulse-glow"></div>
                <img 
                  src="https://c4.wallpaperflare.com/wallpaper/121/540/894/evangelion-neon-genesis-evangelion-evangelion-unit-01-wallpaper-thumb.jpg" 
                  alt="Evangelion Unit 01" 
                  className="w-full h-auto object-cover rounded-lg shadow-2xl relative z-10"
                />
              </div>
            </motion.div>
          </motion.div>
        </section>
        
        {/* About Section */}
        <motion.section 
          className="mb-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl mb-8 font-bold gradient-text inline-block">About Me</h2>
          
          <div className="glassmorphism rounded-xl p-6 md:p-8">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AboutItem 
                icon="🎵" 
                text="Coding with music always on"
                delay={0.9}
              />
              <AboutItem 
                icon="📊" 
                text="Working on NBA score prediction & spatial DB benchmarking"
                delay={1.0}
              />
              <AboutItem 
                icon="🤖" 
                text="Curious about AI & spatial computing"
                delay={1.1}
              />
              <AboutItem 
                icon="🎶" 
                text="Usually listening to The Weeknd and Daft Punk"
                delay={1.2}
              />
            </ul>
          </div>
        </motion.section>
        
        {/* Explore Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl mb-8 font-bold gradient-text inline-block">Explore the Web</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ExploreLink 
              title="Google AI Blog"
              icon="fas fa-robot"
              url="https://ai.googleblog.com/"
              delay={1.4}
            />
            <ExploreLink 
              title="Towards Data Science"
              icon="fas fa-brain"
              url="https://towardsdatascience.com/"
              delay={1.5}
            />
            <ExploreLink 
              title="DuckDB News"
              icon="fas fa-database"
              url="https://duckdb.org/news/"
              delay={1.6}
            />
            <ExploreLink 
              title="Analytics Vidhya"
              icon="fas fa-chart-line"
              url="https://www.analyticsvidhya.com/blog/"
              delay={1.7}
            />
          </div>
        </motion.section>
      </main>
      
      <Footer />
    </div>
  );
};

const AboutItem = ({ icon, text, delay }) => {
  return (
    <motion.li 
      className="flex items-start gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay, duration: 0.5 }}
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-lg opacity-90">{text}</span>
    </motion.li>
  );
}

const ExploreLink = ({ title, icon, url, delay }) => {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="glassmorphism group rounded-lg p-6 transition-all duration-300 hover:-translate-y-2 flex flex-col items-center justify-center gap-4 hover:shadow-[0_0_15px_rgba(255,34,34,0.4)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay, duration: 0.5 }}
    >
      <i className={`${icon} text-3xl text-eva-primary group-hover:scale-110 transition-transform duration-300`}></i>
      <h3 className="text-lg font-medium text-center">{title}</h3>
    </motion.a>
  );
}

export default Index;

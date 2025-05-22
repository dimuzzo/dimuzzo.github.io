
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import ThemeToggle from '../components/ThemeToggle';
import { motion } from 'framer-motion';
import { useTheme } from '../components/ThemeProvider';

const Projects = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const projects = [
    {
      id: 1,
      title: 'NBA Score Prediction',
      description: 'Using Python, machine learning models and data analysis to predict NBA game outcomes.',
      image: 'https://images7.alphacoders.com/856/thumb-1920-856240.jpg',
      link: 'https://github.com/dimuzzo/nba-score-prediction'
    },
    {
      id: 2,
      title: 'Spatial DB Benchmarking',
      description: 'Benchmark tests on DuckDB spatial extension with geospatial data and city maps.',
      image: 'https://geospatialworld.net/wp-content/uploads/2023/05/global-network-connection-covering-earth-with-lines-innovative-perception_31965-29244.jpg',
      link: 'https://github.com/dimuzzo/testing-project'
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
          My Projects
        </motion.h1>
        
        <div className="space-y-16">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      className="flex flex-col md:flex-row gap-8 glassmorphism rounded-xl overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
    >
      <div className="md:w-2/5 relative group">
        <motion.div 
          className="absolute -inset-0.5 bg-eva-gradient rounded-l-xl blur-md opacity-50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          transition={{ duration: 0.6 }}
        ></motion.div>
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover z-10 relative md:rounded-l-lg md:rounded-r-none rounded-t-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-eva-dark/80 via-transparent to-transparent md:rounded-l-lg md:rounded-r-none rounded-t-lg z-20"></div>
      </div>
      
      <div className="p-6 md:p-8 md:w-3/5 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 gradient-text inline-block">{project.title}</h2>
          <p className="text-eva-light/70 mb-6">{project.description}</p>
        </div>
        
        <a 
          href={project.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-eva-primary hover:bg-eva-primary/80 text-white px-6 py-3 rounded-md transition-all shadow-lg shadow-eva-primary/20 hover:shadow-eva-primary/40 font-medium w-max"
        >
          <i className="fab fa-github"></i>
          View on GitHub
        </a>
      </div>
    </motion.div>
  );
};

export default Projects;

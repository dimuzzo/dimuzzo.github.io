
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import ThemeToggle from '../components/ThemeToggle';
import { motion } from 'framer-motion';
import { useTheme } from '../components/ThemeProvider';
import { GraduationCap, Users, BookOpen, Code, Laptop, ChevronDown } from 'lucide-react';

const About = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showMore, setShowMore] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const education = [
    {
      id: 1,
      degree: "Computer Science",
      school: "University of Turin (UniTo)",
      period: "2022 - Present",
      description: "Focus on artificial intelligence, machine learning, and geospatial data analysis"
    }
  ];
  
  const interests = [
    { id: 1, name: "AI & Machine Learning", icon: "fa-robot" },
    { id: 2, name: "Data Analysis", icon: "fa-chart-line" },
    { id: 3, name: "Music Production", icon: "fa-music" },
    { id: 4, name: "Basketball", icon: "fa-basketball" },
    { id: 5, name: "Sci-Fi Movies", icon: "fa-film" }
  ];

  const courses = [
    { name: "Data Structures & Algorithms", progress: 90 },
    { name: "Database Systems", progress: 85 },
    { name: "Machine Learning", progress: 75 },
    { name: "Computer Networks", progress: 70 },
    { name: "Software Engineering", progress: 80 }
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
          About Me
        </motion.h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
          <motion.div 
            className="lg:col-span-2 glassmorphism rounded-xl overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Profile" 
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                <h2 className="text-2xl font-bold text-white">Alessandro Demo</h2>
                <p className="text-white/80">dimuzzo</p>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center">
                <i className="fas fa-map-marker-alt text-eva-primary mr-2"></i>
                <span>Turin, Italy</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-graduation-cap text-eva-primary mr-2"></i>
                <span>Computer Science Student at UniTo</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-code text-eva-primary mr-2"></i>
                <span>Python & Data Enthusiast</span>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10">
                <h3 className="text-lg font-semibold mb-2">Quick Bio</h3>
                <p className="text-sm opacity-80 leading-relaxed">
                  Computer Science student at University of Turin with a passion for AI, data analysis, and problem-solving. When not coding, you'll find me watching sci-fi movies or playing basketball.
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-3 glassmorphism rounded-xl p-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-4 gradient-text inline-block">Who am I?</h2>
            <p className="mb-4 leading-relaxed">
              I'm a Computer Science student at the University of Turin (UniTo), with a passion for coding, AI, and geospatial data. Currently focusing on the academic aspects of computer science, I'm building a strong foundation in algorithms, data structures, and machine learning principles.
            </p>
            <p className="mb-4 leading-relaxed">
              At UniTo, I've been particularly interested in courses related to data analysis, database design, and spatial computing. My current academic projects include developing NBA prediction models and optimizing spatial databases for geospatial queries.
            </p>
            <p className="leading-relaxed">
              When I'm not attending lectures or working on university projects, you can find me listening to The Weeknd and Daft Punk, watching sci-fi movies (with a particular fondness for Evangelion), or playing basketball. I'm always eager to apply theoretical knowledge from my courses to practical projects and connect with like-minded individuals in the tech community.
            </p>

            <div className="mt-8 pt-4 border-t border-white/10">
              <h3 className="text-xl font-bold mb-3">My Academic Journey</h3>
              <div className="flex items-center space-x-2 mb-3">
                <BookOpen className="text-eva-primary" size={18} />
                <span className="font-semibold">Computer Science Curriculum at UniTo</span>
              </div>
              <p className="leading-relaxed mb-4 pl-6">
                The Computer Science program at University of Turin offers a comprehensive education in both theoretical and practical aspects of computing. With a focus on modern technologies and research-oriented approaches, the curriculum has allowed me to explore various domains of computer science while deepening my knowledge in data science and AI.
              </p>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mb-16 glassmorphism rounded-xl p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6 gradient-text inline-block">Education</h2>
          <div className="space-y-8">
            {education.map((item, index) => (
              <motion.div 
                key={item.id} 
                className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:rounded-full before:bg-eva-primary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              >
                <h3 className="text-xl font-bold">{item.degree}</h3>
                <div className="flex items-center mt-1 mb-1">
                  <GraduationCap className="text-eva-primary mr-2" size={16} />
                  <p className="text-lg font-semibold">{item.school}</p>
                </div>
                <p className="text-sm opacity-70 mb-2">{item.period}</p>
                <p>{item.description}</p>
                
                <div className="mt-4 space-y-2">
                  <h4 className="font-semibold text-sm opacity-80">NOTABLE COURSES:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    {courses.map((course, idx) => (
                      <div key={idx} className="glassmorphism p-3 rounded-lg">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{course.name}</span>
                          <span className="text-xs opacity-70">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-1.5">
                          <div 
                            className="bg-gradient-to-r from-eva-primary to-eva-secondary h-1.5 rounded-full" 
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {showMore && (
            <motion.div 
              className="mt-8 space-y-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <h3 className="text-xl font-bold mb-3 gradient-text inline-block">Research Interests</h3>
                <ul className="space-y-2 pl-6">
                  <li className="flex items-start">
                    <span className="text-eva-primary mr-2">•</span>
                    <span>Geospatial data processing and analysis using modern database systems</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-eva-primary mr-2">•</span>
                    <span>Machine learning applications in sports analytics and prediction models</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-eva-primary mr-2">•</span>
                    <span>Optimization techniques for spatial queries and large dataset processing</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3 gradient-text inline-block">Academic Goals</h3>
                <ul className="space-y-2 pl-6">
                  <li className="flex items-start">
                    <span className="text-eva-primary mr-2">•</span>
                    <span>Complete my degree with specialization in Data Science</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-eva-primary mr-2">•</span>
                    <span>Participate in research projects related to spatial computing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-eva-primary mr-2">•</span>
                    <span>Publish a paper on NBA prediction models before graduation</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
          
          <motion.button
            onClick={() => setShowMore(!showMore)}
            className="mt-6 flex items-center mx-auto glassmorphism px-4 py-2 rounded-full hover:bg-white/10 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-1">{showMore ? "Show Less" : "Show More"}</span>
            <ChevronDown className={`transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`} size={16} />
          </motion.button>
        </motion.div>
        
        <motion.div 
          className="mb-16 glassmorphism rounded-xl p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6 gradient-text inline-block">Interests</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {interests.map((interest, index) => (
              <motion.div 
                key={interest.id}
                className="glassmorphism rounded-lg p-4 flex flex-col items-center text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <i className={`fas ${interest.icon} text-3xl text-eva-primary mb-2`}></i>
                <span className="text-sm font-medium">{interest.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          className="glassmorphism rounded-xl p-8 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6 gradient-text inline-block">University Life</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              className="glassmorphism rounded-lg overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="University Coding" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">Coding Sessions</h3>
                <p className="text-sm opacity-80">Weekly coding sessions at the university lab, where we work on collaborative projects and solve competitive programming challenges.</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="glassmorphism rounded-lg overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Study Groups" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">Study Groups</h3>
                <p className="text-sm opacity-80">Participating in study groups helps me understand complex concepts through peer discussions and shared knowledge.</p>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-8 glassmorphism rounded-lg p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="flex items-center space-x-2 mb-3">
              <Users className="text-eva-primary" size={18} />
              <h3 className="font-bold text-lg">Student Community</h3>
            </div>
            <p className="leading-relaxed text-sm opacity-80">
              Being part of the computer science student community at UniTo has been an enriching experience. The collaborative spirit, hackathons, and tech events organized by the department provide opportunities to apply classroom knowledge to practical scenarios and connect with industry professionals.
            </p>
          </motion.div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;

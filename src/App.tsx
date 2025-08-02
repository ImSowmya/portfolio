import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code, BarChart3, Brain, Heart, ChevronLeft, ChevronRight, ArrowUp } from 'lucide-react';
import emailjs from 'emailjs-com';

import './index.css';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import myPhoto from './assets/me.png';
import myResume from './assets/SowmyaDataScientist.pdf'

import {skills, projects, experience, education} from './resumeConfig';
import {email, linkedIn, github, bio} from './resumeConfig'

// Simplified scroll animation hook - only fade in when elements enter viewport
const useScrollAnimation = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      const sections = document.querySelectorAll('[data-animate]');
      sections.forEach(section => observer.observe(section));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  return visibleElements;
};

const scrollSkillsLeft = () => {
  const skillsContainer = document.querySelector('#skills .overflow-x-auto');
  if (skillsContainer) {
    skillsContainer.scrollBy({ left: -200, behavior: 'smooth' });
  }
};

const scrollSkillsRight = () => {
  const skillsContainer = document.querySelector('#skills .overflow-x-auto');
  if (skillsContainer) {
    skillsContainer.scrollBy({ left: 200, behavior: 'smooth' });
  }
};

const scrollProjectsLeft = () => {
  const projectsContainer = document.querySelector('#projects .overflow-x-auto');
  if (projectsContainer) {
    projectsContainer.scrollBy({ left: -200, behavior: 'smooth' });
  }
};

const scrollProjectsRight = () => {
  const projectsContainer = document.querySelector('#projects .overflow-x-auto');
  if (projectsContainer) {
    projectsContainer.scrollBy({ left: 200, behavior: 'smooth' });
  }
};

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    projectType: '',
    message: ''
  });
  const [dialogStep, setDialogStep] = useState(0);
  const visibleElements = useScrollAnimation();

  // Refs for smooth scrolling
  const aboutRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const educationRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const sectionRefs: { [key: string]: React.RefObject<HTMLElement | null> } = {
    about: aboutRef,
    skills: skillsRef,
    projects: projectsRef,
    education: educationRef,
    experience: experienceRef,
    contact: contactRef,
  };

  // Handle scroll events for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle scroll events for back to top button and active section
useEffect(() => {
  const handleScroll = () => {
    setShowBackToTop(window.scrollY > 400);
    
    const skillsTop = skillsRef.current?.offsetTop || 0;
    const projectsTop = projectsRef.current?.offsetTop || 0;
    const educationTop = educationRef.current?.offsetTop || 0;
    const experienceTop = experienceRef.current?.offsetTop || 0;
    const contactTop = contactRef.current?.offsetTop || 0;
    
    const scroll = window.scrollY;
    
    if (scroll >= contactTop - 350) setActiveSection('contact');
    else if (scroll >= experienceTop - 350) setActiveSection('experience');
    else if (scroll >= educationTop - 350) setActiveSection('education');
    else if (scroll >= projectsTop - 350) setActiveSection('projects');
    else if (scroll >= skillsTop - 350) setActiveSection('skills');
    else setActiveSection('about');
  };
  
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

  // Smooth scroll to a section by id
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const ref = sectionRefs[sectionId as keyof typeof sectionRefs];
    if (ref && ref.current) {
      const navbarHeight = 50;

      const elementTop = ref.current.getBoundingClientRect().top;
      const offsetPosition = window.pageYOffset + elementTop - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle contact form change
  const handleContactFormChange = (field: string, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  // Submit contact form
  const handleSubmitQuest = () => {
    emailjs.send(
      'service_sowmya_dsml',    
      'template_r4tj9qp',    
      {
        from_name: contactForm.name,
        from_email: contactForm.email,
        project_type: contactForm.projectType,
        message: contactForm.message,
      },
      'y5wsR-aDt84Rh4bLp'
    ).then(() => {
      setDialogStep(3);
      setContactForm({name: '', email: '', projectType: '', message: '' });
    }).catch((error) => {
      console.error('Failed to send email:', error);
      alert('Sorry, there was an issue sending your message. Please try again later.');
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 to-green-100" style={{ zoom: '0.9' }}>
      {/* Navigation - Game Style */}
      <nav className="fixed top-0 w-full bg-lime-100/95 backdrop-blur-sm z-50 border-b-4 border-green-600" 
           style={{ boxShadow: '0 4px 0 #16a34a' }}>
        <div className="max-w-full px-12 py-4">
          <div className="flex justify-center items-center">
            <div className="flex space-x-8">
              {['About', 'Skills', 'Projects', 'Education', 'Experience', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`px-6 py-3 transition-all duration-200 transform active:scale-95 ${
                    activeSection === item.toLowerCase() 
                      ? 'bg-lime-400 text-green-900 border-4 border-green-600 rounded-lg shadow-lg' 
                      : 'text-green-800 hover:text-green-900 hover:bg-lime-200 border-4 border-transparent rounded-lg hover:border-green-400'
                  }`}
                  style={activeSection === item.toLowerCase() ? { boxShadow: '0 4px 0 #16a34a' } : {}}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Back to Top Button - Game Power-up Style */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-16 h-16 bg-lime-400 hover:bg-lime-300 border-4 border-green-600 rounded-2xl flex items-center justify-center text-green-900 transform hover:scale-110 active:scale-95 transition-all duration-300 z-50 shadow-2xl"
          style={{ boxShadow: '0 8px 0 #16a34a' }}
        >
          <div className="relative">
            <ArrowUp className="w-6 h-6" />
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-lime-300 rounded-full opacity-50 animate-ping"></div>
          </div>
        </button>
      )}

      {/* Hero Section - Game UI Style (Always visible, no animation) */}
      <section ref={aboutRef} id="home" className="pt-5 min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-6 py-27">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {/* Game-style title with chunky styling */}
              <div className="space-y-6">
                <h1 className="text-6xl lg:text-7xl text-green-900 leading-tight font-black tracking-tight">
                  Hello
                  <br />
                  <span className="text-lime-600">I'm Sowmya</span>
                </h1>
                
                {/* Game-style info box */}
                <div className="bg-white border-4 border-green-600 rounded-xl p-6 shadow-lg"
                     style={{ boxShadow: '0 6px 0 #16a34a' }}>
                  <p className="text-lg text-green-800 leading-relaxed">
                    {bio}
                  </p>
                </div>
              </div>
              
              {/* Status indicator - game style */}
              <div className="flex items-center space-x-3 bg-green-100 border-3 border-green-500 rounded-lg px-4 py-2 w-fit">
                <div className="w-4 h-4 bg-lime-400 rounded-full animate-pulse border-2 border-green-600"></div>
                <span className="text-green-800 font-medium">Available for new oppurtunities!</span>
              </div>
              
              {/* Game-style buttons */}
              <div className="flex space-x-4">
                <button onClick={() => scrollToSection('projects')} className="bg-lime-400 hover:bg-lime-500 text-green-900 px-8 py-4 border-4 border-green-600 rounded-xl font-bold transform hover:scale-105 active:scale-95 transition-all duration-200"
                        style={{ boxShadow: '0 6px 0 #16a34a' }}>
                  ▶ View Projects
                </button>
                <a
                  href={myResume}
                  download="SowmyaDataScientist.pdf"
                  className="bg-white text-green-800 hover:bg-green-50 px-8 py-4 border-4 border-green-600 rounded-xl font-bold transform hover:scale-105 active:scale-95 transition-all duration-200"
                  style={{ boxShadow: '0 6px 0 #16a34a' }}
                >
                  📄 Download CV
                </a>
              </div>
              
              {/* Social links with game styling */}
              <div className="flex space-x-4 pt-4">
                <a
                  href= {github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-green-200 hover:bg-lime-300 border-3 border-green-600 rounded-lg flex items-center justify-center text-green-800 transform hover:scale-110 active:scale-95 transition-all duration-200"
                  style={{ boxShadow: '0 4px 0 #16a34a' }}
                >
                  <Github className="w-5 h-5" />
                </a>

                <a
                  href={linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-green-200 hover:bg-lime-300 border-3 border-green-600 rounded-lg flex items-center justify-center text-green-800 transform hover:scale-110 active:scale-95 transition-all duration-200"
                  style={{ boxShadow: '0 4px 0 #16a34a' }}
                >
                  <Linkedin className="w-5 h-5" />
                </a>

                <a
                  href={email}
                  className="w-12 h-12 bg-green-200 hover:bg-lime-300 border-3 border-green-600 rounded-lg flex items-center justify-center text-green-800 transform hover:scale-110 active:scale-95 transition-all duration-200"
                  style={{ boxShadow: '0 4px 0 #16a34a' }}
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            {/* Game-style character/profile area with enhanced floating elements */}
            <div className="relative">
              {/* Main profile card with game border */}
              <div className="relative z-10 bg-white border-4 border-green-600 rounded-2xl p-6 shadow-lg"
                   style={{ boxShadow: '0 8px 0 #16a34a' }}>
                <ImageWithFallback
                  src={myPhoto}
                  alt="Sowmya - Data Scientist"
                  className="w-full rounded-xl border-3 border-green-400"
                />
                {/* Level indicator */}
                <div className="absolute top-2 right-2 bg-lime-400 border-3 border-green-600 rounded-lg px-3 py-1">
                  <span className="text-green-900 font-bold text-sm">LVL 99</span>
                </div>
              </div>
              
              {/* Enhanced Floating game elements with subtle animations */}
              <div className="absolute top-4 -left-6 w-16 h-16 bg-lime-300 border-4 border-green-600 rounded-2xl flex items-center justify-center transform rotate-12 shadow-lg hover:rotate-0 hover:scale-110 transition-all duration-300 cursor-pointer hover:bg-lime-200"
                   style={{ boxShadow: '0 4px 0 #16a34a' }}>
                <BarChart3 className="w-6 h-6 text-green-800" />
              </div>
              <div className="absolute bottom-12 -right-8 w-14 h-14 bg-green-300 border-4 border-green-700 rounded-xl flex items-center justify-center transform -rotate-12 shadow-lg hover:rotate-0 hover:scale-110 hover:bg-green-200 transition-all duration-300 cursor-pointer"
                   style={{ boxShadow: '0 4px 0 #15803d' }}>
                <Brain className="w-5 h-5 text-green-900" />
              </div>
              <div className="absolute top-1/3 -right-4 w-12 h-12 bg-yellow-300 border-3 border-yellow-600 rounded-lg flex items-center justify-center transform rotate-45 shadow-lg hover:rotate-12 hover:scale-110 hover:bg-yellow-200 transition-all duration-300 cursor-pointer">
                <Code className="w-4 h-4 text-yellow-800" />
              </div>
              
              {/* Health/energy bars */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 space-y-2">
                <div className="bg-white border-3 border-green-600 rounded-lg px-3 py-1 flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-red-500" fill="currentColor" />
                  <div className="w-20 h-2 bg-red-200 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-red-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - Fade in animation */}
      <section ref={skillsRef} id="skills" className="py-20 bg-white/90">
        <div className="max-w-7xl mx-auto px-6">
          <div 
            className={`text-center space-y-4 mb-8 transition-all duration-1000 ease-out ${
              visibleElements.has('skills-header')
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-8'
            }`}
            data-animate
            id="skills-header"
          >
            <h2 className="text-4xl text-green-900 font-black">⚡ Skills Inventory</h2>
          </div>
          
          {/* Horizontal Scrollable Skills */}
          <div className="relative">
            <div className="absolute left-[-70px] top-1/2 transform -translate-y-1/2 flex flex-col space-y-2 z-10">
              <button
                onClick={scrollSkillsLeft}
                className="w-10 h-10 bg-lime-400 border-3 border-green-600 rounded-lg flex items-center justify-center hover:bg-lime-300 shadow-lg"
                style={{ boxShadow: '0 4px 0 #16a34a' }}>
                <ChevronLeft className="w-5 h-5 text-green-800" />
              </button>
            </div>
            <div 
              className={`overflow-x-auto scrollbar-hide pb-6 transition-all duration-1000 delay-300 ease-out ${
                visibleElements.has('skills-header')
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-8'
              }`}
            >
              <div
                className="grid grid-rows-2 gap-x-6 gap-y-8 px-12 py-8"
                style={{
                  width: 'max-content',
                  gridAutoFlow: 'column',
                }}
              >
                {skills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <div key={skill.name} 
                        className="bg-lime-100 border-4 border-green-600 rounded-xl p-6 hover:bg-lime-200 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 cursor-pointer shadow-lg flex-shrink-0 w-48"
                         style={{ boxShadow: '0 6px 0 #16a34a' }}>
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-lime-300 border-3 border-green-700 rounded-xl flex items-center justify-center mx-auto">
                          <Icon className="w-8 h-8 text-green-800" />
                        </div>
                        <h3 className="text-green-900 font-bold">{skill.name}</h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Scroll Indicators */}
            <div className="absolute right-[-70px] top-1/2 transform -translate-y-1/2 flex flex-col space-y-2">
              <button
                onClick={scrollSkillsRight}
                className="w-10 h-10 bg-lime-400 border-3 border-green-600 rounded-lg flex items-center justify-center hover:bg-lime-300 shadow-lg"
                style={{ boxShadow: '0 4px 0 #16a34a' }}>
                <ChevronRight className="w-5 h-5 text-green-800" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - Fade in animation */}
      <section ref={projectsRef} id="projects" className="py-20 bg-gradient-to-r from-lime-50/90 to-green-100/90">
        <div className="max-w-7xl mx-auto px-6">
          <div 
            className={`text-center space-y-4 mb-5 transition-all duration-1000 ease-out ${
              visibleElements.has('projects-header') 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-8'
            }`}
            data-animate
            id="projects-header"
          >
            <h2 className="text-4xl text-green-900 font-black">🎮 Projects</h2>
          </div>
          
          {/* Horizontal Scrollable Projects */}
          <div className="relative">
            <div className="absolute left-[-70px] top-1/2 transform -translate-y-1/2 flex flex-col space-y-2 z-10">
              <button
                onClick={scrollProjectsLeft}
                className="w-10 h-10 bg-lime-400 border-3 border-green-600 rounded-lg flex items-center justify-center hover:bg-lime-300 shadow-lg"
                style={{ boxShadow: '0 4px 0 #16a34a' }}>
                <ChevronLeft className="w-5 h-5 text-green-800" />
              </button>
            </div>
            <div 
              className={`overflow-x-auto scrollbar-hide pb-6 transition-all duration-1000 delay-300 ease-out ${
                visibleElements.has('projects-header') 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-8'
              }`}
            >
              <div className="flex space-x-6 px-12 py-8" style={{ width: 'max-content' }}>
                {projects.map((project) => (
                  <div key={project.title} 
                       className="bg-white border-4 border-green-600 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group transform hover:scale-105 hover:-translate-y-1 flex-shrink-0 w-80"
                       style={{ boxShadow: '0 8px 0 #16a34a' }}>
                    {/* Project image with game overlay */}
                    <div className="relative overflow-hidden">
                      <ImageWithFallback
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover"
                      />
                      {/* Quest status badge */}
                      <div className={`absolute top-3 right-3 px-3 py-1 rounded-lg border-2 font-bold text-xs ${
                        project.status === 'Complete' 
                          ? 'bg-lime-400 border-green-600 text-green-900' 
                          : 'bg-yellow-400 border-orange-600 text-orange-900'
                      }`}>
                        {project.status === 'Complete' ? '✓ COMPLETE' : '⚡ ACTIVE'}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-4 right-4">
                          <ExternalLink className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl text-green-900 font-bold">{project.title}</h3>
                      <p className="text-green-700">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span key={tech} 
                                className="bg-lime-200 text-green-800 border-2 border-green-500 px-3 py-1 rounded-lg text-sm font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Scroll Indicators */}
            <div className="absolute right-[-70px] top-1/2 transform -translate-y-1/2 flex flex-col space-y-2">
              <button
                onClick={scrollProjectsRight}
                className="w-10 h-10 bg-lime-400 border-3 border-green-600 rounded-lg flex items-center justify-center hover:bg-lime-300 shadow-lg"
                style={{ boxShadow: '0 4px 0 #16a34a' }}>
                <ChevronRight className="w-5 h-5 text-green-800" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section - Fade in animation */}
      <section ref={educationRef} id="education" className="py-20 bg-white/90">
        <div className="max-w-6xl mx-auto px-6">
          <div 
            className={`text-center space-y-4 mb-16 transition-all duration-1000 ease-out ${
              visibleElements.has('education-header') 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-8'
            }`}
            data-animate
            id="education-header"
          >
            <h2 className="text-4xl text-green-900 font-black">🎓 Academic Achievements</h2>
            <p className="text-xl text-green-700">My educational journey and qualifications</p>
          </div>
          
          <div 
            className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ease-out ${
              visibleElements.has('education-header') 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-8'
            }`}
          >
            {education.map((edu) => {
              const Icon = edu.icon;
              return (
                <div key={edu.degree} 
                     className="bg-lime-50 border-4 border-green-600 rounded-2xl p-6 hover:shadow-lg transition-all duration-500 shadow-lg transform hover:scale-105"
                     style={{ boxShadow: '0 8px 0 #16a34a' }}>
                  
                  {/* Education Header */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-lime-300 border-4 border-green-700 rounded-xl flex items-center justify-center">
                      <Icon className="w-8 h-8 text-green-800" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-lime-400 border-2 border-green-600 rounded-lg px-3 py-1 text-center">
                        <span className="text-green-900 font-bold text-sm">{edu.period}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg text-green-900 font-bold mb-2">{edu.degree}</h3>
                      <p className="text-lime-600 font-bold">{edu.institution}</p>
                      <p className="text-green-700 text-sm">{edu.grade}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-green-800 font-bold text-sm">🏆 Achievements:</h4>
                      <div className="space-y-1">
                        {edu.achievements.map((achievement, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-lime-500 rounded-full"></div>
                            <span className="text-green-700 text-sm">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Experience Section - Fade in animation */}
      <section ref={experienceRef} id="experience" className="py-20 bg-gradient-to-r from-lime-50/90 to-green-100/90">
        <div className="max-w-4xl mx-auto px-6">
          <div 
            className={`text-center space-y-4 mb-16 transition-all duration-1000 ease-out ${
              visibleElements.has('experience-header') 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-8'
            }`}
            data-animate
            id="experience-header"
          >
            <h2 className="text-4xl text-green-900 font-black">🏆 Career Progression</h2>
            <p className="text-xl text-green-700">Level ups in my journey</p>
          </div>
          
          <div 
            className={`space-y-8 transition-all duration-1000 delay-300 ease-out ${
              visibleElements.has('experience-header') 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-8'
            }`}
          >
            {experience.map((exp) => (
              <div key={exp.title} 
                   className="bg-white border-4 border-green-600 rounded-2xl p-8 hover:shadow-lg transition-all duration-700 shadow-lg transform hover:scale-105"
                   style={{ boxShadow: '0 8px 0 #16a34a' }}>
                <div className="grid md:grid-cols-4 gap-6 items-center">
                  {/* Level indicator */}
                  <div className="text-center">
                    <div className={`w-16 h-16 rounded-xl border-4 flex items-center justify-center mx-auto mb-3 font-black ${
                      exp.level === 'Senior' ? 'bg-yellow-300 border-yellow-600 text-yellow-900' :
                      exp.level === 'Mid' ? 'bg-lime-300 border-green-600 text-green-900' :
                      'bg-green-200 border-green-500 text-green-800'
                    }`}>
                      {exp.level === 'Senior' ? '⭐' : exp.level === 'Junior' ? '🟢' : '🔰'}
                    </div>
                    <span className="text-sm text-green-700 font-bold">{exp.level}</span>
                  </div>
                  
                  <div className="md:col-span-3 space-y-3">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <h3 className="text-xl text-green-900 font-bold">{exp.title}</h3>
                      <span className="text-sm bg-lime-200 border-2 border-green-500 text-green-800 px-3 py-1 rounded-lg font-medium">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-lime-600 font-bold">{exp.company}</p>
                    <p className="text-green-700 leading-relaxed">
                      {exp.description.split('\n').map((line, idx) => (
                        <React.Fragment key={idx}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Fade in animation */}
      <section
        ref={contactRef}
        id="contact"
        className="py-20 bg-white text-green-900"
        data-animate
      >
        <div
          className="max-w-4xl mx-auto p-8 border-4 border-green-600 rounded-2xl bg-white shadow-lg"
          style={{ boxShadow: '0 6px 0 #16a34a' }} // Optional extra “pop” shadow
        >
          <h2 className="text-3xl font-bold mb-2 text-center">Get in Touch</h2>
          <p className="mb-8 text-center text-green-700">
            Have a project, question, or just want to say hello? Fill out the form, and I’ll get back to you soon.
          </p>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitQuest();
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* First Column */}
            <div className="space-y-5">
              <div>
                <label className="block mb-1 font-semibold">Your Name</label>
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => handleContactFormChange('name', e.target.value)}
                  className="w-full border-2 border-green-600 rounded-xl p-4 bg-lime-50 text-green-900 font-medium focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Your Email</label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => handleContactFormChange('email', e.target.value)}
                  className="w-full border-2 border-green-600 rounded-xl p-4 bg-lime-50 text-green-900 font-medium focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            </div>

            {/* Second Column */}
            <div className="space-y-5">
              <div>
                <label className="block mb-1 font-semibold">Subject</label>
                <input
                  type="text"
                  value={contactForm.projectType}
                  onChange={(e) => handleContactFormChange('projectType', e.target.value)}
                  className="w-full border-2 border-green-600 rounded-xl p-4 bg-lime-50 text-green-900 font-medium focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Message</label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => handleContactFormChange('message', e.target.value)}
                  rows={5}
                  className="w-full border-2 border-green-600 rounded-xl p-4 bg-lime-50 text-green-900 font-medium focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  required
                />
              </div>
            </div>

            {/* Submit Button spanning both columns */}
            <div className="md:col-span-2 mt-8 flex">
              <button
                type="submit"
                disabled={!contactForm.name || !contactForm.email || !contactForm.message}
                className="w-full py-3 rounded-lg font-bold bg-lime-500 text-green-900 hover:bg-lime-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Message
              </button>
            </div>
          </form>

          {/* Success message */}
          {dialogStep === 3 && (
            <div className="mt-8 text-center bg-lime-100 border border-green-300 p-4 rounded-lg">
              <p className="font-semibold text-green-900 mb-1">Thank you for reaching out!</p>
              <p className="text-green-700">
                I’ve received your message. I’ll get back to you within 24 hours.
              </p>
            </div>
          )}

          {/* Social Links below form */}
          <div className="mt-10 flex justify-center space-x-5">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-3 rounded-full bg-lime-200 hover:bg-lime-300 border border-green-400 transition"
            >
              <Github className="w-6 h-6 text-green-800" />
            </a>

            <a
              href={linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-3 rounded-full bg-lime-200 hover:bg-lime-300 border border-green-400 transition"
            >
              <Linkedin className="w-6 h-6 text-green-800" />
            </a>

            <a
              href={email}
              className="p-3 rounded-full bg-lime-200 hover:bg-lime-300 border border-green-400 transition"
              aria-label="Email"
            >
              <Mail className="w-6 h-6 text-green-800" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer - Game Credits Style */}
      <footer className="bg-green-900 text-green-300 py-8 border-t-4 border-lime-400">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="font-medium">© 2024 • Design by Sowmya, Figma and Perplexity 🌱 • Built with Prompt & Love</p>
        </div>
      </footer>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}
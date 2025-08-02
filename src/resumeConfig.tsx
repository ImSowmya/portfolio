import rr from './assets/RR.jpg';
import insurance from './assets/insurance.jpg'
import bms from './assets/bookmyshow.jpg'

import {Code, Brain, BarChart3, Zap, Database} from 'lucide-react';
import {GraduationCap, Award} from 'lucide-react';

export const skills = [
  { name: 'Python', icon: Code },
  { name: 'Pandas', icon: Code },
  { name: 'Machine Learning', icon: Brain },
  { name: 'Data Viz', icon: BarChart3 },
  { name: 'Deep Learning', icon: Zap },
  { name: 'Scikit-learn', icon: Brain },
  { name: 'TensorFlow', icon: Zap },
  { name: 'PyTorch', icon: Brain },
  { name: 'SQL', icon: Database },
];

export const projects = [
  {
    title: 'Rajasthan Royals - Cricket Data Capture and Data Extraction',
    description: 'Built a Computer Vision based solution to make in real-time mentoring.',
    tech: ['OpenCV', 'NumPy','YOLO', 'Matplotlib'],
    image: rr,
    status: 'Complete',
    
  },
  {
    title: 'EsperCare - Insurance Claim Application Automation',
    description: 'Automated end to end process of Insurance claim submission to reduce turnaround time, enabling faster access to treatment for the patients.',
    tech: [ 'Gemini', 'Milvus', 'RAG', 'Document Processing', 'QnA Chatbot'],
    image: insurance,
    status: 'Active',
    
  },
  {
    title: 'Blenheim Chalcot - Employee Engagement Event Automation',
    description: 'Automated employee engagement by sourcing event data from BookMyShow and deliver image-rich event recommendations via well-designed emails to employees ',
    tech: [ 'LangChain', 'FastAPI', 'OpenAI', 'Power Automate', 'Playwright'],
    image: bms,
    status: 'Complete',
    
  }
];

export const education = [
  {
    degree: ' B.Tech. in Computer Science and Engineering (ML & DS)',
    institution: 'Lovely Professional University',
    period: '2022 - 2025',
    grade: 'CGPA: 8.35',
    achievements: ['Dean\'s List', 'Research Assistant'],
    icon: GraduationCap,
  },
  {
    degree: 'Diploma in Electronics and Communication Engineering ',
    institution: 'Nachimuthu Polytechnic College',
    period: '2019 - 2022',
    grade: 'CGPA: 9.47',
    achievements: ['First Class with Superlative Distinction', 'District level Project Expo Runner-Up'],
    icon: Award,
  }
];

export const experience = [
  {
    title: 'Software Engineer (L2) - Data Scientist',
    company: 'Predigle India',
    period: 'Apr 2025 - Present',
    level: 'Junior',
    description: `● Took ownership of modular pipeline components (LLM prompting, vector DB querying, OCR pre-processing) and drove them from design to production
    ● Enhanced internal tooling and infrastructure for faster experimentation and safe deployment of GenAI workflows
    ● Collaborated with cross-functional teams (product, design, clinical SMEs) to translate business logic and Fabrix rules into scalable AI-powered automation tools`,
  },
  {
    title: 'Data Scientist - Apprentice',
    company: 'Blenheim Chalcot India',
    period: 'Jun 2024 - Apr 2025',
    level: 'Intern',
    description: `● Collaborated on cross-functional tools, managing workflows from requirement to delivery across HR, L&D and Finance
    ● Designed and deployed automation flows for the CARA bot, enabling personalized career development guidance for 400+ employees
    ● Built low-code solutions to streamline hiring, pre-onboarding, and engagement, reducing manual effort and turnaround time `,
  }
];

export const email = "mailto:sowmya.reachout@gmail.com"
export const linkedIn = "https://linkedin.com/in/sowmyaml"
export const github = "https://github.com/ImSowmya"

export const bio = (
  <>
    Sure, I’m passionate about machine learning and AI but honestly, I’m in it for the{" "}
    <span className="text-lime-600 font-bold">thrill</span>, the{" "}
    <span className="text-lime-600 font-bold">Coolest in the room</span> factor, and yes, it pays my bills (plus, impressing myself isn’t so bad either).
  </>
);
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Code, Cloud, Terminal, Database, Globe, Cpu, BarChart3 } from 'lucide-react';
import NeuralBackground from '../3d/NeuralBackground';

const skillsData = [
  {
    category: "Artificial Intelligence",
    icon: <Brain className="w-8 h-8" />,
    skills: [
      { name: "TensorFlow & PyTorch", level: 90 },
      { name: "OpenAI API Integration", level: 95 },
      { name: "Computer Vision", level: 85 },
      { name: "NLP / LLMs", level: 92 }
    ],
    color: "from-blue-500 to-cyan-400"
  },
  {
    category: "MetaQuotes MT5",
    icon: <BarChart3 className="w-8 h-8" />,
    skills: [
      { name: "MQL5 Programming", level: 98 },
      { name: "Algorithmic Trading", level: 95 },
      { name: "Expert Advisors (EA)", level: 95 },
      { name: "Custom Indicators", level: 90 }
    ],
    color: "from-green-500 to-emerald-400"
  },
  {
    category: "Web Development",
    icon: <Globe className="w-8 h-8" />,
    skills: [
      { name: "React & TypeScript", level: 95 },
      { name: "Node.js & Express", level: 90 },
      { name: "Three.js & WebGL", level: 85 },
      { name: "Modern UI/UX", level: 92 }
    ],
    color: "from-purple-500 to-pink-400"
  },
  {
    category: "Cloud & DevOps",
    icon: <Cloud className="w-8 h-8" />,
    skills: [
      { name: "AWS Services", level: 88 },
      { name: "Docker & Kubernetes", level: 85 },
      { name: "CI/CD Pipelines", level: 85 },
      { name: "Serverless Arch", level: 90 }
    ],
    color: "from-orange-500 to-red-400"
  }
];

const SkillCard = ({ category, icon, skills, color, index }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="glass-card p-6 relative overflow-hidden group"
    >
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${color}`} />
      
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-3 rounded-lg bg-gradient-to-br ${color} bg-opacity-10 text-white`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold">{category}</h3>
      </div>

      <div className="space-y-4">
        {skills.map((skill: any, idx: number) => (
          <div key={idx}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-300">{skill.name}</span>
              <span className="text-sm text-gray-400">{skill.level}%</span>
            </div>
            <div className="w-full bg-dark-300 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: 0.5 + (idx * 0.1) }}
                className={`h-full rounded-full bg-gradient-to-r ${color}`}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const Skills: React.FC = () => {
  return (
    <section className="py-20 bg-secondary relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive skill set bridging the gap between advanced AI algorithms, 
            financial trading systems, and modern web technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsData.map((skill, index) => (
            <SkillCard key={index} {...skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

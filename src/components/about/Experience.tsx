import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase } from 'lucide-react';

const experiences = [
  {
    id: 1,
    role: "Senior AI Engineer",
    company: "Tech Solutions Indonesia",
    period: "2023 - Present",
    description: "Leading the development of custom AI models for enterprise clients. Implementing LLM integration and computer vision solutions."
  },
  {
    id: 2,
    role: "MQL5 Developer & Algo Trader",
    company: "Freelance / Independent",
    period: "2021 - 2023",
    description: "Developed high-frequency trading algorithms for MetaTrader 5. Optimized EA performance and implemented risk management systems."
  },
  {
    id: 3,
    role: "Full Stack Web Developer",
    company: "Digital Creative Agency",
    period: "2019 - 2021",
    description: "Built responsive web applications using React, Node.js, and AWS. Managed database architecture and API integrations."
  }
];

const Experience: React.FC = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Professional <span className="text-gradient">Journey</span></h2>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-start to-primary-end transform -translate-x-1/2 hidden md:block" />
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className="flex-1">
                  <div className={`glass-card p-6 relative ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <div className="flex items-center gap-2 mb-2 text-accent justify-start md:justify-end">
                      <Calendar size={16} />
                      <span className="text-sm font-medium">{exp.period}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
                    <div className="flex items-center gap-2 text-gray-400 mb-4 justify-start md:justify-end">
                      <Briefcase size={16} />
                      <span>{exp.company}</span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>

                {/* Center Point */}
                <div className="relative flex items-center justify-center md:w-0">
                  <div className="w-4 h-4 bg-accent rounded-full border-4 border-dark-200 z-10 shadow-[0_0_10px_rgba(0,212,255,0.8)]" />
                </div>

                {/* Spacer */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

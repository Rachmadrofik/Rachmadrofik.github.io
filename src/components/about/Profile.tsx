import React from 'react';
import { MapPin, Mail, Phone, Calendar, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import profileImg from '../../assets/rachmad.png';

const Profile: React.FC = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="glass-card p-8 md:p-12 max-w-5xl mx-auto flex flex-col md:flex-row gap-10 items-center">
          
          {/* Profile Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-start to-primary-end rounded-full animate-pulse blur-xl opacity-50" />
            <img 
              src={profileImg} 
              alt="Rachmad Rofik" 
              className="w-full h-full object-cover rounded-full border-4 border-white/10 relative z-10"
            />
          </motion.div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Rachmad Rofik</h2>
              <p className="text-xl text-accent mb-6">AI & Digital Technology Expert</p>
              
              <p className="text-gray-300 mb-8 leading-relaxed">
                I am a passionate technology expert based in Sekapuk, Indonesia, specializing in Artificial Intelligence, 
                Algorithmic Trading (MT5), and modern Web Development. With a deep understanding of cloud infrastructure 
                and data processing, I build scalable, high-performance solutions that drive business growth.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-gray-400 justify-center md:justify-start">
                  <MapPin className="text-primary-start" size={20} />
                  <span>Sekapuk, Indonesia</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 justify-center md:justify-start">
                  <Briefcase className="text-primary-start" size={20} />
                  <span>Available for Freelance</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 justify-center md:justify-start">
                  <Mail className="text-primary-start" size={20} />
                  <span>cs@jaydana.my.id</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 justify-center md:justify-start">
                  <Phone className="text-primary-start" size={20} />
                  <span>+62 851-7991-0389</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Profile;

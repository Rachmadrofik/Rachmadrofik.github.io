import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageCircle, Loader2 } from 'lucide-react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
  const whatsappMessage = import.meta.env.VITE_WHATSAPP_MESSAGE;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 3000);
    }, 1500);
  };

  const handleWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
      
      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="glass-card p-8"
      >
        <h3 className="text-2xl font-bold mb-6">Send Message</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-dark-300 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-dark-300 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
            <textarea
              id="message"
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full bg-dark-300 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
              placeholder="Tell me about your project..."
            />
          </div>
          
          <button
            type="submit"
            disabled={loading || sent}
            className={`w-full py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
              sent 
                ? 'bg-green-500 text-white' 
                : 'bg-gradient-to-r from-primary-start to-primary-end text-white hover:shadow-lg'
            }`}
          >
            {loading ? <Loader2 className="animate-spin" /> : sent ? 'Message Sent!' : (
              <>
                Send Message <Send size={18} />
              </>
            )}
          </button>
        </form>
      </motion.div>

      {/* Direct Contact Info */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex flex-col justify-center space-y-8"
      >
        <div className="glass-card p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Fast Response?</h3>
          <p className="text-gray-400 mb-6">
            Need immediate assistance or want to discuss a project right away? Chat with me on WhatsApp!
          </p>
          <button
            onClick={handleWhatsApp}
            className="w-full py-4 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-lg font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg"
          >
            <MessageCircle size={24} />
            Chat on WhatsApp
          </button>
        </div>

        <div className="glass-card p-8">
          <h3 className="text-xl font-bold mb-4">Location</h3>
          <div className="w-full h-48 rounded-lg overflow-hidden border border-white/10">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31686.99616035956!2d112.5290947!3d-6.9472314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e77e2eb87254881%3A0x600c01777011d1e4!2sSekapuk%2C%20Ujungpangkah%2C%20Gresik%20Regency%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1675234567890!5m2!1sen!2sid" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Sekapuk Location"
            ></iframe>
          </div>
          <p className="mt-4 text-gray-400 text-center">
            Based in Sekapuk, Indonesia<br/>
            Available for remote work worldwide
          </p>
        </div>
      </motion.div>

    </div>
  );
};

export default ContactForm;

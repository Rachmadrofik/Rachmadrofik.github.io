import React from 'react';
import ContactForm from '../components/contact/ContactForm';

const Contact: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen pb-20">
      <div className="container mx-auto px-4 text-center mb-10">
        <h1 className="text-4xl md:text-6xl mb-6 font-bold">Get In <span className="text-gradient">Touch</span></h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Have a project in mind? Let's discuss how we can build something amazing together.
        </p>
      </div>
      <div className="container mx-auto px-4">
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;

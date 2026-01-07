import React, { useState } from 'react';
import { Linkedin, Mail, X } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Hero: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookRecommendation, setBookRecommendation] = useState('');
  const [submitterName, setSubmitterName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmitRecommendation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      emailjs.init('iUztHDq2ElQ2Kjzkr'); 

      const result = await emailjs.send(
        'service_czncobf', 
        'template_t2uxduc', 
        {
          book_recommendation: bookRecommendation,
          submitter_name: submitterName || 'Anonymous',
          to_email: 'vihaangupta@college.harvard.edu',
        }
      );

      console.log('Email sent successfully:', result);
      setSubmitStatus('success');
      setBookRecommendation('');
      setSubmitterName(''); // Reset the name field
      
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitStatus('idle');
      }, 2000);
      
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section id="home" className="h-full flex items-center relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 text-center lg:text-left lg:-translate-y-2 lg:translate-x-2">
            <div className="space-y-4 max-w-lg">
              <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
                Building meaningful systems for messy, human contexts.
                </h1>
              <p className="text-sm md:text-base text-black/70 leading-relaxed">
                Hey! I&apos;m Vihaan, a builder @ Harvard studying CS and Philosophy. I'm interested in studying the intersection of technology and society. Currently, I'm serving as the Executive Director of HCS Tech for Social Good, and a TF for CS 1200 (Data Structures and Algorithms).
                Feel free to reach out if you'd like to chat or{' '}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="underline underline-offset-4 decoration-black/30 hover:decoration-black transition-colors duration-200"
                >
                  swap book recommendations!
                </button>
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              {[
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/vihaan-gupta-1595332a7', text: 'LinkedIn' },
                  { icon: Mail, href: 'mailto:vihaangupta@college.harvard.edu', text: 'Email' }
                ].map(({ icon: Icon, href, text }) => (
                <a
                    key={text}
                  href={href}
                    className="flex items-center gap-2 px-4 py-2.5 border border-black/15 rounded-full bg-white/80 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-black/40 text-xs md:text-sm"
                >
                    <Icon size={16} className="text-black/70" />
                    <span className="font-medium">{text}</span>
                </a>
              ))}
            </div>
          </div>

            <div className="flex justify-center">
              <div className="w-32 sm:w-40 md:w-48 lg:w-56 aspect-[3/4]">
              <img 
                src="/images/my-notion-face-transparent.png"
                alt="Vihaan Gupta" 
                  className="w-full h-full object-cover mix-blend-multiply"
              />
              </div>
            </div>
          </div>
      </div>
    </section>

    {isModalOpen && (
      <div className="fixed inset-0 bg-white/90 flex items-center justify-center z-50 p-4">
        <div className="bg-white border border-black/20 p-8 max-w-md w-full relative">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 text-black/60 hover:text-black transition-colors duration-300"
          >
            <X size={24} />
          </button>
          
          <h2 className="text-2xl font-bold mb-6 text-black">Recommend a Book</h2>
            <p className="text-black/60 mb-6">
              I&apos;d love to hear about a book that changed how you see the world.
            </p>
          
          <form onSubmit={handleSubmitRecommendation} className="space-y-6">
            <div>
              <label htmlFor="submitter-name" className="block text-sm font-medium text-black/80 mb-2">
                Your Name:
              </label>
              <input
                type="text"
                id="submitter-name"
                value={submitterName}
                onChange={(e) => setSubmitterName(e.target.value)}
                className="w-full p-3 border border-black/20 rounded-sm bg-white text-black placeholder-black/30 focus:outline-none focus:border-black/40 transition-colors duration-300"
                placeholder="(optional)"
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label htmlFor="book-recommendation" className="block text-sm font-medium text-black/80 mb-2">
                Book Title & Author:
              </label>
              <input
                type="text"
                id="book-recommendation"
                value={bookRecommendation}
                onChange={(e) => setBookRecommendation(e.target.value)}
                className="w-full p-3 border border-black/20 rounded-sm bg-white text-black placeholder-black/30 focus:outline-none focus:border-black/40 transition-colors duration-300"
                required
                disabled={isSubmitting}
              />
            </div>

            {submitStatus === 'success' && (
              <div className="p-3 bg-black/10 border border-black/20 rounded-sm text-black text-sm">
                Thank you! Your book recommendation has been sent successfully.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="p-3 bg-black/5 border border-black/20 rounded-sm text-black/60 text-sm">
                Sorry, there was an error sending your recommendation. Please try again.
              </div>
            )}
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 border border-black/20 text-black/70 hover:border-black/40 hover:text-black hover:bg-black/5 transition-colors duration-300"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-black text-white hover:bg-black/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </>
  );
};

export default Hero; 
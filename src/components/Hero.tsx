import React, { useState } from 'react';
import { ChevronDown, Linkedin, Mail, X } from 'lucide-react';
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
      <section id="home" className="h-[calc(100vh-6rem)] flex items-center relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
          <div className="flex items-center justify-between gap-24 lg:gap-32">
            {/* Text Content - Left Side */}
            <div className="flex-1 space-y-8 relative z-10 text-left">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x leading-tight">
                  Vihaan Gupta
                </h1>
                <p className="text-sm md:text-base lg:text-lg text-white/50 max-w-2xl leading-relaxed font-sans">
                  Hi! I'm Vihaan, a rising Junior at Harvard College, studying Computer Science and Philosophy. 
                  I'm passionate about human-centered design and creating social impact through technology.
                  In my free time, I love <button onClick={() => setIsModalOpen(true)} className="hover:text-purple-300 transition-colors duration-300">reading philosophy</button>, going to the gym, and exploring new restaurants. Happy to connect!
                </p>
              </div>
            
            <div className="flex space-x-4 pt-4">
              {[
                { icon: Linkedin, href: "https://www.linkedin.com/in/vihaan-gupta-1595332a7", text: "LinkedIn" },
                { icon: Mail, href: "mailto:vihaangupta@college.harvard.edu", text: "Contact" }
              ].map(({ icon: Icon, href, text }, i) => (
                <a
                  key={i}
                  href={href}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105 group"
                >
                  <Icon size={20} className="group-hover:text-purple-400 transition-colors duration-300" />
                  <span className="text-sm text-white/70 group-hover:text-white transition-colors duration-300">{text}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Profile Picture - Right Side */}
          <div className="flex-shrink-0 relative">
            <div className="relative group perspective-1000">
              <div className="relative w-56 h-56 md:w-[20rem] md:h-[20rem] lg:w-[24rem] lg:h-[24rem] transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                {/* Front Side - Original Image */}
                <div className="absolute inset-0 backface-hidden">
                  <img 
                    src="/images/Group 3.png"
                    alt="Vihaan Gupta" 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  <div className="absolute top-4 right-4 w-4 h-4 bg-purple-400 rounded-full animate-ping opacity-75"></div>
                  <div className="absolute bottom-8 left-8 w-6 h-6 bg-pink-400 rounded-full animate-pulse opacity-60"></div>
                  <div className="absolute top-1/3 left-4 w-3 h-3 bg-blue-400 rounded-full animate-bounce opacity-80"></div>
                </div>
                
                {/* Back Side - Notion Face */}
                <div className="absolute inset-0 backface-hidden rotate-y-180">
                  <img 
                    src="/images/my-notion-face-transparent.png"
                    alt="Vihaan Gupta - Notion Style" 
                    className="w-full h-full object-cover scale-110"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-purple-400" onClick={() => {
            const experienceSection = document.getElementById('experience');
            if (experienceSection) {
              experienceSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}/>
        </div>
      </div>
    </section>

    {/* Book Recommendation Modal */}
    {isModalOpen && (
      <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
        <div className="bg-[#1a1a1a] border border-white/10 p-8 rounded-lg shadow-xl max-w-md w-full relative">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors duration-300"
          >
            <X size={24} />
          </button>
          
          <h2 className="text-2xl font-bold mb-6 text-white">Recommend a Book</h2>
          <p className="text-white/70 mb-6">I'd love to hear about a book that has influenced you or that you think I should read!</p>
          
          <form onSubmit={handleSubmitRecommendation} className="space-y-6">
            <div>
              <label htmlFor="submitter-name" className="block text-sm font-medium text-white/90 mb-2">
                Your Name:
              </label>
              <input
                type="text"
                id="submitter-name"
                value={submitterName}
                onChange={(e) => setSubmitterName(e.target.value)}
                className="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 transition-colors duration-300"
                placeholder="(optional)"
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label htmlFor="book-recommendation" className="block text-sm font-medium text-white/90 mb-2">
                Book Title & Author:
              </label>
              <input
                type="text"
                id="book-recommendation"
                value={bookRecommendation}
                onChange={(e) => setBookRecommendation(e.target.value)}
                className="w-full p-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 transition-colors duration-300"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-sm">
                Thank you! Your book recommendation has been sent successfully.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
                Sorry, there was an error sending your recommendation. Please try again.
              </div>
            )}
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 bg-white/10 text-white/70 rounded-lg hover:bg-white/20 transition-colors duration-300"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
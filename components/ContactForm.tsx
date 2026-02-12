import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, Instagram, MessageSquare, Loader2, Box } from 'lucide-react';
import { DesignSuggestion, ContactFormData, StudioDetails } from '../types';

interface ContactFormProps {
  initialDesign?: DesignSuggestion | null;
  onSendMessage: (data: ContactFormData) => void;
  studioDetails: StudioDetails;
}

const ContactForm: React.FC<ContactFormProps> = ({ initialDesign, onSendMessage, studioDetails }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Residential',
    message: ''
  });

  useEffect(() => {
    if (initialDesign) {
      setFormData(prev => ({
        ...prev,
        message: `I would like to discuss the AI-generated ${initialDesign.style} concept.`
      }));
    }
  }, [initialDesign]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const newQuery: ContactFormData = {
      ...formData,
      id: `query-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      timestamp: Date.now(),
      aiDesign: initialDesign || undefined,
      status: 'New'
    };
    
    onSendMessage(newQuery);
    
    setTimeout(() => {
      setIsSending(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', projectType: 'Residential', message: '' });
    }, 800);
  };

  return (
    <section id="contact" className="py-24 md:py-48 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-32">
          <div className="flex flex-col h-full">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2 }}
            >
              <h2 className="text-5xl sm:text-7xl md:text-8xl font-serif font-bold mb-10 md:mb-14 leading-tight text-white drop-shadow-2xl">
                Initiate Your<br />
                <span className="text-[#1FAE9B] italic">Curation</span>
              </h2>
              <p className="text-white/40 mb-16 md:mb-24 text-lg md:text-xl font-light leading-relaxed max-w-lg italic border-l-2 border-[#1FAE9B]/20 pl-8">
                Connect with our senior architectural team. We specialize in transforming abstract visions into profound structural realities.
              </p>
            </motion.div>

            <div className="space-y-10 md:space-y-14 flex-grow">
              <div className="flex gap-8 items-start group">
                <div className="p-5 glass-card rounded-2xl group-hover:bg-[#1FAE9B] group-hover:border-[#1FAE9B] transition-all duration-500">
                  <Mail className="text-[#1FAE9B] group-hover:text-white" size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.5em] mb-2 text-[#1FAE9B]">Vault Email</h4>
                  <a href={`mailto:${studioDetails.email}`} className="text-white/80 text-lg font-bold hover:text-[#1FAE9B] transition-colors cursor-pointer block">{studioDetails.email}</a>
                </div>
              </div>

              <div className="flex gap-8 items-start group">
                <div className="p-5 glass-card rounded-2xl group-hover:bg-[#1FAE9B] group-hover:border-[#1FAE9B] transition-all duration-500">
                  <MessageSquare className="text-[#1FAE9B] group-hover:text-white" size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.5em] mb-2 text-[#1FAE9B]">Secure Line</h4>
                  <a href={studioDetails.whatsapp} target="_blank" rel="noopener noreferrer" className="text-white/80 text-lg font-bold hover:text-[#1FAE9B] transition-colors cursor-pointer block">{studioDetails.phone}</a>
                </div>
              </div>

              <div className="flex gap-8 items-start group">
                <div className="p-5 glass-card rounded-2xl group-hover:bg-[#1FAE9B] group-hover:border-[#1FAE9B] transition-all duration-500">
                  <MapPin className="text-[#1FAE9B] group-hover:text-white" size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.5em] mb-2 text-[#1FAE9B]">Studio HQ</h4>
                  <p className="text-white/80 text-lg font-bold leading-relaxed">{studioDetails.address}</p>
                </div>
              </div>
            </div>

            <div className="mt-20 md:mt-32 pt-10 border-t border-white/5">
               <div className="flex gap-10 md:gap-14">
                <a 
                  href={studioDetails.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-white/30 hover:text-[#1FAE9B] transition-all duration-500 group"
                >
                  <Instagram size={20} className="group-hover:rotate-12 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">Instagram</span>
                </a>
              </div>
            </div>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key="success"
                  className="glass-ios p-12 md:p-20 rounded-[2.5rem] border border-white/10 text-center py-32 md:py-48 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
                >
                  <CheckCircle className="text-[#1FAE9B] w-20 h-20 md:w-24 md:h-24 mx-auto mb-10" />
                  <h3 className="text-4xl md:text-5xl font-serif font-bold mb-6 italic text-white drop-shadow-lg tracking-tight">Vison Captured</h3>
                  <p className="text-white/40 mb-12 font-light text-base md:text-lg max-w-sm mx-auto leading-relaxed italic">Our studio vault has documented your requirements. An architectural consultant will contact you shortly.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="text-[#1FAE9B] font-black uppercase tracking-[0.5em] text-[11px] border-b-2 border-[#1FAE9B] pb-2 hover:text-white hover:border-white transition-all"
                  >
                    Refresh Consultation
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  key="form"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-ios p-10 md:p-16 rounded-[2.5rem] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.6)] relative overflow-hidden"
                >
                  {initialDesign && (
                    <div className="mb-10 p-6 bg-[#1FAE9B]/10 border border-[#1FAE9B]/20 rounded-2xl backdrop-blur-md">
                      <p className="text-[9px] uppercase tracking-[0.6em] text-[#1FAE9B] font-black mb-2">Attached AI Masterpiece</p>
                      <p className="text-sm text-white/70 font-bold italic leading-relaxed">"{initialDesign.style}"</p>
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-black ml-1">Identity</label>
                        <input required type="text" placeholder="Full Name" className="w-full h-16 rounded-xl px-6 py-4 outline-none" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-black ml-1">Digital Address</label>
                        <input required type="email" placeholder="Email" className="w-full h-16 rounded-xl px-6 py-4 outline-none" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-black ml-1">Communication</label>
                        <input required type="tel" placeholder="Phone" className="w-full h-16 rounded-xl px-6 py-4 outline-none" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-black ml-1">Sector</label>
                        <div className="relative">
                            <select className="w-full h-16 rounded-xl px-6 py-4 appearance-none cursor-pointer font-bold" value={formData.projectType} onChange={(e) => setFormData({...formData, projectType: e.target.value})}>
                            <option>Residential</option>
                            <option>Commercial</option>
                            <option>Hospitality</option>
                            </select>
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none opacity-30">
                                <Box size={14} />
                            </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-black ml-1">Spatial Requirements</label>
                      <textarea required rows={5} className="w-full rounded-xl px-6 py-5 outline-none resize-none italic font-light" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="Describe your structural requirements..." />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSending}
                      className="w-full py-6 md:py-7 bg-[#1FAE9B] text-white font-black uppercase tracking-[0.5em] text-[11px] rounded-xl hover:bg-white hover:text-[#1FAE9B] transition-all flex items-center justify-center gap-5 shadow-2xl shadow-[#1FAE9B]/30 disabled:opacity-50"
                    >
                      {isSending ? <Loader2 className="animate-spin" size={16} /> : <>Transmit Request <Send size={16} /></>}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
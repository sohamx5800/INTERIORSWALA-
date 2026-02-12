import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, FileText, Search, Lightbulb, Quote } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <div className="space-y-32 md:space-y-64">
      {/* WHO WE ARE - TRIPTYCH EDITION */}
      <section id="about" className="relative py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-8xl font-serif text-white uppercase tracking-[0.15em] md:tracking-[0.2em] mb-4">
                Who <span className="text-[#1FAE9B] italic">We Are</span>
              </h2>
              <div className="w-16 md:w-24 h-[1px] bg-[#1FAE9B]/30 mx-auto" />
            </motion.div>
            
            {/* PANORAMA ARCH TRIPTYCH - Optimized for Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[450px] md:h-[600px] mb-24 relative">
              {[0, 1, 2].map((i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative overflow-hidden arch-top border border-white/10 shadow-2xl group ${i > 0 ? 'hidden md:block' : 'block'}`}
                >
                  {/* Image logic: Full width on mobile (i=0), 300% width on desktop */}
                  <div className="absolute inset-0 w-full md:w-[300%] h-full transition-transform duration-[3s] group-hover:scale-105" 
                       style={{ 
                         left: window.innerWidth < 768 ? '0%' : `-${i * 100}%`,
                         backgroundImage: 'url("https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=90&w=2000")',
                         backgroundSize: 'cover',
                         backgroundPosition: 'center'
                       }}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000" />
                  </div>
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.5em] text-white/40 font-black whitespace-nowrap">
                    {window.innerWidth < 768 ? 'Unified Vision' : `Perspective ${i + 1}`}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CONTENT BLOCK - EXECUTIVE STYLE */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-7 space-y-8"
              >
                <div className="glass-ios p-8 md:p-14 rounded-[2rem] border-l-4 border-l-[#1FAE9B]">
                   <h3 className="text-3xl md:text-4xl font-serif text-white mb-8 leading-tight">
                    Crafting <span className="text-[#1FAE9B]">Exceptional Spaces</span> in the heart of Siliguri.
                  </h3>
                  <p className="text-white/60 text-base md:text-lg font-light leading-relaxed">
                    <span className="text-white font-semibold">InteriorsWala</span> is a Siliguri-based interior design studio creating refined, functional living spaces. We specialize in premium interiors that balance aesthetics, comfort, and long-term value, executed with precision and transparency.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-5"
              >
                <div className="glass-card p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden group">
                  <Quote className="absolute -top-4 -right-4 text-[#1FAE9B]/10 w-24 h-24 md:w-32 md:h-32 rotate-12" />
                  <h4 className="text-[10px] uppercase tracking-[0.6em] text-[#1FAE9B] font-black mb-8 border-b border-[#1FAE9B]/20 pb-4 inline-block">Design Philosophy</h4>
                  <p className="text-white/50 text-sm md:text-base leading-relaxed font-light italic relative z-10">
                    "Every home begins with a conversation, not a catalog. We explore your taste and lifestyle so every design decision is intentional and future-ready. Luxury is about spaces that feel personal."
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT SETS US APART - ARCHITECTURAL INTEGRITY */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-20"
          >
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-serif text-white uppercase tracking-[0.1em] leading-[1.1]">
              Architectural <br /><span className="text-[#1FAE9B] italic">Integrity</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="w-full"
            >
              <div className="aspect-[4/3] glass-ios rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl mb-12 group">
                <img 
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=90&w=1200" 
                  alt="Luxury Living" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                />
              </div>
              <p className="text-white/40 text-lg md:text-xl leading-relaxed font-light italic pl-8 md:pl-10 border-l-2 border-[#1FAE9B]/20 backdrop-blur-sm">
                "We don't believe luxury should come with confusion or compromises. Our approach is built on clarity and honesty."
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 md:gap-8">
              {[
                { 
                  icon: <ShieldCheck className="text-[#1FAE9B]" size={20} />, 
                  title: "Complete Transparency", 
                  desc: "Absolute honesty from first contact. Every material is clearly documented." 
                },
                { 
                  icon: <FileText className="text-[#1FAE9B]" size={20} />, 
                  title: "Logical Quotations", 
                  desc: "Prepared with clarity ensures you understand exactly where your investment goes." 
                },
                { 
                  icon: <Search className="text-[#1FAE9B]" size={20} />, 
                  title: "Design Research", 
                  desc: "Every project is uniquely researched based on your specific lifestyle DNA." 
                },
                { 
                  icon: <Lightbulb className="text-[#1FAE9B]" size={20} />, 
                  title: "Purposeful Design", 
                  desc: "No unnecessary additions. Every structural decision serves a purpose." 
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6 md:p-10 rounded-2xl md:rounded-3xl flex gap-6 md:gap-8 items-center hover:border-[#1FAE9B]/40 group"
                >
                  <div className="p-4 md:p-5 bg-[#1FAE9B]/10 rounded-xl md:rounded-2xl backdrop-blur-md group-hover:bg-[#1FAE9B] group-hover:text-white transition-all duration-500 text-[#1FAE9B] flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-white mb-2">{item.title}</h4>
                    <p className="text-white/30 text-[12px] md:text-sm leading-relaxed font-medium italic">"{item.desc}"</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;
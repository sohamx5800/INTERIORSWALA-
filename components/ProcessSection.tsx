import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: "01",
    title: "Site Analysis",
    subtitle: "Requirement Discovery",
    desc: "Every project begins with a detailed site visit where our designers analyze the architecture, lifestyle needs, and realistic budget alignment.",
    img: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=90&w=1000"
  },
  {
    number: "02",
    title: "Layout Planning",
    subtitle: "Strategic Drafting",
    desc: "We develop aesthetic layouts and functional blueprints. A dedicated WhatsApp stream ensures instant transparent communication with the design team.",
    img: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&q=90&w=1000"
  },
  {
    number: "03",
    title: "Material Lock",
    subtitle: "Quotation Finalization",
    desc: "A detailed material palette is locked. We finalize the best wood, stone, and fabric samples at this stage to prevent mid-project confusion.",
    img: "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&q=90&w=1000"
  },
  {
    number: "04",
    title: "Site Management",
    subtitle: "Rigorous Supervision",
    desc: "The construction phase. Structured site supervision with regular 'Work Updates' photos ensuring the man on the site delivers perfection.",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=90&w=1000"
  },
  {
    number: "05",
    title: "Stage Payments",
    subtitle: "Financial Peace of Mind",
    desc: "Payment stages are released only after verified completion of scope. Accountability is clear—you only pay for work that is visible and verified.",
    img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=90&w=1000"
  },
  {
    number: "06",
    title: "The Handover",
    subtitle: "Quality Inspection",
    desc: "Final inspection against our professional checklist. The space is handed over to the client only when every fitting meets our luxury studio benchmark.",
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=90&w=1000"
  }
];

const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="relative py-24 md:py-48 bg-transparent will-change-transform">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-32">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.5 }}
            className="text-5xl md:text-8xl font-serif text-white uppercase mb-8"
          >
            Our Turnkey <span className="text-[#1FAE9B] italic">Process</span>
          </motion.h2>
          <div className="w-24 h-[1px] bg-[#1FAE9B]/30 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col group"
            >
              <div className="aspect-[10/11] glass-ios rounded-[2.5rem] overflow-hidden mb-10 border border-white/5 relative shadow-2xl">
                <img src={step.img} alt={step.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
                <div className="absolute top-8 left-8 w-14 h-14 glass-ios rounded-2xl flex items-center justify-center border border-white/20 backdrop-blur-xl group-hover:bg-[#1FAE9B] group-hover:border-[#1FAE9B] transition-all duration-500">
                  <span className="text-[11px] font-black text-[#1FAE9B] group-hover:text-white tracking-widest">{step.number}</span>
                </div>
              </div>
              <div className="px-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#1FAE9B] mb-3">{step.subtitle}</h4>
                <h3 className="text-3xl font-serif font-bold italic text-white mb-6 group-hover:text-[#1FAE9B] transition-colors">{step.title}</h3>
                <p className="text-white/30 text-sm leading-relaxed font-medium italic border-l border-white/10 pl-6">
                  "{step.desc}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
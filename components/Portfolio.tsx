import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { Project } from '../types';

interface PortfolioProps {
  projects: Project[];
}

const Portfolio: React.FC<PortfolioProps> = ({ projects }) => {
  return (
    <div className="max-w-7xl mx-auto py-24 bg-transparent relative z-10">
      <div className="mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="flex flex-col items-center text-center px-6"
        >
          <span className="text-[12px] text-[#1FAE9B] font-black uppercase tracking-[0.7em] mb-8 block drop-shadow-lg text-glow">Archive</span>
          <h2 className="text-5xl md:text-8xl font-serif font-bold italic mb-8 text-white drop-shadow-2xl">
            Selected <span className="text-white/20">Portfolio</span>
          </h2>
          <div className="w-20 h-[1.5px] bg-[#1FAE9B]/40" />
        </motion.div>
      </div>

      <div className="space-y-48 md:space-y-80 px-6">
        {projects.map((project, index) => (
          <PortfolioSection key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};

const PortfolioSection: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 md:gap-32`}>
      {/* Project Image Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full md:w-3/5 relative group"
      >
        <div className="relative aspect-[16/10] overflow-hidden arch-top shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] border border-white/10 backdrop-blur-sm">
          <motion.img 
            src={project.image} 
            alt={project.title}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 3 }}
            className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 opacity-80 group-hover:opacity-100"
          />
          {/* Subtler overlay to blend with 3D bg */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-0 transition-opacity duration-700" />
        </div>
        
        {/* Glassy Action Indicator */}
        <div className={`absolute -bottom-8 ${isEven ? '-right-8' : '-left-8'} glass-ios p-6 md:p-8 hidden md:flex items-center justify-center rounded-2xl shadow-2xl border border-white/10 group-hover:scale-110 transition-transform duration-500`}>
           <ArrowUpRight size={28} className="text-[#1FAE9B]" />
        </div>
      </motion.div>

      {/* Project Info Container */}
      <motion.div 
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="w-full md:w-2/5 flex flex-col items-start glass-ios p-8 md:p-12 rounded-[2rem] border border-white/5 shadow-2xl"
      >
        <span className="text-[#1FAE9B] font-black uppercase tracking-[0.5em] text-[10px] mb-6 drop-shadow-sm">{project.category}</span>
        <h3 className="text-4xl md:text-6xl font-serif font-bold italic mb-8 leading-tight text-white drop-shadow-lg tracking-tight">{project.title}</h3>
        <p className="text-white/50 text-base md:text-lg font-light leading-relaxed mb-12 max-w-md italic border-l-2 border-[#1FAE9B]/20 pl-8">
          "{project.description}"
        </p>
        
        {project.link ? (
          <a 
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-black uppercase tracking-[0.4em] flex items-center gap-5 group bg-white/5 border border-white/10 px-8 py-5 rounded-full hover:bg-[#1FAE9B] hover:border-[#1FAE9B] transition-all duration-700 text-white shadow-xl backdrop-blur-md"
          >
            Explore Experience
            <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
          </a>
        ) : (
          <div className="text-[11px] font-black uppercase tracking-[0.4em] flex items-center gap-5 group opacity-30 text-white/40 italic">
            Private Archive
            <div className="w-12 h-[1px] bg-white/20" />
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Portfolio;

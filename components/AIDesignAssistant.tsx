import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Loader2, Palette, Box, ArrowRight, AlertCircle } from 'lucide-react';
import { getDesignSuggestions } from '../services/geminiService';
import { DesignSuggestion } from '../types';

interface AIDesignAssistantProps {
  onQuoteRequest: (design: DesignSuggestion) => void;
}

const AIDesignAssistant: React.FC<AIDesignAssistantProps> = ({ onQuoteRequest }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestion, setSuggestion] = useState<DesignSuggestion | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const result = await getDesignSuggestions(prompt);
      setSuggestion(result);
    } catch (err: any) {
      console.error("AI Assistant Error:", err);
      setError(err.message || "Something went wrong. Please check your connection and API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-designer" className="py-24 md:py-32 bg-transparent relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1FAE9B]/5 blur-[200px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-6 py-2 bg-[#1FAE9B]/10 rounded-full text-[#1FAE9B] mb-6 backdrop-blur-md border border-[#1FAE9B]/20"
          >
            <Sparkles size={14} />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] drop-shadow-sm">Studio Artificial Intelligence</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-4xl md:text-7xl font-serif font-bold mb-6 tracking-tight text-white drop-shadow-2xl"
          >
            Digital <span className="text-[#1FAE9B] italic">Architect</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="text-white/40 max-w-2xl mx-auto font-light leading-relaxed text-sm md:text-base backdrop-blur-[1px]"
          >
            Merge computational precision with architectural vision. Describe your dream atmosphere and witness our intelligence layer generate bespoke structural DNA.
          </motion.p>
        </div>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          onSubmit={handleSubmit} 
          className="relative mb-12 max-w-3xl mx-auto"
        >
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="E.g. Brutalist Penthouse with Organic Textures..."
            className="w-full glass-ios rounded-2xl py-6 md:py-8 px-8 md:px-10 text-white focus:outline-none transition-all placeholder:text-white/10 text-base md:text-lg"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 p-4 bg-[#1FAE9B] rounded-xl text-white hover:bg-white hover:text-[#1FAE9B] transition-all disabled:opacity-50 shadow-xl"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
          </button>
        </motion.form>

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl mx-auto mb-8 p-5 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-4 text-red-400 text-xs md:text-sm backdrop-blur-md"
            >
              <AlertCircle size={20} className="flex-shrink-0" />
              <p className="font-medium">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {suggestion && !error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="glass-ios rounded-3xl p-8 md:p-16 border border-white/10 overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
                <div>
                  <div className="mb-10">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-[#1FAE9B] font-black block mb-4">Calculated Concept</span>
                    <h3 className="text-3xl md:text-5xl font-serif font-bold mt-2 mb-6 italic text-white leading-tight drop-shadow-lg">{suggestion.style}</h3>
                    <p className="text-white/60 leading-relaxed font-light text-base border-l-2 border-[#1FAE9B]/30 pl-6 italic">
                      "{suggestion.description}"
                    </p>
                  </div>
                  
                  <div className="mb-10 md:mb-0">
                    <h4 className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.5em] mb-8 text-white/20">
                      <Palette size={16} /> Color Strategy
                    </h4>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-6">
                      {suggestion.palette.map((color, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex flex-col items-center gap-3 group"
                        >
                          <div 
                            className="w-12 h-12 md:w-14 md:h-14 rounded-xl border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-500"
                            style={{ backgroundColor: color.hex }}
                          />
                          <div className="text-center overflow-hidden w-full">
                            <span className="text-[8px] md:text-[9px] text-white/80 font-bold uppercase block leading-tight truncate px-1 tracking-wider">{color.name}</span>
                            <span className="text-[7px] md:text-[8px] text-white/30 font-mono uppercase">{color.hex}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <h4 className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.5em] mb-8 text-white/20">
                      <Box size={16} /> Technical DNA
                    </h4>
                    <ul className="space-y-5">
                      {suggestion.keyElements.map((item, i) => (
                        <motion.li 
                          key={i} 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + (i * 0.05) }}
                          className="flex items-start gap-5 text-white/50 text-sm md:text-base font-medium group"
                        >
                          <div className="w-2 h-2 rounded-full bg-[#1FAE9B] mt-2 flex-shrink-0 group-hover:scale-150 transition-transform duration-300" />
                          <span className="group-hover:text-white transition-colors duration-300">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-12">
                    <button 
                      onClick={() => onQuoteRequest(suggestion)}
                      className="w-full flex items-center justify-between px-8 py-5 bg-[#1FAE9B] text-white font-black uppercase tracking-[0.3em] text-[10px] md:text-[11px] rounded-xl hover:bg-white hover:text-[#1FAE9B] transition-all group shadow-2xl shadow-[#1FAE9B]/20"
                    >
                      Materialize Concept
                      <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AIDesignAssistant;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Radar, 
  Activity, 
  BrainCircuit, 
  Eye, 
  Network, 
  CheckCircle2, 
  Zap, 
  ArrowRight
} from 'lucide-react';

// Reusable animation config for sections
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.7 } 
  }
};

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen font-sans selection:bg-blue-500/30 bg-[#0A0A0F] text-white">
      
      {/* Dynamic 3D Blur Blob Background */}
      <motion.div 
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }} 
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-1/4 -left-32 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" 
      />
      <motion.div 
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }} 
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="fixed top-1/2 -right-32 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" 
      />

      {/* Navigation Layer */}
      <nav className="fixed top-0 w-full z-50 bg-white/5 border-b border-white/5 backdrop-blur-xl transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-1.5 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)] flex items-center justify-center">
              <Radar className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Radar</span>
          </div>

          <div className="hidden md:flex items-center justify-center flex-1 ml-16 space-x-8 text-sm font-medium text-gray-300">
            <a href="#platform" className="hover:text-white transition-colors">Platform</a>
            <a href="#strategy" className="hover:text-white transition-colors">Strategy</a>
            <a href="#signals" className="hover:text-white transition-colors">Signals</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-sm font-medium text-gray-300 hover:text-white transition-colors hidden sm:block">
              Sign In
            </button>
            <button onClick={() => navigate('/auth')} className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-5 py-2.5 text-sm font-semibold transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="relative pt-40 pb-24 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between z-10 min-h-[90vh]"
      >
        {/* Left Column Text Content */}
        <div className="lg:w-1/2 flex flex-col items-start z-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">Live AI Intelligence</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
          >
            Invest with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              AI Precision
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-400 max-w-lg mb-10 leading-relaxed font-light"
          >
            Transform complex financial data into institutional-grade signals. Our neural engine scans 40,000+ data points per second to find your edge.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto"
          >
            <button onClick={() => navigate('/auth')} className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-8 py-4 font-semibold transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
              Start Your Journey
            </button>
            <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg px-8 py-4 font-semibold transition-all backdrop-blur-md">
              Explore Radar
            </button>
          </motion.div>
        </div>

        {/* Right Column Floating UI */}
        <div className="lg:w-1/2 w-full mt-20 lg:mt-0 relative flex justify-center lg:justify-end z-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateX: 15 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="w-full max-w-md relative perspective-1000"
          >
            {/* The 3D Glassmorphic Card */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="bg-white/5 backdrop-blur-2xl rounded-2xl p-6 lg:p-8 relative overflow-hidden shadow-2xl border border-white/10"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-white mb-1">NVIDIA Breakout</h3>
                  <p className="text-sm font-medium text-gray-400 tracking-wide uppercase">Symbol: NVDA • Tech Growth</p>
                </div>
                <div className="text-right flex flex-col items-end">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Confidence Score</p>
                  <p className="text-4xl font-extrabold text-emerald-400">94%</p>
                </div>
              </div>

              <div className="space-y-4 flex flex-col mb-8">
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-gray-400 font-medium">Entry Target</span>
                  <span className="text-white font-bold text-xl">$892.40</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-400 font-medium">AI Signal Type</span>
                  <div className="flex items-center space-x-1 whitespace-nowrap bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    <Zap className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold text-sm">Strong Buy</span>
                  </div>
                </div>
              </div>

              {/* Sparkline Chart Mockup */}
              <div className="h-28 w-full mt-4 flex items-end relative overflow-hidden bg-black/20 rounded-xl rounded-b-none border-b border-white/5 p-4 mix-blend-screen overflow-visible">
                 <svg width="100%" height="100%" viewBox="0 0 300 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full">
                  <defs>
                    <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                    </linearGradient>
                    <filter id="glow-effect" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>
                  
                  <path d="M0 65 C40 65, 80 75, 120 55 C160 35, 190 45, 220 25 C250 5, 270 20, 300 15 L300 80 L0 80 Z" fill="url(#chart-glow)" />
                  <path d="M0 65 C40 65, 80 75, 120 55 C160 35, 190 45, 220 25 C250 5, 270 20, 300 15" stroke="#10b981" strokeWidth="3" fill="none" filter="url(#glow-effect)" />
                  
                  <circle cx="300" cy="15" r="5" fill="#10b981" className="animate-pulse shadow-[0_0_15px_#10b981]" />
                  <circle cx="300" cy="15" r="2" fill="#fff" />
                </svg>
              </div>
              <div className="text-[10px] text-gray-500 font-medium tracking-widest mt-2 uppercase flex justify-between items-center">
                <span>Timestamp: 09:41:42 EST</span>
                <span className="flex space-x-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span><span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span></span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Client Logo Bar */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={sectionVariants}
        className="border-y border-white/5 bg-white/[0.02] py-16 relative z-20"
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[10px] md:text-xs font-bold text-gray-500 tracking-[0.2em] uppercase mb-10">Trusted By 50,000+ Institutional & Retail Investors</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
             <div className="text-xl md:text-2xl font-black tracking-tight text-white/80 font-mono">QUANTUM</div>
             <div className="text-xl md:text-2xl font-black italic tracking-tighter text-white/80 border-b-2 border-white/80">VELOCITY</div>
             <div className="text-xl md:text-2xl font-bold tracking-widest text-white/80">APEX.FI</div>
             <div className="text-xl md:text-2xl font-light tracking-[0.3em] text-white/80">NEXUS</div>
             <div className="text-xl md:text-2xl font-bold tracking-tight text-white/80 flex items-center gap-2"><div className="w-3 h-3 bg-white/80 rounded-full"></div>ORBIT</div>
          </div>
        </div>
      </motion.section>

      {/* Core Philosophy Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
        className="py-32 px-6 max-w-7xl mx-auto z-20 relative"
      >
        <motion.div variants={sectionVariants} className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <h4 className="text-blue-500 font-bold tracking-widest text-xs uppercase mb-4">Core Philosophy</h4>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">The Digital Curator Strategy</h2>
          </div>
          <p className="text-lg text-gray-400 max-w-lg leading-relaxed font-light border-l-2 border-white/10 pl-6">
            We don't just provide data; we provide editorialized financial clarity. Only the highest-conviction signals make it through our radar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <motion.div 
            variants={sectionVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group cursor-default bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-colors duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mt-4 -mr-4 text-blue-500/10">
              <Activity className="w-32 h-32" />
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex flex-col justify-center items-center mb-6 text-blue-400 group-hover:bg-blue-500/20 transition-all relative z-10">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-4 tracking-tight relative z-10">Quantitative Edge</h3>
            <p className="text-gray-400 leading-relaxed font-light text-sm relative z-10">
              Leveraging massive compute clusters to identify arbitrage opportunities and structural market shifts before they manifest in retail price action.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            variants={sectionVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group cursor-default bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-colors duration-300 relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mt-4 -mr-4 text-emerald-500/10">
              <BrainCircuit className="w-32 h-32" />
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col justify-center items-center mb-6 text-emerald-400 group-hover:bg-emerald-500/20 transition-all relative z-10">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-4 tracking-tight relative z-10">Behavioral Coaching</h3>
            <p className="text-gray-400 leading-relaxed font-light text-sm relative z-10">
              Removing the human bias from investing. Our AI acts as a digital curator, filtering out market noise and keeping you focused on the long-term thesis.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            variants={sectionVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group cursor-default bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-colors duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mt-4 -mr-4 text-amber-500/10">
              <Eye className="w-32 h-32" />
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex flex-col justify-center items-center mb-6 text-amber-400 group-hover:bg-amber-500/20 transition-all relative z-10">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-4 tracking-tight relative z-10">Full Transparency</h3>
            <p className="text-gray-400 leading-relaxed font-light text-sm relative z-10">
              Every signal is backed by a verifiable data trail. We show you the "Why" behind every move, providing full audit logs of the neural weights used.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Infrastructure Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="py-32 px-6 max-w-7xl mx-auto z-20 relative"
      >
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Visual: Sleek Animated Grid Mockup */}
          <div className="lg:w-1/2 w-full relative">
            <div className="w-full aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-[#0f172a] to-[#020617] border border-white/10 relative shadow-2xl">
               
               {/* Glowing Mesh / Animated Grid */}
               <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
               <motion.div 
                 animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]"
               />
               <motion.div 
                 animate={{ opacity: [0.2, 0.5, 0.2] }}
                 transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                 className="absolute top-1/4 right-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-[60px]"
               />

               {/* Grid scanline effect */}
               <motion.div 
                 animate={{ y: ["-100%", "200%"] }}
                 transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 h-4 bg-blue-400/10 blur-[4px] border-t border-blue-400/20"
               />
            </div>

            {/* Floating Card over Server Image */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 lg:bottom-12 -left-4 lg:-left-12 bg-white/5 backdrop-blur-3xl p-6 rounded-xl border border-white/10 shadow-[0_20px_40px_-15px_rgba(59,130,246,0.2)] flex items-center gap-5 z-30 isolate"
            >
              <div className="bg-blue-600 rounded-lg p-3 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <Network className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Network Performance</p>
                <p className="text-2xl font-bold tracking-tight text-white">0.1ms Latency</p>
              </div>
            </motion.div>
          </div>

          {/* Right Content */}
          <div className="lg:w-1/2 w-full lg:pl-8">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-[1.15]">
              Engineered for the 0.1% latency market environment.
            </h2>
            <p className="text-lg text-gray-400 font-light leading-relaxed mb-10 w-full lg:max-w-md">
              Our infrastructure is built on bare-metal clusters located in Equinix data centers, placing your portfolio milliseconds away from the world's major liquidity hubs.
            </p>

            <div className="space-y-8">
              <motion.div variants={sectionVariants} className="flex items-start gap-4 group">
                <div className="mt-1 bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors rounded-full p-1 border border-emerald-500/20 shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg tracking-tight">Direct Market Access (DMA)</h4>
                  <p className="text-gray-400 text-sm mt-1 font-light leading-relaxed">Execution speeds that rival high-frequency hedge funds.</p>
                </div>
              </motion.div>

              <motion.div variants={sectionVariants} className="flex items-start gap-4 group">
                <div className="mt-1 bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors rounded-full p-1 border border-emerald-500/20 shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg tracking-tight">Encrypted Neural Pipeline</h4>
                  <p className="text-gray-400 text-sm mt-1 font-light leading-relaxed">Your trade intent is shielded by post-quantum encryption.</p>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="py-32 px-6 max-w-7xl mx-auto z-20 relative"
      >
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2rem] p-12 md:p-24 text-center relative overflow-hidden shadow-[0_20px_60px_-15px_rgba(59,130,246,0.6)] border border-blue-400/40">
          
          {/* Subtle patterns inside CTA */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZD0iTTAgMGwyNCAyNE0yNCAwbC0yNCAyNCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4=')] bg-[length:40px_40px]"></div>
          
          <div className="relative z-10 w-full max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 leading-tight">
              Ready to curate your wealth?
            </h2>
            <p className="text-xl md:text-2xl font-light text-blue-100 mb-12 opacity-90 leading-relaxed">
              Join the exclusive circle of investors leveraging the power of Radar's predictive intelligence.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-slate-900 hover:bg-black text-white rounded-xl px-10 py-5 font-bold transition-all shadow-xl hover:shadow-2xl w-full sm:w-auto"
              >
                Create Institutional Account
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent hover:bg-white/10 border border-white/40 hover:border-white text-white rounded-xl px-10 py-5 font-bold transition-all w-full sm:w-auto backdrop-blur-sm"
              >
                Schedule Demo
              </motion.button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0A0A0F] pt-20 pb-10 px-6 mt-10 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
             <div className="flex items-center space-x-2 mb-3 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-pointer">
              <Radar className="w-6 h-6 text-white" />
              <span className="text-xl font-bold tracking-tight">Radar</span>
            </div>
            <p className="text-xs text-gray-600 font-medium tracking-wide">© 2024 Radar AI Technologies. High-stakes quantifiable precision.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">SEC Disclosures</a>
            <a href="#" className="hover:text-white transition-colors">API Documentation</a>
            <a href="#" className="hover:text-white transition-colors">System Status</a>
          </div>

          <div className="flex gap-4">
            <motion.div whileHover={{ scale: 1.1 }} className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shadow-lg">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shadow-lg">
             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>            
            </motion.div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;

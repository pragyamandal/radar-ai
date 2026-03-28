import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { 
  ChevronLeft, 
  Bell, 
  User, 
  Play, 
  LayoutGrid, 
  BarChart2, 
  Scale, 
  ExternalLink,
  FileText,
  Activity,
  Globe
} from 'lucide-react';

const WhyPage = () => {
  const navigate = useNavigate();
  const { ticker } = useParams();
  const displayTicker = ticker ? ticker.toUpperCase() : 'HDFCBANK';

  return (
    <div className="flex h-screen bg-[#0A0A0F] font-sans text-white overflow-hidden">
      <Sidebar />

      <main className="flex-1 ml-64 p-8 overflow-y-auto w-full">
        
        <div className="max-w-6xl mx-auto w-full">
          
          {/* Top Header Area */}
          <header className="flex flex-col mb-10">
             <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                   <button 
                      onClick={() => navigate(-1)} 
                      className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 hover:text-white uppercase tracking-widest transition-colors"
                   >
                      <ChevronLeft className="w-4 h-4" /> Back to Terminal
                   </button>
                   <span className="text-gray-600 font-bold">|</span>
                   <span className="text-[10px] font-bold text-white uppercase tracking-widest">AI Reasoning Engine</span>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                     <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                     <span className="text-[10px] font-bold text-emerald-500 tracking-widest uppercase">LIVE SYNC</span>
                  </div>
                  <Bell className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                  <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors shrink-0">
                    <User className="w-4 h-4 text-gray-300" />
                  </div>
                </div>
             </div>

             <div>
                <h1 className="text-5xl font-extrabold tracking-tight mb-4 leading-none">
                  Why I said this <span className="text-gray-600 font-normal">/</span> <span className="text-blue-500">HDFC Bank ({displayTicker})</span>
                </h1>
                <p className="text-lg text-gray-400 max-w-4xl leading-relaxed tracking-wide">
                  Analysis generated on Oct 24, 2023. Our neural model processed 4,200+ data points including quarterly filings, FII flows, and macro-economic volatility signals.
                </p>
             </div>
          </header>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mt-12 pb-20">
             
             {/* LEFT COLUMN: The Reasoning Timeline (col-span-8) */}
             <div className="md:col-span-8 relative">
                
                {/* The Vertical Spine Line */}
                <div className="absolute left-[24px] top-[40px] bottom-0 w-px bg-white/10 border-r border-[#1a1c23]"></div>

                <div className="flex flex-col gap-12 pl-16 relative">
                   
                   {/* Step 1: DATA AGGREGATION */}
                   <div className="bg-[#111118] border border-white/5 rounded-2xl p-8 relative group">
                      <div className="absolute -left-[54px] top-6 w-9 h-9 rounded-lg bg-[#111118] border border-white/10 flex items-center justify-center z-10 shadow-lg shadow-black group-hover:border-blue-500/50 transition-colors">
                         <LayoutGrid className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      </div>
                      
                      <p className="text-[10px] font-black tracking-widest uppercase text-gray-500 mb-2">STEP 01 / DATA AGGREGATION</p>
                      <h2 className="text-2xl font-bold tracking-tight mb-4">Quarterly Filings Analysis</h2>
                      <p className="text-sm text-gray-300 leading-relaxed font-medium mb-8">
                        Analyzed Q3 PAT which was up 18% YoY, above analyst estimates. Net interest margin expanded by 12bps indicating robust lending growth decoupling from broader banking sector compression.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                         <div className="bg-white/5 border border-white/5 rounded-lg p-4 flex flex-col justify-center">
                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-1">THROUGHPUT</span>
                            <span className="text-xl font-black tracking-tight text-emerald-400">+18%</span>
                         </div>
                         <div className="bg-white/5 border border-white/5 rounded-lg p-4 flex flex-col justify-center">
                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-1">CONFIDENCE</span>
                            <span className="text-xl font-bold tracking-tight text-white">High</span>
                         </div>
                         <div className="bg-white/5 border border-white/5 rounded-lg p-4 flex flex-col justify-center">
                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-1">IMPACT</span>
                            <span className="text-xl font-bold tracking-tight text-white">Immediate</span>
                         </div>
                      </div>
                   </div>

                   {/* Step 2: INSIDER ACTIVITY */}
                   <div className="bg-[#111118] border border-white/5 rounded-2xl p-8 relative group">
                      <div className="absolute -left-[54px] top-6 w-9 h-9 rounded-lg bg-[#111118] border border-white/10 flex items-center justify-center z-10 shadow-lg shadow-black group-hover:border-blue-500/50 transition-colors">
                         <BarChart2 className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      </div>
                      
                      <p className="text-[10px] font-black tracking-widest uppercase text-gray-500 mb-2">STEP 02 / INSIDER ACTIVITY</p>
                      <h2 className="text-2xl font-bold tracking-tight mb-4">Promoter & FII Flow Detection</h2>
                      <p className="text-sm text-gray-300 leading-relaxed font-medium">
                        Scanning NSE bulk deals and block deals revealed a massive subtle shift. FII net buying of ₹842Cr detected in the past 2 weeks, decoupling heavily from generic sector ETFs indicating targeted institutional accumulation.
                      </p>
                   </div>

                   {/* Step 3: TECHNICAL PATTERN */}
                   <div className="bg-[#111118] border border-white/5 rounded-2xl p-8 relative group">
                      <div className="absolute -left-[54px] top-6 w-9 h-9 rounded-lg bg-[#111118] border border-white/10 flex items-center justify-center z-10 shadow-lg shadow-black group-hover:border-blue-500/50 transition-colors">
                         <Scale className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      </div>
                      
                      <p className="text-[10px] font-black tracking-widest uppercase text-gray-500 mb-2">STEP 03 / TECHNICAL PATTERN</p>
                      <h2 className="text-2xl font-bold tracking-tight mb-4">52-Week Breakout Confirmed</h2>
                      <p className="text-sm text-gray-300 leading-relaxed font-medium">
                        Price broke 52W high on 2.3x average volume today. Leading RSI currently sitting at 64 — explicitly indicating momentum is not yet overbought. MACD bullish crossover locked in firmly on the weekly timeframe.
                      </p>
                   </div>

                </div>
             </div>

             {/* RIGHT COLUMN: Audio & Sources (col-span-4) */}
             <div className="md:col-span-4 flex flex-col gap-6">
                 
                 {/* AI AUDIO BRIEFING */}
                 <div className="bg-[#1a1c23] border border-white/5 rounded-2xl p-6 group cursor-pointer hover:border-white/10 transition-colors shadow-xl">
                    <p className="text-[10px] font-black text-gray-400 tracking-widest uppercase mb-6 flex items-center gap-2">
                       <User className="w-3 h-3" /> AI AUDIO BRIEFING
                    </p>
                    <div className="flex items-center gap-4 mb-6">
                       <div className="w-14 h-14 rounded-xl bg-blue-500 flex items-center justify-center shadow-[0_5px_20px_rgba(59,130,246,0.3)] group-hover:bg-blue-400 transition-colors shrink-0">
                          <Play className="w-6 h-6 text-white fill-white translate-x-0.5" />
                       </div>
                       <div>
                          <h3 className="text-lg font-bold">Synthesis Summary</h3>
                          <p className="text-xs font-medium text-gray-400 tracking-wide mt-0.5">04:12 • High Fidelity AI Voice</p>
                       </div>
                    </div>
                    
                    {/* Progress Track */}
                    <div>
                       <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-2 relative">
                          <div className="absolute left-0 top-0 bottom-0 w-[35%] bg-blue-400 rounded-full shadow-[0_0_10px_#60a5fa]"></div>
                       </div>
                       <div className="flex justify-between items-center text-[10px] font-mono font-medium text-gray-500">
                          <span className="text-gray-300">01:24</span>
                          <span>-02:48</span>
                       </div>
                    </div>
                 </div>

                 {/* PRIMARY DATA SOURCES */}
                 <div className="mt-4">
                    <p className="text-[10px] font-black text-gray-500 tracking-widest uppercase mb-4">PRIMARY DATA SOURCES</p>
                    <div className="flex flex-col gap-3">
                       
                       <div className="bg-[#111118] border border-white/5 hover:border-white/10 transition-colors rounded-xl p-4 flex justify-between items-center group cursor-pointer">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 shrink-0">
                                <FileText className="w-4 h-4 text-gray-400" />
                             </div>
                             <div>
                                <h4 className="text-sm font-bold tracking-wide">NSE Filings Feed</h4>
                                <p className="text-[9px] font-black tracking-widest text-gray-500 uppercase mt-1">DIRECT API STREAM • REAL-TIME</p>
                             </div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                       </div>

                       <div className="bg-[#111118] border border-white/5 hover:border-white/10 transition-colors rounded-xl p-4 flex justify-between items-center group cursor-pointer">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 shrink-0">
                                <Activity className="w-4 h-4 text-gray-400" />
                             </div>
                             <div>
                                <h4 className="text-sm font-bold tracking-wide">Price History</h4>
                                <p className="text-[9px] font-black tracking-widest text-gray-500 uppercase mt-1">YFINANCE • VERIFIED</p>
                             </div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                       </div>

                       <div className="bg-[#111118] border border-white/5 hover:border-white/10 transition-colors rounded-xl p-4 flex justify-between items-center group cursor-pointer">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 shrink-0">
                                <Globe className="w-4 h-4 text-gray-400" />
                             </div>
                             <div>
                                <h4 className="text-sm font-bold tracking-wide">FII / DII Data</h4>
                                <p className="text-[9px] font-black tracking-widest text-gray-500 uppercase mt-1">PROPRIETARY RADAR HUB</p>
                             </div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                       </div>

                    </div>
                 </div>

                 {/* MODEL CONFIDENCE */}
                 <div className="bg-[#111118] border border-white/5 rounded-2xl p-6 mt-4">
                    <p className="text-[10px] font-black text-gray-500 tracking-widest uppercase mb-6">MODEL CONFIDENCE</p>
                    
                    <div className="flex items-end gap-3 mb-6">
                       <span className="text-6xl font-black text-emerald-400 leading-none tracking-tighter">94<span className="text-5xl">%</span></span>
                       <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pb-1 leading-tight w-20">ACCURACY RATING</span>
                    </div>

                    {/* Progress Dashes (4/5) */}
                    <div className="flex gap-2 w-full mb-6">
                       <div className="flex-1 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
                       <div className="flex-1 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
                       <div className="flex-1 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
                       <div className="flex-1 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
                       <div className="flex-1 h-1.5 rounded-full bg-white/10"></div>
                    </div>

                    <p className="text-[11px] font-medium text-gray-400 leading-relaxed tracking-wide">
                       Rating based on historical correlation between AI signal and 5-day post-analysis price action exclusively inside Indian cyclical trends.
                    </p>
                 </div>

             </div>

          </div>
        </div>

      </main>
    </div>
  );
};

export default WhyPage;

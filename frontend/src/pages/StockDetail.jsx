import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { 
  CheckCircle2, 
  Zap, 
  Bell, 
  Plus, 
  Bot,
  ArrowUpRight,
  ShieldCheck,
  Activity
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  ResponsiveContainer, 
  YAxis, 
  ReferenceDot,
  Tooltip
} from 'recharts';

// Mock Chart Data simulating the breakout pattern (lol3 visual)
const data = [
  { time: '1', price: 1780, projection: null },
  { time: '2', price: 1795, projection: null },
  { time: '3', price: 1805, projection: null },
  { time: '4', price: 1790, projection: null },
  { time: '5', price: 1820, projection: null },
  { time: '6', price: 1810, projection: null },
  { time: '7', price: 1842.30, projection: 1842.30 }, // Current intersection node
  { time: '8', price: null, projection: 1870 },
  { time: '9', price: null, projection: 1910 },
  { time: '10', price: null, projection: 1950.40 }, // Target Node
];

const StockDetail = () => {
  const { ticker } = useParams();
  const [activeTimeframe, setActiveTimeframe] = useState('1D');
  const displayTicker = ticker ? ticker.toUpperCase() : 'HDFCBANK';

  return (
    <div className="flex h-screen bg-[#0A0A0F] font-sans text-white overflow-hidden">
      <Sidebar />

      <main className="flex-1 ml-64 p-8 overflow-y-auto w-full">
        
        {/* Top Spacer if needed */}
        <div className="max-w-[1400px] mx-auto w-full">

          {/* 12-Column Analysis Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* =========================================
                LEFT COLUMN (METRICS & ID) - col-span-3 
                ========================================= */}
            <div className="col-span-1 md:col-span-3 flex flex-col gap-8">
              
              {/* Identity Header */}
              <div className="bg-[#111118] rounded-xl p-6 border-l-4 border-l-blue-500 relative overflow-hidden">
                 <div className="flex justify-between items-start mb-4">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest hidden sm:block">BANKING / FINANCIALS</p>
                    <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase">
                       High Alpha
                    </div>
                 </div>
                 <h1 className="text-4xl font-black tracking-tight mb-1">{displayTicker}</h1>
                 <p className="text-sm font-medium text-gray-400 mb-6">HDFC Bank Ltd.</p>
                 <div className="flex items-end gap-3">
                    <span className="text-3xl font-black tracking-tight">₹1,842.30</span>
                    <span className="text-sm font-bold text-emerald-400 mb-1">+2.41%</span>
                 </div>
              </div>

              {/* AI Backtest Metrics */}
              <div>
                <h3 className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-4">AI BACKTEST METRICS</h3>
                <div className="flex flex-col gap-4">
                  {/* Card 1: Success Rate */}
                  <div className="bg-[#111118] border border-white/5 rounded-xl p-5">
                     <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-2">SUCCESS RATE</p>
                     <div className="flex justify-between items-end mb-4">
                        <span className="text-3xl font-black text-emerald-400 tracking-tight leading-none">78.4%</span>
                        <ShieldCheck className="w-6 h-6 text-emerald-400 mb-0.5" />
                     </div>
                     {/* Progress Bar */}
                     <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-400 h-full w-[78.4%] rounded-full shadow-[0_0_10px_#34d399]"></div>
                     </div>
                  </div>

                  {/* Card 2 & 3: Profit / Drawdown */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#111118] border border-white/5 rounded-xl p-5 flex flex-col justify-center">
                       <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-2 leading-tight">PROFIT<br/>FACTOR</p>
                       <span className="text-2xl font-black tracking-tight leading-none mb-2">2.41</span>
                       <span className="text-[10px] font-bold text-emerald-400">+0.12 vs avg</span>
                    </div>
                    <div className="bg-[#111118] border border-white/5 rounded-xl p-5 flex flex-col justify-center">
                       <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-2 leading-tight">AVG<br/>DRAWDOWN</p>
                       <span className="text-2xl font-black tracking-tight leading-none text-red-500 mb-2">4.2%</span>
                       <span className="text-[10px] font-medium text-gray-500">30D Moving</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Portfolio Fit Score */}
              <div>
                 <h3 className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-4">PORTFOLIO FIT SCORE</h3>
                 <div className="bg-[#111118] border border-white/5 rounded-xl p-6 flex items-center gap-6">
                    {/* SVG Semi-Circle Gauge */}
                    <div className="relative w-16 h-12 flex-shrink-0 flex justify-center pt-2">
                       <svg viewBox="0 0 100 50" className="absolute top-0 left-0 w-full h-full overflow-visible">
                         {/* Background track */}
                         <path d="M 5 50 A 45 45 0 0 1 95 50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" strokeLinecap="round" />
                         {/* Value track (82%) */}
                         <path d="M 5 50 A 45 45 0 0 1 95 50" fill="none" stroke="#60a5fa" strokeWidth="8" strokeLinecap="round" strokeDasharray="141.3" strokeDashoffset="25.4" />
                       </svg>
                       <span className="text-xl font-black relative z-10 bottom-[-10px]">82</span>
                    </div>
                    
                    <div>
                       <h4 className="text-sm font-bold text-white tracking-wide mb-1">Complementary</h4>
                       <p className="text-[10px] text-gray-400 leading-relaxed font-medium">Reduces overall volatility by 12.4% based on current correlation nodes.</p>
                    </div>
                 </div>
              </div>

            </div>

            {/* =========================================
                CENTER COLUMN (CHART & ACTIONS) - col-span-6 
                ========================================= */}
            <div className="col-span-1 md:col-span-6 flex flex-col gap-6">
               
               <div className="bg-[#111118] border border-white/5 rounded-2xl p-6 flex flex-col h-full relative">
                  
                  {/* Center Header */}
                  <div className="flex justify-between items-start mb-8 z-10 relative">
                     <div>
                        <h2 className="text-2xl font-bold tracking-tight mb-1">AI Breakout Analysis</h2>
                        <p className="text-sm text-gray-400 font-medium">Pattern: Ascending Scallop | Reliability: 84%</p>
                     </div>
                     <div className="hidden sm:flex bg-white/5 p-1 rounded-lg border border-white/10">
                        {['1H', '1D', '1W', 'ALL'].map(tf => (
                          <button 
                            key={tf}
                            onClick={() => setActiveTimeframe(tf)}
                            className={`px-3 py-1 text-xs font-bold rounded transition-colors ${
                              activeTimeframe === tf 
                                ? 'bg-blue-600 text-white shadow-sm' 
                                : 'text-gray-400 hover:text-white'
                            } ${tf === 'ALL' ? 'mr-1' : ''}`}
                          >
                            {tf}
                          </button>
                        ))}
                     </div>
                  </div>

                  {/* Recharts Hero Element */}
                  <div className="flex-1 w-full min-h-[400px] relative mt-2 -mx-4 group">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                        <defs>
                           <filter id="glow-blue" x="-20%" y="-20%" width="140%" height="140%">
                             <feGaussianBlur stdDeviation="3" result="blur" />
                             <feComposite in="SourceGraphic" in2="blur" operator="over" />
                           </filter>
                        </defs>
                        <YAxis hide domain={['dataMin - 50', 'dataMax + 50']} />
                        
                        {/* Historical Price Line (Solid Blue) */}
                        <Line 
                          type="monotone" 
                          dataKey="price" 
                          stroke="#60a5fa" 
                          strokeWidth={3} 
                          dot={false}
                          filter="url(#glow-blue)"
                          isAnimationActive={true}
                        />

                        {/* AI Projection Line (Dashed Amber) */}
                        <Line 
                          type="monotone" 
                          dataKey="projection" 
                          stroke="#fbbf24" 
                          strokeWidth={3} 
                          strokeDasharray="8 8" 
                          dot={false}
                          isAnimationActive={true}
                        />
                      </LineChart>
                    </ResponsiveContainer>

                    {/* Absolute Placed "Breakout Target" Label simulating overlapping UI */}
                    <div className="absolute right-[5%] top-[15%] flex flex-col items-center animate-[float_4s_ease-in-out_infinite]">
                       <div className="bg-[#111118] border border-amber-500/30 shadow-[0_5px_25px_rgba(245,158,11,0.15)] rounded-lg py-2 px-4 shadow-xl z-20 whitespace-nowrap backdrop-blur-md">
                         <p className="text-[8px] font-black tracking-widest text-amber-500 uppercase mb-0.5">SIGNAL PROJECTION</p>
                         <p className="text-sm font-black text-white">₹1,950.40 <span className="text-emerald-400 ml-1 text-xs">+4.5%</span></p>
                       </div>
                       {/* Line pointing down to curve */}
                       <div className="w-px h-12 bg-gradient-to-b from-amber-500/50 to-transparent"></div>
                    </div>

                    {/* Bottom Graph Legend Legend */}
                    <div className="absolute bottom-2 left-6 right-6 flex items-center justify-between text-[10px] font-bold text-gray-500 tracking-widest uppercase">
                       <div className="flex gap-6">
                         <span className="flex items-center gap-2"><div className="w-3 h-0.5 bg-blue-400"></div> Market Price</span>
                         <span className="flex items-center gap-2"><div className="w-3 h-0.5 bg-amber-400 border-t border-dashed border-amber-400"></div> AI Projection</span>
                       </div>
                       <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full border-2 border-emerald-500 bg-transparent"></div> Volume Spike</span>
                    </div>
                  </div>

               </div>

               {/* Action Bar */}
               <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  <button className="flex items-center justify-center gap-2 bg-[#111118] hover:bg-white/5 border border-white/5 hover:border-white/10 transition-colors uppercase tracking-widest text-[10px] font-bold py-4 px-6 rounded-xl sm:w-1/4">
                     <Plus className="w-4 h-4" /> Add to List
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-[#111118] hover:bg-white/5 border border-white/5 hover:border-white/10 transition-colors uppercase tracking-widest text-[10px] font-bold py-4 px-6 rounded-xl sm:w-1/4">
                     <Bell className="w-4 h-4" /> Price Alert
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white transition-all uppercase tracking-widest text-sm font-black py-4 px-6 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:-translate-y-0.5">
                     EXECUTE TRADE <ArrowUpRight className="w-5 h-5 opacity-50" />
                  </button>
               </div>
            </div>

            {/* =========================================
                RIGHT COLUMN (COACH & SENTIMENT) - col-span-3 
                ========================================= */}
            <div className="col-span-1 md:col-span-3 flex flex-col gap-6">
               
               {/* Coach Recommendation Box */}
               <div className="bg-[#111118] border border-white/5 border-t-2 border-t-blue-500 rounded-lg p-6 flex flex-col relative overflow-hidden group">
                  <div className="flex items-center gap-2 mb-6">
                     <div className="bg-white/10 p-1.5 rounded text-white"><Bot className="w-4 h-4" /></div>
                     <h3 className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">COACH RECOMMENDATION</h3>
                  </div>
                  <p className="text-sm font-medium leading-relaxed text-gray-300 italic mb-8 relative z-10">
                    "{displayTicker} is currently forming a high-conviction breakout pattern. Historical alignment with similar semi-conductor cycles suggests a 72-hour window for optimal entry."
                  </p>
                  
                  {/* Subtle BG Graphic */}
                  <div className="absolute -bottom-6 -right-6 text-white/5 -rotate-12 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                     <Activity className="w-40 h-40" />
                  </div>

                  <div className="mt-auto bg-white/5 rounded-lg p-4 flex items-center gap-4 relative z-10 border border-white/5">
                     <div className="bg-emerald-500/20 p-2 rounded shrink-0">
                       <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400/50" />
                     </div>
                     <div>
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Confidence Score</p>
                       <p className="text-sm font-black">94/100</p>
                     </div>
                  </div>
               </div>

               {/* Signal Sentiment Feed */}
               <div className="flex-1 flex flex-col">
                  <h3 className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-4">SIGNAL SENTIMENT</h3>
                  
                  <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                     
                     {/* Item 1 */}
                     <div className="bg-[#111118] border border-white/5 rounded-lg p-4 group cursor-pointer hover:border-white/10">
                        <div className="flex justify-between items-center mb-2">
                           <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-1.5 py-0.5 rounded">BULLISH</span>
                           <span className="text-[10px] font-bold text-gray-500">14m ago</span>
                        </div>
                        <p className="text-xs font-medium text-gray-300 leading-snug group-hover:text-white transition-colors">Morgan Stanley increases price target to ₹1,950 following strong Q3 margins.</p>
                     </div>

                     {/* Item 2 */}
                     <div className="bg-[#111118] border border-white/5 rounded-lg p-4 group cursor-pointer hover:border-white/10">
                        <div className="flex justify-between items-center mb-2">
                           <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest bg-gray-500/10 px-1.5 py-0.5 rounded">NEUTRAL</span>
                           <span className="text-[10px] font-bold text-gray-500">2h ago</span>
                        </div>
                        <p className="text-xs font-medium text-gray-300 leading-snug group-hover:text-white transition-colors">RBI monetary policy update: New guidelines for unsecured lending.</p>
                     </div>

                     {/* Item 3 */}
                     <div className="bg-[#111118] border border-white/5 rounded-lg p-4 group cursor-pointer hover:border-white/10">
                        <div className="flex justify-between items-center mb-2">
                           <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-1.5 py-0.5 rounded">BULLISH</span>
                           <span className="text-[10px] font-bold text-gray-500">5h ago</span>
                        </div>
                        <p className="text-xs font-medium text-gray-300 leading-snug group-hover:text-white transition-colors">FII net buying in private banks exceeds institutional estimates across structural bounds.</p>
                     </div>

                  </div>
               </div>

               {/* Sentiment Distribution Bar */}
               <div className="bg-[#111118] border border-white/5 rounded-lg p-5">
                  <h3 className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-4">SENTIMENT DISTRIBUTION</h3>
                  
                  {/* CSS Flex Stacked Bar */}
                  <div className="w-full flex h-2 rounded-full overflow-hidden mb-3 gap-0.5">
                     <div className="bg-emerald-400 h-full w-[65%]"></div>
                     <div className="bg-gray-600 h-full w-[25%]"></div>
                     <div className="bg-red-400 h-full w-[10%] opacity-80"></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                     <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">65% BULLISH</span>
                     <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">10% BEARISH</span>
                  </div>
               </div>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default StockDetail;

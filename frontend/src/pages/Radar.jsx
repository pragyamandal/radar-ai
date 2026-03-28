import React, { useState } from 'react';
import { Shield, Eye, ArrowUp, Zap, CheckCircle2, RefreshCw, BarChart2, Briefcase, AlertTriangle, ArrowRight, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import Sidebar from '../components/Sidebar';

// Recharts Dummy Signal Trajectory
const chartData = [
  { value: 1780 }, { value: 1795 }, { value: 1810 }, { value: 1805 },
  { value: 1820 }, { value: 1815 }, { value: 1835 }, { value: 1842 }
];

const signals = [
  {
    id: 'HDFCBANK.NS',
    ticker: 'HDFCBANK',
    name: 'HDFC BANK',
    badge: 'HIGH CONVICTION',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    return: '+12.4%',
    returnColor: 'text-emerald-400',
    risk: '2.4/10',
    time: '14m ago',
    type: 'Breakout',
    price: '₹1,842.30',
    change: '+2.4%',
    entry: '₹1,840 - ₹1,845',
    target: '₹1,950',
    stopLoss: '₹1,790',
    winRate: '68.4%',
    holdTime: '4.2 Days',
    maxDrawdown: '-3.1%'
  },
  {
    id: 'INFY.NS',
    ticker: 'INFY',
    name: 'INFOSYS LTD',
    badge: 'MODERATE',
    badgeColor: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    return: '+4.8%',
    returnColor: 'text-emerald-400',
    risk: '6.1/10',
    time: '1h ago',
    type: 'Volatility Squeeze',
    price: '₹1,642.10',
    change: '+1.2%',
    entry: '₹1,630 - ₹1,645',
    target: '₹1,710',
    stopLoss: '₹1,590',
    winRate: '54.2%',
    holdTime: '8.5 Days',
    maxDrawdown: '-4.6%'
  },
  {
    id: 'TATAMOTORS.NS',
    ticker: 'TATAMOTORS',
    name: 'TATA MOTORS',
    badge: 'SPECULATIVE',
    badgeColor: 'bg-red-500/10 text-red-400 border-red-500/20',
    return: '-8.2%',
    returnColor: 'text-red-400',
    risk: '8.9/10',
    time: '2h ago',
    type: 'Resistance Rejection',
    price: '₹964.50',
    change: '-0.4%',
    entry: '₹980 - ₹995',
    target: '₹1,080',
    stopLoss: '₹920',
    winRate: '42.1%',
    holdTime: '12 Days',
    maxDrawdown: '-9.1%'
  }
];

const Radar = () => {
  const navigate = useNavigate();
  const [isDoNothing, setIsDoNothing] = useState(false);
  const [selectedSignal, setSelectedSignal] = useState('HDFCBANK.NS');

  // Hardcoded to display details based on selected asset (Since HDFC is the main visual focal point)
  const activeStock = signals.find(s => s.id === selectedSignal) || signals[0];

  return (
    <div className="flex h-screen bg-[#0A0A0F] font-sans text-white overflow-hidden">
      <Sidebar />

      <main className="flex-1 ml-64 p-8 overflow-y-auto flex flex-col items-center">
        
        {/* Header & Hidden Developer Mode Button */}
        <header className="mb-8 w-full max-w-7xl flex flex-col md:flex-row md:items-end justify-between gap-6 shrink-0">
          <div>
            <h1 className="text-[32px] font-bold tracking-tight mb-2">Opportunity Radar</h1>
            <p className="text-gray-400 text-sm font-medium">
              Real-time AI analysis of cross-market volatility clusters.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsDoNothing(!isDoNothing)}
              className="px-4 py-2 border border-white/20 text-gray-400 hover:text-white hover:border-white/50 bg-white/5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all"
            >
              Toggle Demo State ({isDoNothing ? 'Off' : 'On'})
            </button>
            <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 text-gray-300 px-4 py-2 rounded-lg text-sm font-bold">
               Sort By: <span className="text-white">Confidence Score</span>
            </div>
          </div>
        </header>

        {isDoNothing ? (
          /* =========================================
             "DO NOTHING" DORMANT STATE (lol8.jpg)
             ========================================= */
          <div className="w-full max-w-5xl flex-1 flex flex-col items-center justify-center -mt-10">
            <div className="w-24 h-24 bg-[#111118] border border-white/10 rounded-3xl flex items-center justify-center mb-8 shadow-inner shadow-white/5 relative overflow-hidden">
              <Shield className="w-10 h-10 text-gray-500 relative z-10" />
            </div>

            <h1 className="text-5xl font-extrabold tracking-tight mb-6">No strong signal today</h1>
            <p className="text-xl text-gray-400 max-w-2xl text-center leading-relaxed font-light mb-16">
              Our AI models have processed over 4.2TB of NSE market data in the last 6 hours. Current conditions do not meet our <span className="text-emerald-400 font-bold">94% confidence threshold</span> for actionable momentum.
            </p>

            {/* 3 Config Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-16">
              <div className="bg-[#111118] border border-white/5 rounded-xl p-6 hover:bg-white/[0.02] transition-colors relative overflow-hidden">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                    <BarChart2 className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mt-2">MACRO CONTEXT</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Sideways Consolidation</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Nifty 50 is trading within a tight 0.4% range. High-frequency liquidity is currently dormant as the market awaits the upcoming RBI decisions.
                </p>
              </div>

              <div className="bg-[#111118] border border-white/5 rounded-xl p-6 hover:bg-white/[0.02] transition-colors">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <Zap className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mt-2">SYSTEM HEALTH</span>
                </div>
                <h3 className="text-lg font-bold mb-2">The Digital Curator is Patient</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  We prioritize capital preservation. 47 weak signals were suppressed today to protect your portfolio from volatility spikes.
                </p>
              </div>

              <div className="bg-[#111118] border border-white/5 rounded-xl p-6 hover:bg-white/[0.02] transition-colors">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                    <RefreshCw className="w-5 h-5 text-amber-500" />
                  </div>
                  <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mt-2">NEXT REFRESH</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Next Sweep in 14:02</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Full re-calculation occurs every 15 minutes. We are currently monitoring 420 underlying assets for emergent fractal breakouts.
                </p>
              </div>
            </div>

            {/* Bottom Insight Footer */}
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-3">
                 <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                 <span className="text-xs font-bold tracking-widest uppercase text-gray-400">ACTIVE MONITORING</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Why patience is your edge.</h2>
              <p className="text-sm text-gray-400 text-center max-w-xl leading-relaxed">
                Most retail algorithms force trades to maintain engagement. Radar Terminal is engineered for institutional-grade precision. By waiting for the right confluence of volume, price action, and sentiment, we maximize your risk-adjusted returns.
              </p>
              <div className="flex gap-4 mt-4">
                <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-colors">
                  View Historical Performance
                </button>
                <button className="bg-transparent border border-white/10 hover:border-white/30 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                  Adjust Sensitivity
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* =========================================
             ACTIVE MASTER-DETAIL STATE (lol2.jpg)
             ========================================= */
          <div className="w-full max-w-7xl flex-1 flex flex-col md:flex-row gap-6 pb-20">
            
            {/* LEFT PANEL: The Scrubber List */}
            <div className="w-full md:w-[380px] flex flex-col gap-4 shrink-0">
              {signals.map((sig) => {
                const isActive = selectedSignal === sig.id;
                return (
                  <div 
                    key={sig.id}
                    onClick={() => setSelectedSignal(sig.id)}
                    className={`bg-[#111118] border rounded-2xl p-6 cursor-pointer transition-all relative overflow-hidden group ${
                      isActive ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.1)]' : 'border-white/5 hover:border-white/20'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 rounded-l-2xl"></div>
                    )}
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase relative z-10">SIGNAL #{sig.id.length * 1024}</span>
                      <div className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border relative z-10 ${sig.badgeColor}`}>
                        {sig.badge}
                      </div>
                    </div>
                    <h3 className="text-2xl font-black tracking-tight mb-6">{sig.ticker}</h3>
                    <div className="flex justify-between items-end border-b border-white/5 pb-4 mb-4">
                      <div>
                        <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">EXP. RETURN</p>
                        <p className={`text-xl font-bold ${sig.returnColor}`}>{sig.return}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">RISK SCORE</p>
                        <p className="text-xl font-bold text-white">{sig.risk}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                       <span>⏱ {sig.time}</span>
                       <span>~ {sig.type}</span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* RIGHT PANEL: Active Selected Detail */}
            <div className="flex-1 flex flex-col gap-6">
              
              {/* Header Box */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-4">
                 <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                     <div className="grid grid-cols-2 gap-1 w-5 h-5">
                        <div className="bg-emerald-400 rounded-[2px]" /><div className="bg-emerald-400 rounded-[2px]" />
                        <div className="bg-emerald-400 rounded-[2px]" /><div className="bg-emerald-400 rounded-[2px] opacity-40" />
                     </div>
                   </div>
                   <div>
                     <h2 className="text-4xl font-black tracking-tight uppercase leading-[0.9] text-white">
                        {activeStock.name} <br/>({activeStock.ticker})
                     </h2>
                     <div className="flex items-center gap-3 mt-4 text-sm font-medium text-gray-400">
                        <ArrowUp className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">{activeStock.price} ({activeStock.change})</span>
                        <span>NSE Large Cap</span>
                     </div>
                   </div>
                 </div>
                 
                 <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
                    <button 
                      onClick={() => navigate(`/why/${activeStock.ticker}`)}
                      className="flex-1 md:flex-none border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white rounded-lg px-6 py-3 font-bold transition-all text-sm flex items-center justify-center gap-2"
                    >
                      <Zap className="w-4 h-4" /> AI Reasoning
                    </button>
                    <button 
                      onClick={() => navigate(`/stock/${activeStock.ticker}`)}
                      className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-8 py-3 font-bold transition-all text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                    >
                      View Deep Dive <ArrowRight className="w-4 h-4" />
                    </button>
                 </div>
              </div>

              {/* Main Analysis Wrapper */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-[400px]">
                
                {/* Left Deep Chart Sector */}
                <div className="md:col-span-2 bg-[#111118] border border-white/5 rounded-2xl p-6 flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                     <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">AI SIGNAL TRAJECTORY</p>
                     <div className="flex gap-1">
                        <span className="px-2 py-1 text-[9px] font-bold bg-white/10 text-white rounded cursor-pointer">1H</span>
                        <span className="px-2 py-1 text-[9px] font-bold bg-blue-500 text-white rounded cursor-pointer">1D</span>
                        <span className="px-2 py-1 text-[9px] font-bold bg-white/5 text-gray-400 rounded cursor-pointer hover:bg-white/10">1W</span>
                     </div>
                  </div>

                  {/* Recharts Glowing Area Chart Mockup */}
                  <div className="flex-1 w-full min-h-[250px] relative mt-2 -mx-4 bg-[#0a0f18] rounded-xl border border-blue-500/10 overflow-hidden">
                    {/* Background Grid Pattern inside chart */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />
                    <ResponsiveContainer width="100%" height="100%" className={"relative z-10"}>
                      <AreaChart data={chartData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                          </filter>
                        </defs>
                        <YAxis hide domain={['dataMin - 100', 'dataMax + 100']} />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#10b981" 
                          strokeWidth={2}
                          fillOpacity={1} 
                          fill="url(#colorValue)" 
                          filter="url(#glow)"
                          animationDuration={2000}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Target Bounds Bottom Strip */}
                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/5 px-4">
                     <div>
                       <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1 text-center">ENTRY RANGE</p>
                       <p className="text-sm font-bold text-white">{activeStock.entry}</p>
                     </div>
                     <div>
                       <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1 text-center">TARGET 1</p>
                       <p className="text-sm font-bold text-emerald-400">{activeStock.target}</p>
                     </div>
                     <div>
                       <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1 text-center">STOP LOSS</p>
                       <p className="text-sm font-bold text-red-400">{activeStock.stopLoss}</p>
                     </div>
                  </div>
                </div>

                {/* Right Logic & History Column */}
                <div className="flex flex-col gap-6">
                  
                  {/* Radar Reasoning List */}
                  <div className="bg-[#111118] border border-white/5 rounded-2xl p-6 flex-1 flex flex-col justify-center relative overflow-hidden">
                     <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]"></div>
                     <p className="text-[10px] font-bold text-white tracking-widest uppercase mb-6">RADAR REASONING</p>
                     
                     <div className="space-y-4">
                        <div className="flex items-start gap-4">
                           <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                           <p className="text-sm text-gray-400 font-medium leading-relaxed tracking-wide">Cluster of institutional buy orders detected in dark pools at ₹1,835 support level.</p>
                        </div>
                        <div className="flex items-start gap-4">
                           <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                           <p className="text-sm text-gray-400 font-medium leading-relaxed tracking-wide">Credit demand sentiment index reached 5-year high in institutional reports.</p>
                        </div>
                        <div className="flex items-start gap-4">
                           <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                           <p className="text-sm text-gray-400 font-medium leading-relaxed tracking-wide">RSI divergence on the 4H frame indicates total exhaustion of recent pullback.</p>
                        </div>
                     </div>
                  </div>

                  {/* Historical Performance Block */}
                  <div className="bg-[#111118] border border-white/5 rounded-2xl p-6">
                    <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-6 line-clamp-2">HISTORICAL PERFORMANCE</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs text-gray-400 w-24">Win Rate <span className="text-[9px]">(similar setup)</span></span>
                      <span className="text-base font-black tracking-tight">{activeStock.winRate}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs text-gray-400">Avg. Hold Time</span>
                      <span className="text-base font-black tracking-tight">{activeStock.holdTime}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">Max Drawdown</span>
                      <span className="text-base font-black tracking-tight text-red-400">{activeStock.maxDrawdown}</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Bottom Strip Cross Asset Correlation */}
              <div className="w-full bg-[#111118] border border-white/5 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between mt-2 gap-4">
                 <div className="flex items-center gap-3 w-full md:w-auto">
                    <p className="text-[10px] font-bold text-gray-100 tracking-widest uppercase whitespace-nowrap">CROSS-ASSET CORRELATION MATRIX</p>
                    <p className="text-[10px] text-gray-500 font-medium hidden md:block border-l border-white/10 pl-3">High correlation increases systemic risk exposure</p>
                 </div>
                 <div className="flex overflow-x-auto gap-4 md:w-auto w-full pb-2 md:pb-0 hide-scrollbar">
                    {/* Indian Market Metrics */}
                    <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg shrink-0 border border-white/5">
                       <span className="text-[10px] font-black text-white bg-white/10 px-1 rounded">NIFTY</span>
                       <span className="text-[11px] font-bold text-gray-400">Nifty 50</span>
                       <span className="text-xs font-black text-emerald-400 ml-1">0.84</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg shrink-0 border border-white/5">
                       <span className="text-[10px] font-black text-white bg-white/10 px-1 rounded">BANK</span>
                       <span className="text-[11px] font-bold text-gray-400">BankNifty</span>
                       <span className="text-xs font-black text-emerald-400 ml-1">0.96</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg shrink-0 border border-white/5">
                       <span className="text-[10px] font-black text-white bg-white/10 px-1 rounded">USD</span>
                       <span className="text-[11px] font-bold text-gray-400">USDINR</span>
                       <span className="text-xs font-black text-red-400 ml-1">-0.32</span>
                    </div>
                 </div>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default Radar;

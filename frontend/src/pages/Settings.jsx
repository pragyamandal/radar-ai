import React, { useState } from 'react';
import { Search, Bell, Shield, CalendarDays, BellRing, Lock, Activity, Sparkles, ChevronRight, HelpCircle, Database, ChevronDown, SplitSquareVertical, ArrowUpRight } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { updateUserProfile } from '../api.js';

const Settings = () => {
   const [riskProfile, setRiskProfile] = useState(
      localStorage.getItem('risk_profile') || 'moderate'
   );
   const [saved, setSaved] = useState(false);

   const handleSave = async () => {
      try {
         const user_id = localStorage.getItem('user_id');
         if (user_id) {
            await updateUserProfile(user_id, riskProfile, 'medium');
            localStorage.setItem('risk_profile', riskProfile);
         }
         setSaved(true);
         setTimeout(() => setSaved(false), 2000);
      } catch (err) {
         console.error('Failed to save settings:', err);
      }
   };

   return (
      <div className="min-h-screen bg-[#0A0A0F] font-sans text-white flex">
         <Sidebar />

         <main className="ml-64 flex-1 p-8 pb-32 h-screen overflow-y-auto bg-[#0A0A0F]">

            {/* Top Header Placeholder */}
            <header className="flex justify-between items-start mb-10 w-full max-w-[1400px] mx-auto">
               <div className="flex-1 max-w-md relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                     type="text"
                     placeholder="Search settings..."
                     className="w-full bg-[#111118] border border-white/5 rounded-lg py-3 pl-10 pr-4 text-sm text-gray-300 focus:outline-none focus:border-white/10 transition-colors placeholder-gray-600"
                  />
               </div>

               <div className="flex items-center space-x-6 mt-1">
                  <Bell className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                  <div className="w-8 h-8 rounded-full bg-gray-800 border border-white/20 overflow-hidden flex items-center justify-center cursor-pointer hover:border-white/40 transition-colors">
                     <img src="https://i.pravatar.cc/150?u=a042581f4e39026704d" alt="User" className="w-full h-full object-cover" />
                  </div>
               </div>
            </header>

            {/* MAIN GRID */}
            <div className="grid grid-cols-12 gap-8 w-full max-w-[1400px] mx-auto">

               {/* LEFT COLUMN - NAV */}
               <div className="col-span-12 xl:col-span-3 flex flex-col gap-6">
                  <h1 className="text-[28px] font-bold text-white mb-2 tracking-tight">Settings</h1>

                  <nav className="flex flex-col space-y-1.5">
                     <a href="#" className="flex items-center gap-3 px-4 py-3.5 bg-white/5 border-l-[3px] border-[#8BA4F9] rounded-r-lg text-white font-semibold transition-colors shadow-sm">
                        <Shield className="w-4 h-4 text-[#8BA4F9]" />
                        <span className="text-[15px]">Risk Profile</span>
                     </a>
                     <a href="#" className="flex items-center gap-3 px-4 py-3.5 text-gray-400 hover:text-white hover:bg-white/[0.02] border-l-[3px] border-transparent rounded-r-lg transition-colors font-medium">
                        <CalendarDays className="w-4 h-4" />
                        <span className="text-[15px]">Investment Horizon</span>
                     </a>
                     <a href="#" className="flex items-center gap-3 px-4 py-3.5 text-gray-400 hover:text-white hover:bg-white/[0.02] border-l-[3px] border-transparent rounded-r-lg transition-colors font-medium">
                        <BellRing className="w-4 h-4" />
                        <span className="text-[15px]">Notifications</span>
                     </a>
                     <a href="#" className="flex items-center gap-3 px-4 py-3.5 text-gray-400 hover:text-white hover:bg-white/[0.02] border-l-[3px] border-transparent rounded-r-lg transition-colors font-medium">
                        <Lock className="w-4 h-4" />
                        <span className="text-[15px]">Privacy & Security</span>
                     </a>
                     <a href="#" className="flex items-center gap-3 px-4 py-3.5 text-gray-400 hover:text-white hover:bg-white/[0.02] border-l-[3px] border-transparent rounded-r-lg transition-colors font-medium">
                        <Activity className="w-4 h-4" />
                        <span className="text-[15px]">Brokerage API</span>
                     </a>
                  </nav>

                  <div className="mt-8 bg-[#111118] border border-white/5 rounded-xl p-6 hover:border-white/10 transition-colors shadow-sm">
                     <div className="bg-emerald-500/10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded mb-4 border border-emerald-500/20">
                        <Sparkles className="w-3 h-3 text-emerald-400" />
                        <span className="text-[9px] font-black tracking-widest text-emerald-400 uppercase">AI STATUS</span>
                     </div>
                     <p className="text-sm text-gray-300 leading-relaxed font-medium">
                        Your risk profile is currently optimized for <span className="text-white font-bold">{riskProfile}</span> Nifty 50 environments.
                     </p>
                  </div>
               </div>

               {/* MIDDLE COLUMN - CONTROLS */}
               <div className="col-span-12 xl:col-span-6 flex flex-col pl-4 pr-2">

                  <div className="mb-10">
                     <h2 className="text-2xl font-bold tracking-tight text-white mb-2">Risk Profile & Tolerance</h2>
                     <p className="text-[15px] text-gray-400 font-medium">Define how the AI engine calculates your portfolio health and trade suggestions.</p>
                  </div>

                  <div className="flex flex-col gap-10">

                     {/* Section 1: RISK MANAGEMENT */}
                     <section>
                        <h3 className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-4">RISK MANAGEMENT</h3>
                        <div className="bg-[#111118] border border-white/5 rounded-xl flex flex-col shadow-sm">

                           {/* Row 1 */}
                           <div className="flex justify-between items-center p-6 border-b border-white/5 hover:bg-white/[0.01] transition-colors rounded-t-xl group">
                              <div className="pr-8">
                                 <h4 className="text-base font-bold text-white mb-1.5">Aggressive Rebalancing</h4>
                                 <p className="text-sm text-gray-400 leading-relaxed font-medium">Allow AI to trigger auto-rebalancing on &gt;5% drift</p>
                              </div>
                              <div className="w-[52px] h-[28px] bg-emerald-500 rounded-full relative cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)] shrink-0 transition-colors">
                                 <div className="w-5 h-5 rounded-full bg-white absolute right-1 top-[4px] shadow-sm transform transition-transform"></div>
                              </div>
                           </div>

                           {/* Row 2 */}
                           <div className="flex justify-between items-center p-6 border-b border-white/5 hover:bg-white/[0.01] transition-colors group">
                              <div className="pr-8">
                                 <h4 className="text-base font-bold text-gray-300 mb-1.5 group-hover:text-white transition-colors">Stop-Loss Auto-Shield</h4>
                                 <p className="text-sm text-gray-500 leading-relaxed font-medium">Dynamic stops based on real-time volatility indices</p>
                              </div>
                              <div className="w-[52px] h-[28px] bg-gray-700 rounded-full relative cursor-pointer shrink-0 transition-colors hover:bg-gray-600">
                                 <div className="w-5 h-5 rounded-full bg-white absolute left-1 top-[4px] shadow-sm transform transition-transform"></div>
                              </div>
                           </div>

                           {/* Row 3 */}
                           <div className="flex justify-between items-center p-6 cursor-pointer hover:bg-white/[0.02] transition-colors rounded-b-xl group">
                              <div className="pr-8">
                                 <h4 className="text-base font-bold text-white mb-1.5">Max Drawdown Limit</h4>
                                 <p className="text-sm text-gray-400 leading-relaxed font-medium">Hard stop for all active AI trading algorithms</p>
                              </div>
                              <div className="flex items-center gap-2 text-white font-bold text-[15px] shrink-0">
                                 12% <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                              </div>
                           </div>
                        </div>
                     </section>

                     {/* Section 2: ANALYSIS DEPTH */}
                     <section>
                        <h3 className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-4">ANALYSIS DEPTH</h3>
                        <div className="bg-[#111118] border border-white/5 rounded-xl p-8 shadow-sm">
                           <div className="flex justify-between items-center mb-10">
                              <h4 className="text-base font-bold text-white">Sentiment Sensitivity</h4>
                              <span className="text-[10px] font-black tracking-widest text-[#34D399] uppercase">MODERATE (0.64)</span>
                           </div>
                           <div className="relative w-full h-1.5 bg-gray-800 rounded-full mb-6 cursor-pointer group">
                              <div className="absolute top-0 left-0 h-full bg-[#34D399]/30 rounded-l-full" style={{ width: '64%' }}></div>
                              <div className="absolute top-1/2 -translate-y-1/2 left-[64%] w-[18px] h-[18px] bg-[#34D399] rounded-full shadow-[0_0_15px_rgba(52,211,153,0.6)] cursor-pointer group-hover:scale-110 transition-transform"></div>
                           </div>
                           <div className="flex justify-between items-center">
                              <span className="text-[10px] font-black tracking-widest text-gray-500 uppercase">CONSERVATIVE</span>
                              <span className="text-[10px] font-black tracking-widest text-gray-500 uppercase">SPECULATIVE</span>
                           </div>
                        </div>
                     </section>

                     {/* Section 3: DATA INTEGRITY */}
                     <section>
                        <h3 className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-4">DATA INTEGRITY</h3>
                        <div className="bg-[#111118] border border-white/5 rounded-xl flex flex-col shadow-sm">

                           {/* Row 1 */}
                           <div className="flex justify-between items-center p-6 border-b border-white/5 cursor-pointer hover:bg-white/[0.02] transition-colors rounded-t-xl group">
                              <div className="flex items-center gap-5">
                                 <div className="w-[44px] h-[44px] border border-white/5 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center shrink-0 shadow-inner group-hover:border-white/20 transition-colors">
                                    <Database className="w-5 h-5 text-[#8BA4F9]" />
                                 </div>
                                 <div className="pr-4">
                                    <h4 className="text-base font-bold text-white leading-snug">Market Data Source</h4>
                                 </div>
                              </div>
                              <div className="flex items-center gap-3">
                                 <span className="text-[15px] font-bold text-[#8BA4F9]">Zerodha Kite API v3</span>
                                 <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                              </div>
                           </div>

                           {/* Row 2 */}
                           <div className="flex justify-between items-center p-6 hover:bg-white/[0.01] transition-colors rounded-b-xl group">
                              <div className="flex items-start gap-5 pr-8">
                                 <div className="w-[44px] h-[44px] bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center shrink-0 mt-1 shadow-[inset_0_2px_10px_rgba(16,185,129,0.05)]">
                                    <SplitSquareVertical className="w-5 h-5 text-emerald-400" />
                                 </div>
                                 <div>
                                    <h4 className="text-base font-bold text-white mb-2">Enable Shadow-Mode Execution</h4>
                                    <p className="text-sm text-gray-400 leading-relaxed font-medium">Simulate all AI trades in a virtual environment parallel to your live brokerage to compare performance benchmarks.</p>
                                 </div>
                              </div>
                              <div className="w-[52px] h-[28px] bg-emerald-500 rounded-full relative cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)] shrink-0 transition-colors">
                                 <div className="w-5 h-5 rounded-full bg-white absolute right-1 top-[4px] shadow-sm transform transition-transform"></div>
                              </div>
                           </div>
                        </div>
                     </section>

                     {/* Action Bar */}
                     <div className="flex items-center justify-end gap-8 mt-2 pt-6">
                        <button className="text-[15px] font-bold text-[#F87171] hover:text-red-400 transition-colors">Reset to Default</button>
                        <button className="text-[15px] font-bold text-white hover:text-gray-300 transition-colors">Discard</button>
                        <button onClick={handleSave} className={`${saved ? 'bg-emerald-600' : 'bg-[#3B82F6] hover:bg-blue-500'} text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:-translate-y-0.5 text-[15px]`}>{saved ? 'Saved ✓' : 'Save Changes'}</button>
                     </div>
                  </div>
               </div>

               {/* RIGHT COLUMN - INFO */}
               <div className="col-span-12 xl:col-span-3 flex flex-col gap-6 pl-2">

                  {/* Guidance Card */}
                  <div className="bg-[#111118] border border-white/5 rounded-xl p-7 hover:border-white/10 transition-colors shadow-sm">
                     <div className="w-[36px] h-[36px] rounded-lg bg-[#8BA4F9]/10 border border-[#8BA4F9]/20 flex items-center justify-center mb-5">
                        <HelpCircle className="w-5 h-5 text-[#8BA4F9]" />
                     </div>
                     <h3 className="text-[17px] font-bold text-white mb-2">Need guidance?</h3>
                     <p className="text-[13px] text-gray-400 leading-relaxed mb-6 font-medium">
                        Setting your risk profile too high may lead to increased portfolio volatility during market hours. We recommend a Moderate setting for first-time users.
                     </p>
                     <a href="#" className="inline-flex text-[13px] font-bold text-[#8BA4F9] hover:text-white transition-colors items-center gap-1 group">
                        Read Analysis Docs <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                     </a>
                  </div>

                  {/* Real Time Sync Info */}
                  <div className="bg-[#111118] border border-white/5 rounded-xl p-7 relative overflow-hidden mt-2 shadow-sm">
                     <div className="flex items-center gap-2 mb-6 relative z-10">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                        <span className="text-[10px] font-black tracking-widest text-white uppercase">REAL-TIME SYNC</span>
                     </div>

                     {/* Visual data stream simulation */}
                     <div className="w-full h-32 rounded-lg bg-[#0A0A0F] border border-white/5 relative overflow-hidden mb-6 flex flex-col items-center justify-center gap-2">
                        {/* Multiple sine waves imitating data flow */}
                        <svg className="absolute inset-0 w-full h-full stroke-gray-700/50 fill-none" preserveAspectRatio="none" viewBox="0 0 100 100">
                           <path d="M0,50 Q25,20 50,50 T100,50" className="animate-[pulse_2s_infinite]" strokeWidth="0.5" />
                           <path d="M0,50 Q25,80 50,50 T100,50" className="animate-[pulse_3s_infinite]" strokeWidth="0.5" />
                           <path d="M0,40 Q35,10 60,60 T100,40" strokeWidth="0.2" className="animate-[pulse_1.5s_infinite]" />
                           <path d="M0,60 Q30,90 70,30 T100,60" strokeWidth="0.3" className="animate-[pulse_2.5s_infinite]" />

                           {/* particles */}
                           <circle cx="20" cy="50" r="0.5" fill="#fff" className="animate-ping" />
                           <circle cx="80" cy="50" r="0.5" fill="#fff" className="animate-pulse" />
                           <circle cx="50" cy="50" r="1" fill="#10B981" className="animate-pulse shadow-[0_0_5px_#10B981]" />
                        </svg>
                        {/* Vignette fade */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0A0A0F_100%)] opacity-80 pointer-events-none"></div>
                     </div>

                     <p className="text-[11px] text-gray-500 leading-relaxed relative z-10 font-medium tracking-wide">
                        Settings are propagated across the Terminal and linked Mobile applications within 200ms.
                     </p>
                  </div>

               </div>

            </div>

         </main>
      </div>
   );
};

export default Settings;

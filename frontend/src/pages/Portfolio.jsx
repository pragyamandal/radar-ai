import React from 'react';
import { Search, Bell, PieChart as PieChartIcon, ArrowRight, TriangleAlert, Info, TrendingUp, Filter, MoreHorizontal } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import Sidebar from '../components/Sidebar';

const sectorDataList = [
  { name: 'IT', value: 42.5, color: '#8BA4F9' }, 
  { name: 'Financials', value: 28.0, color: '#34D399' }, 
  { name: 'Auto', value: 14.2, color: '#FBBF24' }, 
  { name: 'Other', value: 15.3, color: '#4B5563' }, 
];

const yieldData = [
  { name: 'Q1', conservative: 400, aggressive: 0 },
  { name: 'Q2', conservative: 500, aggressive: 0 },
  { name: 'Q3', conservative: 480, aggressive: 0 },
  { name: 'Q4', conservative: 600, aggressive: 0 },
  { name: 'Q1 (P)', conservative: 0, aggressive: 750 },
  { name: 'Q2 (P)', conservative: 0, aggressive: 850 },
  { name: 'Q3 (P)', conservative: 0, aggressive: 810 },
  { name: 'Q4 (P)', conservative: 0, aggressive: 950 },
];

const holdings = [
  { 
    ticker: 'HDFCBANK', name: 'HDFC Bank Ltd.', 
    alloc: 18.9, val: '₹28,02,294.40', 
    ret: '+4.12%', retClass: 'text-emerald-400', 
    pl: '+₹1,42,900.20', plClass: 'text-emerald-400', avg: 'Avg ₹1580.10'
  },
  { 
    ticker: 'INFY', name: 'Infosys Ltd.', 
    alloc: 15.2, val: '₹22,54,110.09', 
    ret: '+0.88%', retClass: 'text-emerald-400', 
    pl: '+₹61,004.50', plClass: 'text-emerald-400', avg: 'Avg ₹1410.22'
  },
  { 
    ticker: 'TATAMOTORS', name: 'Tata Motors', 
    alloc: 8.1, val: '₹12,04,428.82', 
    ret: '-2.10%', retClass: 'text-red-400', 
    pl: '-₹42,104.40', plClass: 'text-red-400', avg: 'Avg ₹990.00'
  },
  { 
    ticker: 'TCS', name: 'Tata Consultancy', 
    alloc: 12.4, val: '₹18,39,021.11', 
    ret: '+1.42%', retClass: 'text-emerald-400', 
    pl: '+₹24,192.00', plClass: 'text-emerald-400', avg: 'Avg ₹3742.10'
  },
];

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0F] font-sans text-white flex">
      <Sidebar />

      <main className="ml-64 flex-1 p-8 pb-32 h-screen overflow-y-auto bg-[#0A0A0F]">
        
        {/* Top Header Placeholder */}
        <header className="flex justify-between items-start mb-10 w-full">
          <div className="flex-1 max-w-2xl relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search markets or assets..."
              className="w-full bg-[#111118] border border-white/5 rounded-lg py-3 pl-10 pr-4 text-sm text-gray-300 focus:outline-none focus:border-white/10 transition-colors placeholder-gray-600"
            />
          </div>

          <div className="flex items-center space-x-6 mt-1">
            <div className="flex items-center space-x-2">
               <span className="text-[10px] font-bold text-emerald-500 tracking-widest uppercase">MARKET OPEN</span>
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <Bell className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            <div className="w-8 h-8 rounded-full bg-gray-800 border border-white/20 overflow-hidden flex items-center justify-center cursor-pointer hover:border-white/40 transition-colors">
                 <img src="https://i.pravatar.cc/150?u=a042581f4e39026704d" alt="User" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* AGGREGATED NET WORTH ROW */}
        <div className="mb-8">
          <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">AGGREGATED NET WORTH</p>
          <div className="flex justify-between items-end">
            <div className="flex items-end gap-5">
              <h1 className="text-6xl font-black tracking-tight text-white leading-none">
                ₹1,48,29,034<span className="text-gray-400">.42</span>
              </h1>
              <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-md font-bold text-sm tracking-wide mb-1 border border-emerald-500/20">
                +12.4%
              </div>
            </div>
            
            <div className="flex space-x-4 mb-1">
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-6 rounded-lg transition-colors shadow-[0_0_20px_rgba(37,99,235,0.2)] text-sm flex items-center gap-2">
                <span className="text-lg leading-none">+</span> Add Capital
              </button>
              <button className="bg-[#111118] border border-white/10 hover:border-white/20 hover:bg-white/5 text-white font-bold py-2.5 px-6 rounded-lg transition-all text-sm shadow-sm">
                Rebalance Portfolio
              </button>
            </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-12 gap-6 w-full">
          
          {/* LEFT COLUMN */}
          <div className="col-span-12 xl:col-span-4 flex flex-col gap-6">
            
            {/* Sector Allocation */}
            <div className="bg-[#111118] border border-white/5 rounded-xl p-8 flex flex-col justify-between" style={{minHeight: "440px"}}>
              <div className="flex items-center gap-3 mb-2">
                <PieChartIcon className="w-5 h-5 text-blue-400" />
                <h3 className="text-base font-bold text-white tracking-wide">Sector Allocation</h3>
              </div>
              
              <div className="relative w-full h-56 flex items-center justify-center my-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sectorDataList}
                      innerRadius={80}
                      outerRadius={105}
                      paddingAngle={3}
                      dataKey="value"
                      stroke="none"
                      cornerRadius={4}
                    >
                      {sectorDataList.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                {/* Center Text Wrapper */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-1">
                  <div className="bg-[#111118] w-[130px] h-[130px] rounded-[18px] flex flex-col items-center justify-center shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)] border border-white/5">
                     <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">DIVERSITY</span>
                     <span className="text-3xl font-black text-white tracking-tight">High</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mt-2">
                {sectorDataList.map((item, i) => (
                  <div key={i} className="flex justify-between items-center group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: item.color }}></span>
                      <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">{item.name}</span>
                    </div>
                    <span className="text-sm font-bold text-white">{item.value.toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Beta Sensitivity */}
            <div className="bg-[#111118] border border-white/5 rounded-xl p-8 flex flex-col relative overflow-hidden group cursor-pointer hover:border-white/10 transition-colors" style={{minHeight: "220px"}}>
              <div className="absolute top-1/2 right-[-20%] w-64 h-64 bg-emerald-500/5 rounded-full blur-[50px] pointer-events-none transition-all group-hover:bg-emerald-500/10"></div>
              
              <div className="flex justify-between items-center mb-6 relative z-10">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">BETA SENSITIVITY</p>
                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
              <h2 className="text-[64px] font-black text-white tracking-tight mb-2 leading-none relative z-10">0.92</h2>
              <p className="text-sm text-gray-400 leading-relaxed pr-6 mt-auto relative z-10">
                Portfolio is currently 8% less volatile than the Nifty 50 benchmark.
              </p>
            </div>

            {/* Radar Signal */}
            <div className="bg-[#111118] border border-white/5 border-l-4 border-l-[#8BA4F9] rounded-xl p-8 flex flex-col relative overflow-hidden group hover:shadow-[0_0_30px_rgba(139,164,249,0.05)] transition-all cursor-pointer" style={{minHeight: "220px"}}>
              <div className="mb-5 inline-flex relative z-10">
                <span className="bg-[#8BA4F9]/10 text-[#8BA4F9] text-[9px] font-black tracking-widest uppercase px-2 py-1 rounded">RADAR SIGNAL</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 relative z-10 pr-8">Alpha Opportunity in Banking</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-6 relative z-10">
                Unusual options activity detected in private banks ahead of earnings. Consider adjusting hedge positioning.
              </p>
              <a href="#" className="mt-auto text-sm font-bold text-[#8BA4F9] hover:text-white transition-colors flex items-center gap-1 group-hover:underline decoration-[#8BA4F9]/50 underline-offset-4 relative z-10">
                View Deep Dive
              </a>
              {/* Absolute icon overlay */}
              <div className="absolute right-0 bottom-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none group-hover:scale-110 duration-500">
                <TrendingUp className="w-32 h-32" />
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="col-span-12 xl:col-span-8 flex flex-col gap-6">
            
            {/* Concentration Alert */}
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:bg-amber-500/10 transition-colors cursor-pointer group shadow-lg shadow-amber-500/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 flex flex-col items-center justify-center shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                  <TriangleAlert className="w-6 h-6 text-amber-500 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-amber-500 mb-1">High Concentration Alert</h4>
                  <p className="text-sm text-amber-500/80 font-medium">AI suggests rebalancing IT sector position to mitigate volatility risk.</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-amber-500 font-bold text-sm bg-amber-500/10 px-4 py-2 rounded-lg shrink-0 hover:bg-amber-500 hover:text-amber-950 transition-colors border border-amber-500/20 w-full sm:w-auto justify-center">
                Execute Trim <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>

            {/* Core Holdings */}
            <div className="bg-[#111118] border border-white/5 rounded-xl flex flex-col shadow-sm">
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white tracking-tight">Core Holdings</h3>
                <div className="flex gap-4">
                   <Filter className="w-4 h-4 text-gray-500 hover:text-white cursor-pointer transition-colors" />
                   <MoreHorizontal className="w-4 h-4 text-gray-500 hover:text-white cursor-pointer transition-colors" />
                </div>
              </div>
              
              <div className="w-full">
                {/* Table Header Wrapper */}
                <div className="grid grid-cols-12 gap-x-4 px-8 py-5 border-b border-white/5 text-[10px] font-bold text-gray-500 tracking-widest uppercase bg-white/[0.01]">
                  <div className="col-span-4">ASSET</div>
                  <div className="col-span-2 text-left pl-2">ALLOCATION</div>
                  <div className="col-span-2 text-right">VALUE</div>
                  <div className="col-span-2 text-right">DAY RETURN</div>
                  <div className="col-span-2 text-right">TOTAL P/L</div>
                </div>
                
                {/* Table Body */}
                <div className="divide-y divide-white/5">
                   {holdings.map((h, i) => (
                     <div key={i} className="grid grid-cols-12 gap-x-4 px-8 py-6 hover:bg-white/[0.02] transition-colors items-center group cursor-pointer">
                        
                        {/* ASSET */}
                        <div className="col-span-4 flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-[#1A1A24] border border-white/5 flex items-center justify-center shrink-0 shadow-inner group-hover:border-white/20 transition-colors">
                             <span className="text-sm font-black text-gray-300 tracking-widest">{h.ticker.substring(0,2)}</span>
                          </div>
                          <div>
                             <h4 className="text-base font-bold text-white mb-0.5 tracking-wide group-hover:text-blue-400 transition-colors">{h.ticker}</h4>
                             <p className="text-xs font-semibold text-gray-500">{h.name}</p>
                          </div>
                        </div>

                        {/* ALLOCATION */}
                        <div className="col-span-2 flex flex-col justify-center gap-2 pl-2">
                           <div className="w-full h-[6px] bg-gray-800 rounded-full overflow-hidden shadow-inner">
                             <div className="h-full bg-blue-500/80 rounded-full group-hover:bg-blue-400 transition-colors" style={{width: `${h.alloc}%`}}></div>
                           </div>
                           <span className="text-xs font-bold text-gray-400">{h.alloc}%</span>
                        </div>

                        {/* VALUE */}
                        <div className="col-span-2 text-right font-mono text-[15px] font-bold text-gray-200">
                           {h.val}
                        </div>

                        {/* DAY RETURN */}
                        <div className={`col-span-2 text-right font-mono text-[13px] font-bold px-4 ${h.retClass}`}>
                           {h.ret}
                        </div>

                        {/* TOTAL P/L */}
                        <div className="col-span-2 text-right flex flex-col items-end">
                           <div className={`font-mono text-[15px] font-bold tracking-tight mb-1 ${h.plClass}`}>{h.pl}</div>
                           <div className="text-[10px] font-bold text-gray-600 tracking-wide">{h.avg}</div>
                        </div>

                     </div>
                   ))}
                </div>
              </div>

              <div className="p-5 border-t border-white/5 bg-[#0A0A0F]/50 hover:bg-white/[0.03] cursor-pointer transition-colors rounded-b-xl flex items-center justify-center group">
                <p className="text-center text-[10px] font-bold text-gray-400 group-hover:text-white tracking-widest uppercase transition-colors">VIEW ALL 42 ASSETS</p>
              </div>
            </div>

            {/* Projected Yield (12M) */}
            <div className="bg-[#111118] border border-white/5 rounded-xl p-8 flex flex-col h-[320px]">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-lg font-bold text-white tracking-tight">Projected Yield (12M)</h3>
                 <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                       <span className="w-2.5 h-2.5 rounded-full bg-[#8BA4F9] shadow-[0_0_8px_rgba(139,164,249,0.5)]"></span>
                       <span className="text-[10px] font-bold text-white uppercase tracking-widest">Aggressive</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="w-2.5 h-2.5 rounded-full bg-gray-700"></span>
                       <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Conservative</span>
                    </div>
                 </div>
              </div>

              <div className="w-full flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yieldData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }} barGap={0} barSize={40}>
                    <XAxis 
                       dataKey="name" 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{fill: '#6B7280', fontSize: 10, fontWeight: 'bold'}} 
                       dy={10} 
                    />
                    <RechartsTooltip 
                       cursor={{fill: 'rgba(255,255,255,0.03)'}}
                       contentStyle={{backgroundColor: '#0A0A0F', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '16px', boxShadow: '0 4px 30px rgba(0,0,0,0.5)'}} 
                       itemStyle={{color: '#fff', fontWeight: 'bold', fontSize: '14px', paddingTop: '4px'}}
                       labelStyle={{color: '#9ca3af', fontWeight: 'bold', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.1)'}}
                    />
                    <Bar dataKey="conservative" fill="#374151" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="aggressive" fill="#8BA4F9" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
};

export default Portfolio;

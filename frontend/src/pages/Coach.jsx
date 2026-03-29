import { useState, useEffect } from 'react';
import { Search, Bell, TrendingDown, Clock, ShieldCheck, Plus, Sparkles, ChevronRight } from 'lucide-react';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Sidebar from '../components/Sidebar';
import { getBehaviourCoach, getNiftySIP } from '../api.js';

const ScoreRing = ({ score }) => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
      <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 160 160">
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="#1F2937"
          strokeWidth="8"
          fill="transparent"
        />
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="#60A5FA" // soft blue glow
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="drop-shadow-[0_0_12px_rgba(96,165,250,0.6)] animate-[pulse_3s_ease-in-out_infinite]"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center mt-1">
        <span className="text-6xl font-black text-white tracking-tight">{score}</span>
        <span className="text-[9px] font-bold text-gray-400 tracking-widest uppercase mt-2">BEHAVIOR SCORE</span>
      </div>
    </div>
  );
};

const Coach = () => {
  const [coachData, setCoachData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [sipSummary, setSipSummary] = useState(null);

  useEffect(() => {
    const sampleTrades = [
      { ticker: "RELIANCE.NS", action: "BUY", price_change_at_buy: 6.5, days_held: 4, return_pct: -3.2, portfolio_pct: 22 },
      { ticker: "TCS.NS", action: "BUY", price_change_at_buy: 7.0, days_held: 3, return_pct: -1.5, portfolio_pct: 18 },
      { ticker: "INFY.NS", action: "BUY", price_change_at_buy: 2.0, days_held: 30, return_pct: 4.5, portfolio_pct: 10 },
      { ticker: "HDFCBANK.NS", action: "BUY", price_change_at_buy: 1.5, days_held: 45, return_pct: 3.0, portfolio_pct: 28 }
    ];
    getBehaviourCoach(sampleTrades)
      .then(data => { setCoachData(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  useEffect(() => {
    getNiftySIP()
      .then(data => {
        if (data && data.data) {
          setChartData(data.data);
          const last = data.data[data.data.length - 1];
          const first = data.data[0];
          const opportunityCost = Math.round(last.perf - last.sip);
          const alphaGain = Math.round(((last.sip - last.perf) / last.perf) * 100 * 10) / 10;
          setSipSummary({ opportunityCost, alphaGain });
        }
      })
      .catch(err => console.error('SIP fetch failed:', err));
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0F] font-sans text-white flex">
      <Sidebar />

      <main className="ml-64 flex-1 p-8 pb-32 h-screen overflow-y-auto bg-[#0A0A0F]">

        {/* Top Header */}
        <header className="flex justify-between items-start mb-10 w-full">
          <div className="flex-1 max-w-2xl relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search patterns, history, or market signals..."
              className="w-full bg-[#111118] border border-white/5 rounded-lg py-3 pl-10 pr-4 text-sm text-gray-300 focus:outline-none focus:border-white/10 transition-colors placeholder-gray-600"
            />
          </div>

          <div className="flex items-center space-x-6 mt-1">
            <Bell className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            <div className="flex items-center space-x-3 text-right">
              <div>
                <p className="text-sm font-bold text-white leading-tight">Behavior Coach</p>
                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Verified Analyst</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-800 border border-white/20 overflow-hidden">
                <img src="https://i.pravatar.cc/150?u=a042581f4e39026704d" alt="User" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* TOP SECTION */}
        <div className="grid grid-cols-12 gap-6 w-full">

          {/* Left Column: The Score Ring */}
          <div className="col-span-12 xl:col-span-4 flex flex-col">
            <div className="bg-[#111118] border border-white/5 rounded-xl p-8 flex flex-col h-full relative overflow-hidden">
              {/* Background gradient hint */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-48 bg-blue-500/5 rounded-full blur-[60px] pointer-events-none"></div>

              <div className="flex-1 flex flex-col items-center justify-center pt-8 z-10">
                <ScoreRing score={coachData ? coachData.behaviour_score : 62} />

                <h2 className="text-2xl font-bold tracking-tight text-white mt-12 mb-4 text-center">Moderate Emotional Bias</h2>
                <p className="text-sm text-gray-400 text-center leading-relaxed">
                  {coachData ? coachData.summary : 'Analyzing your trading behavior...'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-12 pt-6 border-t border-white/5 z-10 w-full">
                <div className="text-center">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">PATIENCE</p>
                  <p className={`${coachData?.behaviour_score >= 70 ? 'text-emerald-400' : coachData?.behaviour_score >= 40 ? 'text-amber-400' : 'text-red-400'} font-bold text-lg`}>
                    {coachData?.behaviour_score >= 70 ? 'High' : coachData?.behaviour_score >= 40 ? 'Medium' : 'Low'}
                  </p>
                </div>
                <div className="border-l border-white/5 text-center">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">FOMO RISK</p>
                  <p className={`${coachData?.spike_chasing?.count >= 3 ? 'text-red-400' : coachData?.spike_chasing?.count >= 1 ? 'text-amber-400' : 'text-emerald-400'} font-bold text-lg`}>
                    {coachData?.spike_chasing?.count >= 3 ? 'Critical' : coachData?.spike_chasing?.count >= 1 ? 'Moderate' : 'Low'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Active Behavioral Patterns */}
          <div className="col-span-12 xl:col-span-8 flex flex-col">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white mb-1">Active Behavioral Patterns</h2>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Detected by AI-Radar Engine</p>
              </div>
              <span className="text-[10px] font-bold text-blue-400 hover:text-blue-300 cursor-pointer uppercase tracking-widest mb-1">HISTORICAL AUDIT</span>
            </div>

            <div className="grid grid-cols-2 gap-4 flex-1">
              {/* Card 1: Panic Exit */}
              <div className="bg-[#111118] border border-white/5 rounded-xl p-6 flex flex-col group cursor-pointer hover:border-red-500/20 transition-colors">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <TrendingDown className="w-5 h-5 text-red-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className={`${coachData?.spike_chasing?.count > 0 ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-400'} text-[9px] font-black tracking-widest uppercase px-2 py-1 rounded`}>
                    {coachData?.spike_chasing?.count > 0 ? 'NEGATIVE IMPACT' : 'DISCIPLINED'}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{coachData?.spike_chasing?.count > 0 ? 'Spike Chasing' : 'Panic Exit'}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-6 flex-1">
                  {coachData?.spike_chasing?.count > 0
                    ? `Bought ${coachData.spike_chasing.count} stocks during price spikes. ${coachData.spike_chasing.losses} trades lost money.`
                    : 'No spike chasing detected in recent trades.'}
                </p>
                <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase tracking-widest border-t border-white/5 pt-4">
                  <span>RECURRENCE: <span className="text-white">{coachData?.spike_chasing?.count > 0 ? `${coachData.spike_chasing.count} TIMES` : '0 TIMES'}</span></span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              {/* Card 2: Late Entry */}
              <div className="bg-[#111118] border border-white/5 rounded-xl p-6 flex flex-col group cursor-pointer hover:border-blue-500/20 transition-colors">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className={`${coachData?.panic_selling?.count > 0 ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-400'} text-[9px] font-black tracking-widest uppercase px-2 py-1 rounded`}>
                    {coachData?.panic_selling?.count > 0 ? 'NEGATIVE IMPACT' : 'DISCIPLINED'}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Late Entry</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-6 flex-1">
                  {coachData?.panic_selling?.count > 0
                    ? `Panic selling detected ${coachData.panic_selling.count} times. Sold too early during market dips.`
                    : 'No panic selling detected in recent trades. Good holding discipline.'}
                </p>
                <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase tracking-widest border-t border-white/5 pt-4">
                  <span>RECURRENCE: <span className="text-white">{coachData?.panic_selling?.count > 0 ? `${coachData.panic_selling.count} EVENTS` : '0 EVENTS'}</span></span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              {/* Card 3: Stop-Loss Integrity */}
              <div className="bg-[#111118] border border-white/5 rounded-xl p-6 flex flex-col group cursor-pointer hover:border-emerald-500/20 transition-colors">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-black tracking-widest uppercase px-2 py-1 rounded">DISCIPLINED</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Stop-Loss Integrity</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-6 flex-1">
                  {coachData?.warnings?.length > 0
                    ? coachData.warnings[0]
                    : 'Good discipline maintained in recent trades.'}
                </p>
                <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase tracking-widest border-t border-white/5 pt-4">
                  <span>STRENGTH: <span className="text-emerald-400">HIGH</span></span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              {/* Card 4: Ghost Connect */}
              <div className="bg-[#111118]/30 border border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center group cursor-pointer hover:border-white/30 hover:bg-[#111118]/80 transition-all min-h-[200px]">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Plus className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <span className="text-xs font-bold text-gray-400 tracking-widest uppercase group-hover:text-white transition-colors">CONNECT NEW SOURCE</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="mt-8 bg-[#111118] border border-white/5 rounded-xl p-8">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-white uppercase mb-2">THE BEHAVIORAL COST</h2>
              <p className="text-sm font-medium text-gray-400">Hypothetical Performance: Active Management vs. Nifty 50 Systematic SIP Strategy (Last 12 Months)</p>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                <div className="w-2.5 h-2.5 rounded bg-[#4b5563]"></div>
                <span className="text-[10px] font-bold text-gray-300 tracking-widest uppercase">YOUR PERFORMANCE</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                <div className="w-2.5 h-2.5 rounded bg-[#3b82f6]"></div>
                <span className="text-[10px] font-bold text-white tracking-widest uppercase">SYSTEMATIC SIP</span>
              </div>
            </div>
          </div>

          <div className="w-full h-[320px] mb-8 relative">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData.length > 0 ? chartData : []} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 'bold' }}
                  dy={15}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0A0A0F', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px' }}
                  itemStyle={{ color: '#fff', fontWeight: 'bold', padding: '4px 0' }}
                  labelStyle={{ color: '#9ca3af', marginBottom: '8px', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Line
                  type="monotone"
                  dataKey="sip"
                  name="Systematic SIP"
                  stroke="#3b82f6"
                  strokeWidth={4}
                  dot={{ r: 0 }}
                  activeDot={{ r: 6, fill: '#3b82f6', stroke: '#0A0A0F', strokeWidth: 4 }}
                />
                <Line
                  type="linear"
                  dataKey="perf"
                  name="Your Performance"
                  stroke="#4b5563"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={{ r: 0 }}
                  activeDot={{ r: 4, fill: '#4b5563', stroke: '#0A0A0F', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>

            {/* Gradient overlay to fade bottom */}
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#111118] to-transparent pointer-events-none"></div>
          </div>

          {/* Bottom Summary Strip */}
          <div className="bg-[#0A0A0F] border border-white/5 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">TOTAL OPPORTUNITY COST</p>
              <p className="text-3xl font-black text-red-400 tracking-tight">{sipSummary ? `-₹${Math.abs(sipSummary.opportunityCost).toLocaleString('en-IN')}` : '-₹1,18,500.00'}</p>
            </div>

            <div className="mb-4 md:mb-0 text-center md:px-16 md:border-l md:border-r border-white/5">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">POTENTIAL ALPHA GAIN</p>
              <p className="text-3xl font-black text-emerald-400 tracking-tight">{sipSummary ? `+${sipSummary.alphaGain}%` : '+8.4%'}</p>
            </div>

            <div>
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-lg flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:-translate-y-0.5">
                <Sparkles className="w-5 h-5" />
                Switch to Automated Radar SIP
              </button>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Coach;

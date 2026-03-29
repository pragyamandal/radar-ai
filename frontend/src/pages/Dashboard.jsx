import React, { useState, useEffect } from 'react';
import { Search, Bell, User, Zap, ChevronUp, ChevronDown, CheckCircle2, TrendingUp, AlertTriangle, ShieldAlert, Rocket, Settings } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { getRadarOpportunities, getMarketIndices, getWatchlist } from '../api.js';

// Mock chart data for Recharts
const chartData = [
  { value: 400 },
  { value: 430 },
  { value: 410 },
  { value: 450 },
  { value: 420 },
  { value: 480 },
  { value: 460 },
  { value: 510 }
];

const formatStory = (story) => {
  if (!story) return story;
  return story
    .replace('.NS', '')
    .replace(/_/g, ' ')
    .replace('detected', '— Signal Detected')
    .replace(/\b\w/g, l => l.toUpperCase());
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [opportunities, setOpportunities] = useState([]);
  const [indices, setIndices] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [sentiment, setSentiment] = useState(null);
  const storedName = localStorage.getItem('radar_user_name') || 'Investor';

  useEffect(() => {
    getRadarOpportunities().then(data => {
      if (!data.do_nothing && data.opportunities) {
        setOpportunities(data.opportunities.slice(0, 2));
      }
    }).catch(err => console.error(err));
  }, []);

  useEffect(() => {
    getMarketIndices()
      .then(data => {
        console.log('Indices data:', data);
        setIndices(data);
      })
      .catch(err => console.error('Indices fetch failed:', err));
  }, []);

  useEffect(() => {
    getWatchlist()
      .then(data => {
        if (data.watchlist) setWatchlist(data.watchlist);
        if (data.sentiment) setSentiment({ text: data.sentiment, pct: data.sentiment_pct });
      })
      .catch(err => console.error('Watchlist fetch failed:', err));
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0F] font-sans text-white flex">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Area (Offset by 64 = 16rem for sidebar) */}
      <main className="ml-64 flex-1 p-8 pb-32">

        {/* Top Header */}
        <header className="flex justify-between items-start mb-10 w-full">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Good Morning,<br />{storedName}</h1>
            <p className="text-gray-400 font-medium mt-1 tracking-wide">
              Market sentiment is{' '}
              <span className={sentiment?.text === 'Bullish' ? 'text-emerald-400 font-bold' : sentiment?.text === 'Bearish' ? 'text-red-400 font-bold' : 'text-yellow-400 font-bold'}>
                {sentiment ? `${sentiment.text} (${sentiment.pct > 0 ? '+' : ''}${sentiment.pct}%)` : 'Bullish (+2.4%)'}
              </span>
            </p>
          </div>

          <div className="flex-1 max-w-md mx-8 mt-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search markets, assets, or AI queries..."
              className="w-full bg-[#111118] border border-white/5 rounded-lg py-3 pl-10 pr-4 text-sm text-gray-300 focus:outline-none focus:border-white/10 transition-colors placeholder-gray-600"
            />
          </div>

          <div className="flex items-center space-x-6 mt-3">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-emerald-500 tracking-widest uppercase">LIVE MARKETS</span>
            </div>
            <Bell className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
              <User className="w-4 h-4 text-gray-300" />
            </div>
          </div>
        </header>

        {/* 12 Column Grid System */}
        <div className="grid grid-cols-12 gap-6 w-full">

          {/* LEFT COLUMN (3 cols) */}
          <div className="col-span-12 xl:col-span-3 space-y-6">

            {/* Fear & Greed */}
            <div className="bg-[#111118] border border-white/5 rounded-xl p-6 relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold text-gray-500 tracking-widest uppercase w-20 leading-tight">FEAR & GREED INDEX</span>
                <div className="text-right">
                  <p className="text-xl font-black text-emerald-400 leading-tight tracking-tight">74 /</p>
                  <p className="text-lg font-black text-emerald-400 mb-1 leading-tight tracking-tight">Greed</p>
                </div>
              </div>
              <div className="relative h-2 w-full rounded-full bg-gray-800 flex overflow-visible mt-6">
                <div className="flex-1 rounded-l-full" style={{ background: 'linear-gradient(90deg, #ef4444, #f59e0b)' }}></div>
                <div className="w-2 h-full bg-[#111118]"></div>
                <div className="flex-1 rounded-r-full pt-1" style={{ background: 'linear-gradient(90deg, #f59e0b, #10b981)' }}></div>

                {/* Indicator Tick */}
                <div className="absolute top-[-4px] bottom-[-4px] w-1 bg-white left-[74%] rounded-full shadow-[0_0_10px_white] z-10 transition-all duration-1000"></div>
              </div>
              <div className="flex justify-between text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-2">
                <span>FEAR</span>
                <span>NEUTRAL</span>
                <span>GREED</span>
              </div>
            </div>

            {/* Daily Return */}
            <div className="bg-[#111118] border border-white/5 rounded-xl p-6 hover:bg-white/[0.04] transition-colors group cursor-pointer">
              <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-4">DAILY RETURN</p>
              <h2 className="text-4xl font-black tracking-tight mb-2 group-hover:scale-[1.02] transition-transform origin-left text-white">+₹12,492.00</h2>
              <div className="flex items-center text-sm font-bold text-emerald-400">
                <TrendingUp className="w-4 h-4 mr-1" /> +1.84%
              </div>
            </div>

            {/* AI Confidence */}
            <div className="bg-gradient-to-br from-[#111118] to-indigo-900/10 border border-white/5 rounded-xl p-6 relative overflow-hidden group">
              {/* Decorative background blur */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-[40px] group-hover:bg-indigo-500/30 transition-colors"></div>

              <div className="flex justify-between items-center mb-6 relative">
                <p className="text-[10px] font-bold text-blue-300 tracking-widest uppercase">AI CONFIDENCE SCORE</p>
                <Zap className="w-4 h-4 text-blue-400" />
              </div>
              <h2 className="text-4xl font-black tracking-tight mb-2 relative">92.4%</h2>
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest relative">OPTIMIZED ALLOCATION DETECTED</p>
            </div>

            {/* Active Signals List */}
            <div className="bg-[#111118] border border-white/5 rounded-xl p-6">
              <p className="text-[10px] font-bold text-white tracking-widest uppercase mb-4 flex items-center gap-2">
                <Zap className="w-3 h-3" /> ACTIVE SIGNALS
              </p>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-bold text-white">NIFTY50</p>
                  <p className={`text-xs font-bold ${indices?.nifty50?.change_pct > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {indices?.nifty50?.signal || 'LOADING'}
                  </p>
                </div>
                <p className="text-sm font-bold text-white">
                  {indices ? String(indices.nifty50.value) : '—'}
                </p>
              </div>

              <div className="flex justify-between items-center mt-2">
                <div>
                  <p className="text-sm font-bold text-white">BANKNIFTY</p>
                  <p className={`text-xs font-bold ${indices?.banknifty?.change_pct > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {indices?.banknifty?.signal || 'LOADING'}
                  </p>
                </div>
                <p className="text-sm font-bold text-white">
                  {indices ? String(indices.banknifty.value) : '—'}
                </p>
              </div>
            </div>

          </div>

          {/* CENTER COLUMN (6 cols) */}
          <div className="col-span-12 xl:col-span-6 flex flex-col space-y-6">

            {/* Coach Alert (Warning Box) */}
            <div className="bg-[#16120b] border border-amber-500/30 rounded-xl p-6 flex flex-col relative overflow-hidden">
              <div className="absolute right-0 bottom-0 p-4 opacity-5 pointer-events-none">
                <Settings className="w-32 h-32 text-amber-500" />
              </div>

              <div className="flex gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-white mb-2">Coach Alert: Portfolio Rebalance</h3>
                  <p className="text-sm text-gray-400 leading-relaxed pr-8 relative z-10">
                    Your exposure to Financials has exceeded 40%. AI recommends shifting 4.2% of your ICICI Bank position into defensive assets to maintain your target risk profile.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-auto relative z-10 mx-16">
                <button className="bg-transparent text-xs font-bold text-white hover:text-amber-400 transition-colors uppercase tracking-widest border border-white/10 hover:border-amber-500/30 rounded-lg px-6 py-2.5">DISMISS</button>
                <button className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-widest hover:bg-amber-500 hover:text-amber-950 transition-colors rounded-lg px-6 py-2.5">EXECUTE REBALANCE</button>
              </div>
            </div>

            {/* Opportunities Header */}
            <div className="flex justify-between items-end mt-4">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">TOP ALPHA OPPORTUNITIES</span>
              <span className="text-[10px] font-bold text-blue-400 hover:text-blue-300 cursor-pointer uppercase tracking-widest">VIEW ALL ASSETS</span>
            </div>

            {opportunities.length > 0 ? (
              <div
                onClick={() => navigate(`/why/${opportunities[0].ticker.replace('.NS', '')}`)}
                className="bg-[#111118] border border-white/5 rounded-xl p-6 flex-1 flex flex-col relative group cursor-pointer hover:border-emerald-500/30 transition-colors"
              >
                <div className="flex justify-between items-start z-10 relative">
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight mb-1 group-hover:text-emerald-400 transition-colors">
                      {opportunities[0].ticker.replace('.NS', '')}
                    </h3>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                      {opportunities[0].signals.map(s =>
                        s.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
                      ).join(' + ')} • NSE
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {opportunities[0].risk_level}
                    </p>
                    {opportunities[0].backtest && (
                      <p className={`text-sm font-bold mt-2 ${opportunities[0].backtest.median_return > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {opportunities[0].backtest.median_return > 0 ? '+' : ''}{opportunities[0].backtest.median_return}% median
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-gray-400 text-sm mt-4 leading-relaxed">{formatStory(opportunities[0].signal_story)}</p>
                {opportunities[0].backtest && (
                  <div className="flex justify-between mt-4 border-t border-white/5 pt-4">
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">WIN RATE</p>
                      <p className="text-sm font-extrabold text-white">{opportunities[0].backtest.win_rate}%</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">BEST RETURN</p>
                      <p className="text-sm font-extrabold text-emerald-400">+{opportunities[0].backtest.best_return}%</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-[#111118] border border-white/5 rounded-xl p-6 flex-1 flex items-center justify-center">
                <p className="text-gray-500 text-sm">No strong opportunities today. Market says wait.</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-6">
              {opportunities.slice(1, 3).map((opp, idx) => (
                <div
                  key={idx}
                  onClick={() => navigate(`/why/${opp.ticker.replace('.NS', '')}`)}
                  className="bg-[#111118] border border-white/5 rounded-xl p-6 hover:bg-white/[0.03] transition-colors cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                      <div className="w-3 h-3 bg-blue-400 rounded-sm"></div>
                    </div>
                    {opp.backtest && (
                      <span className={`text-xs font-bold tracking-wide ${opp.backtest.median_return > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {opp.backtest.median_return > 0 ? '+' : ''}{opp.backtest.median_return}%
                      </span>
                    )}
                  </div>
                  <h4 className="text-xl font-bold tracking-tight group-hover:text-blue-400 transition-colors">
                    {opp.ticker.replace('.NS', '')}
                  </h4>
                  <div className="mt-4 flex items-center space-x-2 text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    <span>{opp.signals.map(s =>
                      s.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
                    ).join(' + ')}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT COLUMN (3 cols) */}
          <div className="col-span-12 xl:col-span-3 space-y-6">

            {/* Sector Exposure */}
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">SECTOR EXPOSURE</p>
              <div className="grid grid-cols-2 gap-3 h-48">
                {/* Top Left */}
                <div className="bg-[#6ee7b7] rounded-sm p-3 flex flex-col justify-end text-[#064e3b] shadow-[0_0_15px_rgba(110,231,183,0.15)]">
                  <span className="text-sm font-black tracking-widest uppercase">TECH</span>
                  <span className="text-[10px] font-bold">42.4%</span>
                </div>
                {/* Top Right */}
                <div className="bg-[#34d399] rounded-sm p-3 flex flex-col justify-end text-[#064e3b]">
                  <span className="text-sm font-black tracking-widest uppercase">FIN</span>
                  <span className="text-[10px] font-bold">18.1%</span>
                </div>
                {/* Bottom Left */}
                <div className="bg-[#0f766e] rounded-sm p-3 flex flex-col justify-end text-[#ccfbf1]">
                  <span className="text-sm font-black tracking-widest uppercase">ENER</span>
                  <span className="text-[10px] font-bold">12.5%</span>
                </div>
                {/* Bottom Right */}
                <div className="bg-[#fb923c] rounded-sm opacity-80 p-3 flex flex-col justify-end text-[#7c2d12]">
                  <span className="text-sm font-black tracking-widest uppercase">CONS</span>
                  <span className="text-[10px] font-bold">9.2%</span>
                </div>
              </div>
            </div>

            {/* Watchlist */}
            <div className="bg-[#111118] border border-white/5 rounded-xl p-6 mt-6">
              <div className="flex justify-between items-center mb-6">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">WATCHLIST</p>
                <div className="flex gap-1 cursor-pointer hover:text-white text-gray-500 transition-colors">
                  <div className="w-1 h-1 rounded-full bg-current"></div>
                  <div className="w-1 h-1 rounded-full bg-current"></div>
                  <div className="w-1 h-1 rounded-full bg-current"></div>
                </div>
              </div>

              <div className="space-y-4">
                {watchlist.length > 0 ? watchlist.map((stock, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                    <div>
                      <p className="text-sm font-bold text-white">{stock.ticker}</p>
                      <p className="text-xs text-gray-500">{stock.ticker === 'TCS' ? 'Tata Consultancy' : stock.ticker === 'ICICIBANK' ? 'ICICI Bank Ltd' : stock.ticker === 'ITC' ? 'ITC Limited' : 'State Bank India'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-white">₹{stock.price.toLocaleString('en-IN')}</p>
                      <p className={`text-xs font-bold ${stock.change_pct >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {stock.change_pct >= 0 ? '+' : ''}{stock.change_pct}%
                      </p>
                    </div>
                  </div>
                )) : (
                  <p className="text-gray-500 text-sm">Loading watchlist...</p>
                )}
              </div>

              <button className="w-full text-center mt-6 text-xs text-blue-400 font-bold tracking-widest hover:text-blue-300 transition-colors">
                ADD TICKER +
              </button>
            </div>

            {/* AI Insight Box */}
            <div className="bg-[#111118] border border-white/5 border-l-4 border-l-blue-500 rounded-r-xl rounded-l-sm p-6 relative overflow-hidden group hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all cursor-pointer">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Rocket className="w-16 h-16" />
              </div>
              <p className="text-[10px] font-bold text-blue-300 tracking-widest uppercase mb-4">LIVE AI INSIGHT</p>
              <p className="text-sm text-gray-300 italic font-mono leading-relaxed">
                "Volume in HDFCBANK call options has increased 400% in the last 15 minutes. High-frequency whale movement detected at the ₹1850 strike."
              </p>
            </div>

          </div>

        </div>

      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 w-16 h-16 bg-blue-500 hover:bg-blue-400 rounded-2xl flex items-center justify-center shadow-[0_10px_30px_rgba(59,130,246,0.4)] hover:shadow-[0_10px_40px_rgba(59,130,246,0.6)] hover:-translate-y-1 transition-all z-50">
        <Zap className="w-6 h-6 text-white fill-white/80" />
      </button>

    </div>
  );
};

export default Dashboard;

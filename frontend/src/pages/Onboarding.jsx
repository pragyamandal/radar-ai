import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Radar, ArrowRight, Shield, Scale, Rocket, Check } from 'lucide-react';

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  // Form State
  const [name, setName] = useState('');
  const [riskProfile, setRiskProfile] = useState('Balanced');
  const [monthlyInvestment, setMonthlyInvestment] = useState(25000);
  const [horizon, setHorizon] = useState('Medium (1-3 yrs)');
  const [holdings, setHoldings] = useState('');

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      localStorage.setItem('radar_user_name', name || 'Investor');
      navigate('/dashboard');
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const slideVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3, ease: "easeIn" } }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white flex flex-col font-sans selection:bg-blue-500/30 overflow-hidden relative">
      
      {/* Background Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Nav & Progress Indicator */}
      <nav className="w-full max-w-4xl mx-auto px-6 pt-10 pb-6 flex items-center justify-between z-10 relative">
        <div className="flex items-center space-x-2">
           <div className="bg-blue-600 p-1.5 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            <Radar className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Radar</span>
        </div>
        
        {/* Progress Dots */}
        <div className="flex items-center space-x-3">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-center">
              <motion.div 
                animate={{
                  backgroundColor: step >= num ? '#3B82F6' : '#2D3748',
                  scale: step === num ? 1.2 : 1
                }}
                className={`w-2.5 h-2.5 rounded-full ${step >= num ? 'shadow-[0_0_10px_#3B82F6]' : ''}`}
              />
              {num < 3 && (
                <div className={`w-8 h-[2px] mx-2 transition-colors duration-500 ${step > num ? 'bg-blue-500/50' : 'bg-white/10'}`} />
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full px-6 z-10 relative pb-20 mt-8">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: IDENTITY */}
          {step === 1 && (
            <motion.div
              key="step1"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">What should we call you?</h1>
              <p className="text-gray-400 mb-10 text-lg">Let's personalize your intelligence feed.</p>
              
              <div className="mb-10 group">
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Vikram"
                  className="w-full bg-transparent border-b-2 border-white/20 focus:border-blue-500 text-3xl md:text-4xl font-bold py-4 text-white placeholder-gray-700 outline-none transition-colors"
                  autoFocus
                />
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={nextStep}
                disabled={name.trim().length === 0}
                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white rounded-xl px-10 py-4 font-bold transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
              >
                Continue to Profile <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}

          {/* STEP 2: RISK ARCHITECTURE */}
          {step === 2 && (
            <motion.div
              key="step2"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <h1 className="text-4xl font-bold tracking-tight mb-4">What is your investing style?</h1>
              <p className="text-gray-400 mb-8 text-lg">We calibrate our signals based on your volatility tolerance.</p>
              
              <div className="space-y-4 mb-10">
                {/* Conservative */}
                <div 
                  onClick={() => setRiskProfile('Conservative')}
                  className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 flex items-center justify-between ${riskProfile === 'Conservative' ? 'bg-blue-600/10 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.15)]' : 'bg-white/5 border-white/10 hover:border-white/30'}`}
                >
                  <div className="flex items-center gap-5">
                    <div className={`p-3 rounded-xl ${riskProfile === 'Conservative' ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-gray-400'}`}>
                      <Shield className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Conservative</h3>
                      <p className="text-sm text-gray-400">Capital preservation focus (8-12% target)</p>
                    </div>
                  </div>
                  {riskProfile === 'Conservative' && <Check className="w-6 h-6 text-blue-500" />}
                </div>

                {/* Balanced */}
                <div 
                  onClick={() => setRiskProfile('Balanced')}
                  className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 flex items-center justify-between ${riskProfile === 'Balanced' ? 'bg-blue-600/10 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.15)]' : 'bg-white/5 border-white/10 hover:border-white/30'}`}
                >
                  <div className="flex items-center gap-5">
                    <div className={`p-3 rounded-xl ${riskProfile === 'Balanced' ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-gray-400'}`}>
                      <Scale className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Balanced</h3>
                      <p className="text-sm text-gray-400">Growth paired with stability (12-18% target)</p>
                    </div>
                  </div>
                  {riskProfile === 'Balanced' && <Check className="w-6 h-6 text-blue-500" />}
                </div>

                {/* Aggressive */}
                <div 
                  onClick={() => setRiskProfile('Aggressive')}
                  className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 flex items-center justify-between ${riskProfile === 'Aggressive' ? 'bg-blue-600/10 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.15)]' : 'bg-white/5 border-white/10 hover:border-white/30'}`}
                >
                  <div className="flex items-center gap-5">
                    <div className={`p-3 rounded-xl ${riskProfile === 'Aggressive' ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-gray-400'}`}>
                      <Rocket className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Aggressive</h3>
                      <p className="text-sm text-gray-400">Maximum growth capture (18%+ target)</p>
                    </div>
                  </div>
                  {riskProfile === 'Aggressive' && <Check className="w-6 h-6 text-blue-500" />}
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={prevStep}
                  className="bg-white/5 hover:bg-white/10 text-white rounded-xl px-8 py-4 font-bold transition-all border border-white/10"
                >
                  Back
                </button>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={nextStep}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-10 py-4 font-bold transition-all flex justify-center items-center gap-3 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                >
                  Confirm Risk Profile <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: INVESTMENT SETUP */}
          {step === 3 && (
            <motion.div
              key="step3"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <h1 className="text-4xl font-bold tracking-tight mb-2">Configure your Radar</h1>
              <p className="text-gray-400 mb-8 text-lg">Set constraints for the engine.</p>
              
              <div className="space-y-8 mb-10">
                {/* Slider / Capital Input */}
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
                  <div className="flex justify-between items-end mb-4">
                    <label className="text-sm font-medium text-gray-300">Monthly deployment capacity</label>
                    <span className="text-2xl font-bold text-blue-400">₹{monthlyInvestment.toLocaleString('en-IN')}</span>
                  </div>
                  <input 
                    type="range" 
                    min="5000" 
                    max="500000" 
                    step="5000"
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
                    <span>₹5K</span>
                    <span>₹5L+</span>
                  </div>
                </div>

                {/* Horizon Pills */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Target Time Horizon</label>
                  <div className="flex flex-wrap gap-3">
                    {['Short (<1 yr)', 'Medium (1-3 yrs)', 'Long (3+ yrs)'].map((h) => (
                      <button
                        key={h}
                        onClick={() => setHorizon(h)}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all border ${horizon === h ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/30'}`}
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tags input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Existing Holdings (Optional)</label>
                  <p className="text-xs text-gray-500 mb-3 tracking-wide">We'll check for overlap before suggesting signals.</p>
                  <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus-within:border-blue-500 transition-colors">
                    <input 
                      type="text" 
                      value={holdings}
                      onChange={(e) => setHoldings(e.target.value)}
                      placeholder="e.g. RELIANCE, HDFCBANK, TCS..."
                      className="w-full bg-transparent text-white placeholder-gray-600 outline-none text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={prevStep}
                  className="bg-white/5 hover:bg-white/10 text-white rounded-xl px-8 py-4 font-bold transition-all border border-white/10"
                >
                  Back
                </button>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={nextStep}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl px-10 py-4 font-bold transition-all flex justify-center items-center gap-3 shadow-[0_0_30px_rgba(59,130,246,0.5)] border border-blue-400/30"
                >
                  <Rocket className="w-5 h-5 fill-white/20" /> Launch My Radar
                </motion.button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
};

export default Onboarding;

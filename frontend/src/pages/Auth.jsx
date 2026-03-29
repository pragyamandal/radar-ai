import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Radar, ArrowRight, ShieldCheck } from 'lucide-react';
import { loginUser, registerUser } from '../api.js';

const Auth = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState('phone');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setStep('otp');
    }
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    if (!otp.every(d => d !== '')) return;
    setLoading(true);
    setError('');
    try {
      const email = phone + '@radar.com';
      const password = otp.join('');
      let result;
      if (activeTab === 'login') {
        result = await loginUser(email, password);
      } else {
        result = await registerUser(email, password, 'moderate', 'medium');
      }
      if (result.user_id) {
        localStorage.setItem('user_id', result.user_id);
        localStorage.setItem('risk_profile', result.risk_profile || 'moderate');
        navigate('/onboarding');
      } else {
        setError(result.detail || 'Authentication failed');
      }
    } catch (err) {
      setError('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Only allow 1 char
    if (!/^\d*$/.test(value)) return; // Only numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus logic mock-up (a real implementation would use refs, but this is sufficient for a UI prototype)
    if (value !== '' && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  return (
    <div className="min-h-screen flex text-white bg-[#0A0A0F] font-sans">

      {/* Left Panel - Hidden on Mobile */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-16">
        {/* Deep Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#060609] via-[#0A0A0F] to-[#0A1628] z-0" />

        {/* Animated Orbs */}
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] z-10"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-[80px] z-10"
        />

        {/* Content */}
        <div className="relative z-20 flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="bg-blue-600 p-2 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.4)]">
            <Radar className="w-8 h-8 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tight">Radar</span>
        </div>

        <div className="relative z-20 max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Join 14 Crore+ Indians.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Invest with AI Precision.
              </span>
            </h1>
            <p className="text-lg text-gray-400 font-light leading-relaxed">
              Institutional-grade market intelligence, simplified for you. Build wealth systematically with data, not emotion.
            </p>
          </motion.div>
        </div>

        <div className="relative z-20 flex items-center space-x-2 text-sm text-gray-500 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>AES-256 Bit Encryption standard</span>
        </div>
      </div>

      {/* Right Panel - Auth Flow */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-20">

        {/* Grid pattern background for right side */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] -z-10" />

        <div className="w-full max-w-md">
          {/* Mobile Logo Header */}
          <div className="lg:hidden flex justify-center mb-10 cursor-pointer" onClick={() => navigate('/')}>
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-1.5 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <Radar className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">Radar</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
          >
            <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Welcome to Radar</h2>

            {step === 'phone' ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key="phone-input"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  {/* Tabs */}
                  <div className="flex bg-white/5 p-1 rounded-xl mb-8 border border-white/5">
                    <button
                      onClick={() => setActiveTab('login')}
                      className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'login' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
                    >
                      Login
                    </button>
                    <button
                      onClick={() => setActiveTab('signup')}
                      className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'signup' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
                    >
                      Sign Up
                    </button>
                  </div>

                  <form onSubmit={handlePhoneSubmit}>
                    <div className="mb-6 group">
                      <label className="block text-sm font-medium text-gray-400 mb-2">Mobile Number</label>
                      <div className="flex items-center bg-transparent border border-white/10 rounded-xl overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                        <div className="pl-4 pr-3 py-3 border-r border-white/10 bg-white/5 text-gray-300 font-medium">
                          +91
                        </div>
                        <input
                          type="tel"
                          maxLength="10"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                          placeholder="Enter your phone number"
                          className="w-full bg-transparent px-4 py-3 text-white placeholder-gray-600 focus:outline-none font-medium text-lg tracking-widest"
                          autoFocus
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep('otp')}
                      disabled={phone.length < 10}
                      className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white rounded-xl py-3.5 font-bold transition-all flex items-center justify-center gap-2 mb-6"
                    >
                      Continue <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>

                  <div className="relative flex items-center py-2 mb-6 cursor-default">
                    <div className="flex-grow border-t border-white/10"></div>
                    <span className="flex-shrink-0 mx-4 text-gray-500 text-sm font-medium">or</span>
                    <div className="flex-grow border-t border-white/10"></div>
                  </div>

                  <button type="button" onClick={() => navigate('/onboarding')} className="w-full bg-transparent hover:bg-white/5 border border-white/20 text-white rounded-xl py-3.5 font-semibold transition-all flex items-center justify-center gap-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Continue with Google
                  </button>
                </motion.div>
              </AnimatePresence>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key="otp-input"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <p className="text-gray-400 text-sm mb-8 text-center">
                    Enter the 4-digit code sent to<br />
                    <span className="text-white font-semibold tracking-wider">+91 {phone}</span>
                    <button type="button" onClick={() => setStep('phone')} className="ml-2 text-blue-400 hover:text-blue-300 text-xs underline">Edit</button>
                  </p>

                  <form onSubmit={handleOtpVerify}>
                    <div className="flex justify-between gap-3 mb-8 px-2">
                      {otp.map((digit, i) => (
                        <input
                          key={i}
                          id={`otp-${i}`}
                          type="text"
                          maxLength="1"
                          value={digit}
                          onChange={(e) => handleOtpChange(i, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(i, e)}
                          className="w-16 h-16 bg-white/5 border border-white/10 rounded-xl text-center text-2xl font-bold text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        />
                      ))}
                    </div>

                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                    <button
                      type="submit"
                      disabled={!otp.every(d => d !== '') || loading}
                      className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl py-3.5 font-bold transition-all shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
                    >
                      {loading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                  </form>

                  <p className="text-center text-xs text-gray-500 mt-6 mt-4 font-medium">
                    Didn't receive code? <span className="text-blue-400 cursor-pointer hover:text-blue-300 transition-colors">Resend in 00:59</span>
                  </p>
                </motion.div>
              </AnimatePresence>
            )}

            <p className="text-xs text-center text-gray-500 mt-8 font-medium px-4">
              By continuing, you agree to Radar's <a href="#" className="underline hover:text-gray-300">Terms</a> & <a href="#" className="underline hover:text-gray-300">Privacy Policy</a>.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

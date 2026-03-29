const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

// Auth APIs
export const registerUser = async (email, password, risk_profile, investment_horizon) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, risk_profile, investment_horizon })
  });
  return res.json();
};

export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  return res.json();
};

export const getUserProfile = async (user_id) => {
  const res = await fetch(`${BASE_URL}/auth/profile/${user_id}`);
  return res.json();
};

export const updateUserProfile = async (user_id, risk_profile, investment_horizon) => {
  const res = await fetch(`${BASE_URL}/auth/profile/${user_id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ risk_profile, investment_horizon })
  });
  return res.json();
};

// Radar APIs
export const getRadarOpportunities = async () => {
  const res = await fetch(`${BASE_URL}/radar/agent`);
  return res.json();
};

export const getPersonalizedRadar = async (risk_profile, holdings, investment_horizon) => {
  const res = await fetch(`${BASE_URL}/radar/personalized`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ risk_profile, holdings, investment_horizon })
  });
  return res.json();
};

export const getExplanation = async (opportunity) => {
  const res = await fetch(`${BASE_URL}/radar/explain`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(opportunity)
  });
  return res.json();
};

export const getVoiceExplanation = async (text, ticker) => {
  const res = await fetch(`${BASE_URL}/radar/voice`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, ticker })
  });
  return res.blob();
};

// Coach APIs
export const getBehaviourCoach = async (trade_history) => {
  const res = await fetch(`${BASE_URL}/coach`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ trade_history })
  });
  return res.json();
};

// Holdings APIs
export const addHolding = async (user_id, ticker, quantity, buy_price) => {
  const res = await fetch(`${BASE_URL}/holdings/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id, ticker, quantity, buy_price })
  });
  return res.json();
};

export const getHoldings = async (user_id) => {
  const res = await fetch(`${BASE_URL}/holdings/${user_id}`);
  return res.json();
};

export const recordTrade = async (trade) => {
  const res = await fetch(`${BASE_URL}/holdings/trade`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(trade)
  });
  return res.json();
};
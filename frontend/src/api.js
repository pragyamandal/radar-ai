const BASE_URL = "/api";

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

export const getTechnicals = async (ticker) => {
  const res = await fetch(`${BASE_URL}/radar/technicals/${ticker}`);
  return res.json();
};

export const getStockHistory = async (ticker) => {
  const res = await fetch(`${BASE_URL}/radar/history/${ticker}`);
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

export const getBehaviourCoach = async (trade_history) => {
  const res = await fetch(`${BASE_URL}/coach`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ trade_history })
  });
  return res.json();
};

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

export const getNiftySIP = async () => {
  const res = await fetch(`${BASE_URL}/radar/nifty-sip`);
  return res.json();
};

export const getMarketIndices = async () => {
  const res = await fetch(`${BASE_URL}/radar/market-indices`);
  return res.json();
};

export const getWatchlist = async () => {
  const res = await fetch(`${BASE_URL}/radar/watchlist`);
  return res.json();
};
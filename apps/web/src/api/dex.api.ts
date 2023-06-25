import { API_URL } from '@/constants/api.constants';
import axios from 'axios';

export const getAllRoutes = async (fromToken: string, toToken: string) => {
  const res = await axios.get(`${API_URL}/api/v1/routes/from/${fromToken}/to/${toToken}`);
  return res.data;
};

export const getBestRoute = async (fromToken: string, toToken: string) => {
  const res = await axios.get(`${API_URL}/api/v1/routes/best/from/${fromToken}/to/${toToken}`);
  return res.data;
};

export const getRouteByPool = async (fromToken: string, toToken: string) => {
  const res = await axios.get(`${API_URL}/api/v1/routes/from/${fromToken}/to/${toToken}/${fromToken}-${toToken}`);
  return res.data;
};

export const fetchTokens = async () => {
  console.log('api url: ', API_URL);
  const res = await axios.get(`${API_URL}/api/v1/routes/tokens`);
  return res.data;
};

export const fetchPools = async () => {
  const res = await axios.get(`${API_URL}/api/v1/routes/pools`);
  return res.data;
};

export const fetchSymbols = async () => {
  const res = await axios.get(`${API_URL}/api/v1/routes/symbols`);
  return res.data;
};

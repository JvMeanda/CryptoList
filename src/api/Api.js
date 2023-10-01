import axios from 'axios';

const serverUrl = "http://localhost:3001";

export const fetchExploreCoin = async () => {
  
  const cacheKey = 'exploreCoinData';
  const cacheData = localStorage.getItem(cacheKey);
  const cachedTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
  
  if(cacheData && cachedTimestamp) {
    const currentTime = Date.now();
    const timeSinceLastFetch = currentTime - Number(cachedTimestamp);
    
    const expirationTime = 300000; // 5 minutos
    
    if(timeSinceLastFetch < expirationTime) {
      return JSON.parse(cacheData);
    }
  }
  const url = `${serverUrl}/explore-coin`;
  
  try {
    const response = await axios.get(url);
    
    localStorage.setItem(cacheKey, JSON.stringify(response.data));
    localStorage.setItem(`${cacheKey}_timestamp`, Date.now());
    
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
  
} 

export const fetchCrypto = async () => {
  const cacheKey = 'cryptoData_';
  const cacheData = localStorage.getItem(cacheKey);
  const cachedTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
  
  if (cacheData && cachedTimestamp) {
    const currentTime = Date.now();
    const timeSinceLastFetch = currentTime - Number(cachedTimestamp);
    
    const expirationTime = 300000; // 5 minutos
    
    if (timeSinceLastFetch < expirationTime) {
      return JSON.parse(cacheData);
    }
  }
  
  const url = `${serverUrl}/Crypto/brl`;
  
  try {
    const response = await axios.get(url);
    const responseData = response.data;
    
    localStorage.setItem(cacheKey, JSON.stringify(responseData));
    localStorage.setItem(`${cacheKey}_timestamp`, Date.now());
    
    return responseData;
  } catch (error) {
    console.error(error);
    return null;
  }
}
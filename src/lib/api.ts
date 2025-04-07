
/**
 * Utility functions for making authenticated API calls
 */

// Get authentication header
export const getAuthHeader = (): Headers => {
  const credentials = localStorage.getItem('teambank_credentials');
  const headers = new Headers();
  
  if (credentials) {
    headers.append('Authorization', `Basic ${credentials}`);
  }
  
  return headers;
};

// Base URL for API calls
export const API_BASE_URL = '/api';

// API endpoints
export const ENDPOINTS = {
  UPLOAD: `${API_BASE_URL}/v2/lieferung`,
  DOWNLOAD: (abrufcode: string) => `${API_BASE_URL}/v2/ruecklieferung/${abrufcode}`,
  SET_PASSWORD: `${API_BASE_URL}/v2/set_password`
};

// Function to check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('teambank_credentials');
};

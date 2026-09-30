/**
 * Centralized API Client for AgriLink AI
 * Reads baseURL from import.meta.env.VITE_API_URL
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

class ApiClient {
  constructor(baseUrl = BASE_URL) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    const config = {
      ...options,
      headers
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), options.timeout || 3000);
      
      const response = await fetch(url, {
        ...config,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.message || `HTTP error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (err) {
      console.warn(`[ApiClient] Request to ${endpoint} failed:`, err.message);
      throw err;
    }
  }

  // Market Endpoints
  async analyzeMarket(payload) {
    return this.request('/api/market/analyze', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  // Promotion Endpoints
  async createPromotion(payload) {
    return this.request('/api/promotion/create', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  // Order Endpoints
  async createOrder(payload) {
    return this.request('/api/order/create', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  async getOrder(orderId) {
    return this.request(`/api/order/${orderId}`, {
      method: 'GET'
    });
  }

  // Transport Endpoints
  async matchTransport(payload) {
    return this.request('/api/transport/match', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  // Tracking Endpoints
  async startTracking(payload) {
    return this.request('/api/tracking/start', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  async getTracking(trackingId) {
    return this.request(`/api/tracking/${trackingId}`, {
      method: 'GET'
    });
  }

  // System Health
  async checkHealth() {
    return this.request('/api/health', {
      method: 'GET'
    });
  }
}

export const api = new ApiClient();
export default api;

import axios from 'axios';

const N8N_URL = process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/sell-my-crop-master';

export async function triggerN8nMasterWorkflow(payload) {
  try {
    const response = await axios.post(N8N_URL, payload, {
      timeout: 3000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (err) {
    console.warn(`[n8nService] Could not reach n8n at ${N8N_URL}: ${err.message}`);
    return null;
  }
}

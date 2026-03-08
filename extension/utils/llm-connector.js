// File: extension/utils/llm-connector.js

// Required libraries
const axios = require('axios');

class LLMConnector {
    constructor(provider, apiKey) {
        this.provider = provider;
        this.apiKey = apiKey;
        this.baseURL = this.getBaseURL(provider);
    }

    getBaseURL(provider) {
        switch (provider) {
            case 'OpenAI':
                return 'https://api.openai.com/v1/';
            case 'Claude':
                return 'https://api.anthropic.com/v1/';
            case 'Ollama':
                return 'https://api.ollama.com/v1/';
            default:
                throw new Error('Unsupported provider');
        }
    }

    async callLLM(prompt) {
        const url = this.baseURL + 'completions'; // Adjust endpoint based on provider
        const headers = { 'Authorization': `Bearer ${this.apiKey}`, 'Content-Type': 'application/json' };

        const data = {
            prompt: prompt,
            max_tokens: 100 // Customize based on your needs
        };

        try {
            const response = await axios.post(url, data, { headers });
            return response.data;
        } catch (error) {
            console.error('Error connecting to LLM provider:', error);
            throw error;
        }
    }
}

module.exports = LLMConnector;
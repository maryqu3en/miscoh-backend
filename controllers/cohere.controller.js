const axios = require('axios');

exports.generate = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    console.error('Prompt missing or invalid:', prompt);
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  const apiKey = process.env.COHERE_API_KEY;
  if (!apiKey) {
    console.error('COHERE_API_KEY is not set in environment variables.');
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  try {
    const response = await axios.post(
      'https://api.cohere.ai/v1/generate',
      {
        model: 'command',
        prompt,
        max_tokens: 1000,
        temperature: 0.5,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (
      !response.data ||
      !response.data.generations ||
      !response.data.generations[0] ||
      typeof response.data.generations[0].text !== 'string'
    ) {
      console.error('Unexpected response from Cohere:', response.data);
      return res.status(502).json({ error: 'Invalid response from Cohere API.' });
    }

    res.json({ output: response.data.generations[0].text.trim() });
  } catch (err) {
    console.error('Error from Cohere API:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to generate code.' });
  }
};

exports.health = (req, res) => {
  res.json({ status: 'ok' });
};
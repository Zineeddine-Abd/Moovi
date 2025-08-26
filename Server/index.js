import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const agentApiUrl = process.env.AGENT_API_URL;

const clientOrigin = process.env.CLIENT_ORIGIN_URL || 'http://localhost:5173';
app.use(cors({ origin: clientOrigin }));

app.use(express.json());

app.post('/api/agent', async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  if (!agentApiUrl) {
    console.error('AGENT_API_URL is not defined in the .env file.');
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  try {
    console.log(`Forwarding query to agent: "${query}"`);

    const agentResponse = await axios.post(agentApiUrl, {
      query: query,
    });

    res.json(agentResponse.data);

  } catch (error) {
    console.error('Error forwarding request to agent:', error.message);
    res.status(500).json({ error: 'Failed to get response from the agent.' });
  }
});


app.listen(PORT, () => {
  console.log(`BFF server is running on http://localhost:${PORT}`);
});
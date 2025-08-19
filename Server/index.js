import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());


app.post('/api/agent', async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    console.log(`Forwarding query to agent: "${query}"`);

    const agentResponse = await axios.post('http://127.0.0.1:8000/agent', {
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
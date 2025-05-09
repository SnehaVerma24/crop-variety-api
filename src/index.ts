import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Mock data
let varieties = [
  {
    id: '1',
    cropName: 'Lettuce',
    varietyName: 'Butterhead',
    expectedYield: 85,
    estimatedHarvestDate: '2024-04-15',
    healthRating: 4
  },
  {
    id: '2',
    cropName: 'Tomato',
    varietyName: 'Cherry',
    expectedYield: 90,
    estimatedHarvestDate: '2024-05-01',
    healthRating: 5
  }
];

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// Get all varieties
app.get('/api/varieties', (req, res) => {
  res.json(varieties);
});

// Get single variety
app.get('/api/varieties/:id', (req, res) => {
  const variety = varieties.find(v => v.id === req.params.id);
  if (!variety) {
    return res.status(404).json({ message: 'Variety not found' });
  }
  res.json(variety);
});

// Create variety
app.post('api/varieties', (req, res) => {
  const newVariety = {
    id: uuidv4(),
    ...req.body
  };
  varieties.push(newVariety);
  res.status(201).json(newVariety);
});

// Update variety
app.put('api/varieties/:id', (req, res) => {
  const index = varieties.findIndex(v => v.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Variety not found' });
  }
  varieties[index] = { ...varieties[index], ...req.body };
  res.json(varieties[index]);
});

// Delete variety
app.delete('api/varieties/:id', (req, res) => {
  const index = varieties.findIndex(v => v.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Variety not found' });
  }
  varieties = varieties.filter(v => v.id !== req.params.id);
  res.status(204).send();
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app; 

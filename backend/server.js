const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Get all recipes
app.get('/api/recipes', (req, res) => {
  db.all("SELECT * FROM recipes ORDER BY created_at DESC", (err, rows) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch recipes' });
    res.json(rows);
  });
});

// Get single recipe by ID
app.get('/api/recipes/:id', (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM recipes WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch recipe' });
    if (!row) return res.status(404).json({ error: 'Recipe not found' });
    res.json(row);
  });
});

// Create new recipe
app.post('/api/recipes', (req, res) => {
  const { name, ingredients, instructions, cookTime } = req.body;
  if (!name || !ingredients || !instructions || !cookTime) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  db.run(
    "INSERT INTO recipes (name, ingredients, instructions, cookTime) VALUES (?, ?, ?, ?)",
    [name, ingredients, instructions, cookTime],
    function (err) {
      if (err) return res.status(500).json({ error: 'Failed to create recipe' });

      db.get("SELECT * FROM recipes WHERE id = ?", [this.lastID], (err, row) => {
        if (err) return res.status(500).json({ error: 'Recipe created but failed to fetch' });
        res.status(201).json(row);
      });
    }
  );
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString(), port: PORT });
});

// Only listen when not under tests
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Recipe API server running on port ${PORT}`);
  });
}

module.exports = app;

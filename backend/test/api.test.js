const request = require('supertest');
const app = require('../server');

describe('Recipe API', () => {
  it('GET /api/recipes should return an array', async () => {
    const res = await request(app).get('/api/recipes');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/recipes should create a new recipe', async () => {
    const newRecipe = {
      name: 'Test Pancakes',
      ingredients: 'Flour\nMilk\nEggs',
      instructions: 'Mix and cook.',
      cookTime: '10 minutes'
    };

    const res = await request(app).post('/api/recipes').send(newRecipe);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe(newRecipe.name);
  });
});
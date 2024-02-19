const request = require('supertest');
const sinon = require('sinon');
const Album = require('./models/Album');
const mongoose = require('mongoose');
// Importation de notre application Express à tester
const {app, startServer, stopServer } = require('./index');

const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/phototheque';

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(error => console.error('Error connecting to MongoDB:', error));


let server; 

// Avant tous les tests, nous démarrons le serveur
beforeAll(async () => {
  server = await startServer();
});

// Après tous les tests, nous fermons le serveur et la connexion à MongoDB
afterAll(async () => {
  await stopServer();
  await mongoose.connection.close();
});

// Après chaque test, nous restaurons tous les stubs et les spies
afterEach(() => {
  sinon.restore();
});


// Nous allons maintenant écrire nos tests

// 1- tester la route '/'
describe('GET /', () => {
  // Ce test vérifie que la route '/' redirige vers '/albums'
  it('should redirect to /albums', async () => {
    const res = await request(app)
      .get('/')
      .expect(302);
    expect(res.headers.location).toBe('/albums');
  });
});
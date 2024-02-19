const request = require('supertest');
const sinon = require('sinon');
const Album = require('./models/Album');
const mongoose = require('mongoose');

const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/phototheque';

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(error => console.error('Error connecting to MongoDB:', error));

// Reste de votre code...

// Importation de notre application Express à tester
const app = require('./index');

let server; 

// Avant chaque test, nous démarrons le serveur sur le port 3000
beforeEach((done) => {
  const port = Math.floor(Math.random() * (60000 - 3000 + 1)) + 3000;
  server = app.listen(port, done);
}, 30000);

afterAll((done) => {
  if (server.listening) {
    server.close(() => {
      mongoose.connection.close();
    });
    server.on('close', () => {
      console.log('Server closed');
      done();
    });
  } else {
    done();
  }
}, 30000);

// Après chaque test, nous fermons le serveur pour libérer le port 3000
afterEach((done) => {
  server.close(() => {
    mongoose.connection.close(done);
  }, 30000);
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
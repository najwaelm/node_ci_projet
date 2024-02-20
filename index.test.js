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

// Test de la route POST /album/create
describe('POST /album/create', () => {
  it('should create a new album', async () => {
    const albumData = { albumTitle: 'Test Album' };
    // Nous espionnons la méthode Album.create avec Sinon
    const createStub = sinon.stub(Album, 'create').resolves();
    return request(app) // Retour de la promesse
      .post('/album/create')
      .send(albumData)
      .expect(302)
      .then(res => { // Utilisation de then pour vérifier la redirection et l'appel à Album.create
        sinon.assert.calledWith(createStub, { title: albumData.albumTitle });
        expect(res.headers.location).toBe('/albums');
      });
  });
});
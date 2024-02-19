const request = require('supertest');
const sinon = require('sinon');
const Album = require('./models/Album');

//Importation de notre application Express à tester
const app = require('./index');
const { default: mongoose } = require('mongoose');

let server; 

//Avant chaque test, nous démarrons le serveur sur le port 3000
beforeEach((done) => {
  const port = Math.floor(Math.random() * (60000 - 3000 + 1)) + 3000;
  server = app.listen(port, done);
});
/**
 * beforeEach((done) => { ... }); : Déclare une fonction qui sera exécutée avant chaque test. La fonction prend un argument done, qui est une fonction de rappel que vous pouvez appeler pour indiquer que le code asynchrone a terminé son exécution.
 * 
 * const port = Math.floor(Math.random() * (60000 - 3000 + 1)) + 3000; : Génère un nombre aléatoire entre 3000 et 60000. Ce nombre sera utilisé comme port pour le serveur. L'utilisation d'un port aléatoire peut aider à éviter les conflits de port lors de l'exécution de plusieurs tests en parallèle.
 */



//Après chaque tes, nous fermons le serveur pour libérer le port 3000
afterEach((done) => {
  server.close(()=>{
    mongoose.connection.close(done);
  });
  
}, 10000);

//Nous allons maintenant écrire nos tests

//1- tester la route '/'
describe('GET /', () => {
  // Ce test vérifie que la route '/' redirige vers '/albums'
  it('should redirect to /albums', async () => {
    const res = await request(app)
      .get('/')
      .expect(302);
    expect(res.headers.location).toBe('/albums');
  });
});
/**
 *Voici une explication détaillée de chaque partie :
describe('GET /', () => { ... }); : Ceci est une suite de tests pour la route GET /. describe est une fonction Jest qui regroupe plusieurs tests relatifs à un certain contexte, ici la route GET /.

it('should redirect to /albums', async () => { ... }); : Ceci est un test individuel. it est une autre fonction Jest qui définit un test. Le premier argument est une chaîne de caractères qui décrit ce que le test est censé vérifier, et le deuxième argument est une fonction qui contient le code du test.

const res = await request(app).get('/').expect(302); : Ceci utilise Supertest pour envoyer une requête GET à la route / de l'application app. expect(302) vérifie que la réponse a un code de statut HTTP de 302, qui est le code pour une redirection.

expect(res.headers.location).toBe('/albums'); : Ceci est une assertion Jest qui vérifie que l'en-tête location de la réponse est /albums. Lorsqu'un serveur renvoie un code de statut 302, il inclut généralement un en-tête location indiquant l'URL vers laquelle le client doit être redirigé. Ce test vérifie donc que la route / redirige bien vers /albums.
 */
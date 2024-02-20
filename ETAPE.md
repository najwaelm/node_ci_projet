### Etapes :

1 Verifier que vous avez MongoDBCompas
2 Lancer Docker desktop (balaine bleu)
3 docker-compose -v (vérifier que vous pouvez conteneuriser un app)
4 Récuperer le projet : https://github.com/Paul78330/phototheque
5 Relier le ref et récuperer le contenu du ref distant

```
git pull upstream main --allow-unrelated-histories
```

6 Mettre à jour mes packages (récuperer mes dépendances)

```
npm install
```

7 installer mongoDb Atlas
8 Relier le ref de du projet GitLab git remote add origin https://gitlab.com/tms-team1/node_ci_project.githttps://gitlab.com/Paul78330

9 pousser vers le ref gitla

```
git push --set-upstream origin main
```

10 Builder docker dans le projet

```
docker build
```

11 Editer un fichier de config Dockerfile, qui permettra de configurer notre conteneurisation

```
docker build
```

12 Configuration de l'infrastructure docker-compose.yml (preparer les services indispensbles pour l'utilisation de l'app)

```
docker-compose up -d
```

-d : en détaché (en arrière plan)

13 Editer le fichier de config .gitlab-ci.yml

14 installer Jest : pour tester le code en Js

```
npm install --save-dev jest
```

15 installer supertest : bibliothèque de test pour Node.js

```
npm install --save-dev supertest
```

16 installer sinon : bibliothèque de test pour JavaScript qui fournit des fonctionnalités pour les tests unitaires, comme les espions, les stubs et les mocks.

```
npm install sinon
```

17 Editer le ficher index.test.js ( nous souhaitions tester index.js)

* le ficher à tester dois être en [nom_fichier].test.js
* resoudre les différents dans index.test.js


npm test
docker-compose up test

git remote add origin https://gitlab.com/najwaelm/node_ci_projet.git
git push https://gitlab.com/najwaelm/node_ci_projet.git
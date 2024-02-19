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
8 Relier le ref de du projet GitLabgit remote add origin https://gitlab.com/tms-team1/node_ci_project.githttps://gitlab.com/Paul78330
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

const express = require("express");
const router = express.Router(); //methode furni par express me permettant de gerer mes routes
//Une x le controller crée
const albumController = require("../controllers/album_controller");

/**
 * route : new_album
 * C'est à partir d'ici qu'on va lancer notre app
 * puisqu'ici on va pouvoir créer de nouveaux albums
 *
 * Commenter ce code après la création du controller : album_controller.js
 *  car le renser sera désormais gerer par le controler
 */
//  router.get('/album/create',(req,res)=>{ //router et non plus app
//     res.render('new_album', {title: 'Nouvel album'});
// })

//router.post('/album/create', )

//Ordre des routes très important : les routes simples vers le haut les route dynamiques plus bas

//A utiliser une x le controller album_controller crée
router.get("/album/create", albumController.createAlbumForm); //createAlbumForm ( Afficher formulaire de création)
router.post("/album/create", albumController.createAlbum); //createAlbum (créer un nouvel album)

//Route pour albums.ejs
router.get("/albums", albumController.albums);

//Route pour album.ejs
router.get("/album/:id", albumController.album);

//Route pour l'ajout d'images
router.post("/album/:id", albumController.addImage);

//Route pour supprimer un album
router.get("/album/:id/delete", albumController.deleteAlbum);

//Route pour supprimer une image de l'album
router.get("/album/:id/delete/:imageIndex", albumController.deleteImage);

module.exports = router; //Exporatation de nos routes

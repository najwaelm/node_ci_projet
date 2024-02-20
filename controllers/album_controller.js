//Après la gestion (routes/controller)
const Album = require("../models/Album"); //importation de nos medels
const path = require("path");
const fs = require("fs"); //fs permet de créer un dossier dans notre repertoire
const rimraf = require("rimraf");

const createAlbumForm = (req, res) => {
  //4-decommenter après avoir importé et géré connetc-flash
  // console.log(req.flash('error'));//flash stocke nos erreurs dans un tableau

  res.render("new_album", {
    title: "Nouvel album",

    //5 - afficher nos erreurs dans la vue
    errors: req.flash("error"),
  });
};

const createAlbum = async (req, res) => {
  //1
  //console.log(req.body);
  //res.send('ok');

  //2
  //Apres importation du model dans ce fichier
  // await Album.create({
  //     title: req.body.albumTitle,
  // })
  //3
  //gestion des erreurs : passer par try catch // pour que la lecture du code se poursuive même si des erreurs sont catch
  try { 
    await Album.create({
      title: req.body.albumTitle,
    });

    // res.redirect('/')

    //5 - après gestion album.ejs
    res.redirect("/albums");
  } catch (err) {
    // console.log(err);

    //D'abord installer et parametrer connect-flash
    req.flash("error", "Erreur lors de la création de l'album");

    res.redirect("/album/create");
  }

  //Decommenter jusqu'à 3
  // res.redirect('/')
};

//4 - gestion de ma route '/albums';
//   const albums = (req, res)=>{
//     res.render('albums', {
//         title: 'Mes albums'
//     })
// }

//5 - liaison views + bdd
const albums = async (req, res) => {
  const albums = await Album.find();
  console.log(albums);

  res.render("albums", {
    title: "Mes albums",
    albums, // equivaut à :
    //albums : albums (js comprends tt seul)
    /**
     *1er albums = var qui sera transmise à la vue
     *2eme albums = correspond à la const album qui recup les données de la bdd
     */
  });
};

//6 - gestion album
const album = async (req, res) => {
  // console.log(req.params);

  try {
    const idAlbum = req.params.id;
    const album = await Album.findById(idAlbum);

    console.log(album);

    res.render("album", {
      title: `Mon album ${album.title}`,
      album,
      errors: req.flash("error"), //gestion des erreurs de addImage
    });
  } catch (err) {
    // console.log(err);

    res.redirect("/404");
    //Etant donné que cette route n'existe pas, on sera dirigé sur "page non trouvée"
  }
};

//7 - Ajout d'image
const addImage = async (req, res) => {
  const idAlbum = req.params.id;
  const album = await Album.findById(idAlbum);

  console.log(req.files);

  //10 - sécuriser le téléchargement de fichier
  if (!req?.files?.image) {
    //? permet à js de vérifier si la propriété existe, si non inutile d'aller plus loin
    req.flash("error", "Aucun fichier mis en ligne");
    res.redirect(`/album/${idAlbum}`);

    return;
  }

  const image = req.files.image;

  //Obligation d'avoir des fichier img
  if (image.mimetype != "image/jpeg" && image.mimetype != "image/png") {
    req.flash("error", "sont acceptés uniquement les fichiers jpeg et png");
    res.redirect(`/album/${idAlbum}`);

    return;
  }

  // avec 8 - 9
  const folderPath = path.join(__dirname, "../public/uploads", idAlbum);

  const imageName = image.name;

  //Utiliser fs pour créer des dossier de manière dynamique
  fs.mkdirSync(folderPath, { recursive: true });
  /**mkdir pour make directory
   * recursive : true -> notre répertoire sera
   * bien crée de manière recursive.
   * En gros il s'assure que toute l'arborescence du dossier
   * est bien crée et si ce n'est pas le cas il se charge de le créer
   */

  //8 - Stocker image dans dossier public/upload
  const localPath = path.join(folderPath, imageName);
  //Ici on indique le chemin où on souhaite stocker notre image
  console.log(localPath);

  await image.mv(localPath);
  //.mv permet de déplacer un fichier n'importe où

  //9 - Stocker image dans l'album
  album.images.push(imageName);
  await album.save();

  res.redirect(`/album/${idAlbum}`); //Redirection vers son album
};

//8 - Supprimer Image
const deleteImage = async (req, res) => {
  const idAlbum = req.params.id;
  const album = await Album.findById(idAlbum);

  const imageIndex = req.params.imageIndex;
  const image = album.images[imageIndex]; //On sauvegarde l'indice de notre image

  if (!image) {
    //Si jamais l'url est forcé et que celui-ci n'existe pas
    res.redirect(`/album/${idAlbum}`);
    return;
  }

  album.images.splice(imageIndex, 1);

  await album.save(); // ici nous avons supprimé la haine de car de l'image

  //Il va falloir maintenant supprimer le fichier
  const imagePath = path.join(__dirname, "../public/uploads", idAlbum, image);
  fs.unlinkSync(imagePath); //cette methode va supprimer le fichier qu'il à en arg

  res.redirect(`/album/${idAlbum}`);
};

//9 - Supprimer Album
const deleteAlbum = async (req, res) => {
  const idAlbum = req.params.id;
  await Album.findByIdAndDelete(idAlbum); // A ce stade le dossier est supprimé de la bdd

  //Supprimons le dossier de l'album : utilisation du package rimraf
  const albumPath = path.join(__dirname, "../public/uploads", idAlbum);
  rimraf(albumPath, () => {
    res.redirect("/albums");
  });
};

module.exports = {
  //Désormais nous importerons un ensemble de controller(fonctions)
  //donc autant les passer dans un array
  createAlbumForm,
  createAlbum,
  albums,
  album,
  addImage,
  deleteImage,
  deleteAlbum,
};

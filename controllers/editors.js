const express = require('express');
var router = express.Router()

const ArticlesModel = require('../models/articles.js');
const EditorsModel = require('../models/editors.js');

// Display the editors page
router.get("/", async function(req, res)
{
  let users_results = await EditorsModel.getUsers();
  req.TPL.users = users_results;

  let articles_creds = await ArticlesModel.articleCreds();
  req.TPL.articles_creds = articles_creds
  res.render("editors", req.TPL);
});

// Delete username
router.get("/delete/:id", async function(req, res){

  await EditorsModel.deleteUser(req.params.id);

  res.redirect("/editors")

});

// Delete username
router.get("/deletearticle/:title", async function(req, res){

  await EditorsModel.deleteArticle(req.params.title);

  res.redirect("/editors")

});



module.exports = router;

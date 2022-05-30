const article = require("../controllers/article.controllers.js");

module.exports = app => {
    let router = require("express").Router();
  
    // Create a new Article
    router.post("/", article.create);
  
    // Retrieve all Articles
    router.get("/", article.findAll);
  
    // Retrieve a single Article with id
    router.get("/:id", article.findOne);
  
    // Update a Article with id
    router.put("/:id", article.update);
  
    // Delete a Article with id
    router.delete("/:id", article.delete);
  
  
    app.use("/api/article", router);
  };
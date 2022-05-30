

module.exports = app => {
    let router = require("express").Router();
  
    // Create a new Article
    router.post("/");
  
    // Retrieve all Articles
    router.get("/");
  
    // Retrieve a single Article with id
    router.get("/:id");
  
    // Update a Article with id
    router.put("/:id");
  
    // Delete a Article with id
    router.delete("/:id");
  
  
    app.use("/api/article", router);
  };
  
const articleServices = require("../services/article.services");
const ErrorHandler = require("../libraries/error.handler");
exports.create = async (req, res) => {
    try {
        console.log(req.body);
        if(!req.body.content){
          throw new  ErrorHandler("Content can't be empty",403);
        }
        const article = {
            heading: req.body.heading,
            content: req.body.content
          };
        const id = await articleServices.create(article) 
        console.log(id);
        res.status(200).send(article)
    } catch (err) {
        console.log(err)
        return  res.status( err.httpCode | 403).send({message:err.message})
    }
    // Validate request
    
  };
  
  // Retrieve all Article from the database.
  exports.findAll = async(req, res) => {
      try {
        const articles = await articleServices.fetch()
        res.status(200).send(articles)
      } catch (error) {
        return  res.status( err.httpCode | 403).send({message:err.message})
      }
    
  };
  
  // Find a single Article with an id
  exports.findOne = async (req, res) => {
      try {
        
        if(!req.params.id){
            throw new ErrorHandler("You need pass article id",403);
        }
        const id = req.params.id;
        const article = await articleServices.findById(id)
        res.status(200).send(article) 
      } catch (err) {
        return  res.status( err.httpCode | 403).send({message:err.message})
      }
    
  };
  
  // Update a Article by the id in the request
  exports.update = async (req, res) => {
      try {
       
        if(!req.params.id){
            throw new ErrorHandler("You need pass article id",403);
        }
        const id = req.params.id;
        console.log(id);
        console.log(req.body);
        const article = {
            heading: req.body.heading,
            content: req.body.content
          };
        const art = await articleServices.update(id,article);

        res.status(200).send(article)
      } catch (err) {
        return  res.status( err.httpCode | 403).send({message:err.message})
      }
   
    
  };
  
  // Delete a Article with the specified id in the request
  exports.delete = async (req, res) => {
      try {
        const id = req.params.id;
        console.log(id);
        await articleServices.delete(id);
        res.status(200).send({message:`article ${id} as been deleted successfully`})
      } catch (err) {
        return  res.status( err.httpCode | 403).send({message:err.message})
      }
    
  };
  
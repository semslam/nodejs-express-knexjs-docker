const articleServices = require("../services/article.services");
const {successResponse, filedResponse} = require("../response/response.handler");
const ErrorHandler = require("../libraries/error.handler");

const validateRequest = (body)=>{
  if(!body.content){
    throw new ErrorHandler("Content can't be empty",403);
  }
  if(body.content.length > 10000 || body.heading.length > 255){
    throw new ErrorHandler("The heading must be a max of 250 characters while the content must be a max of 10,000 characters!",403);
  }
}
exports.create = async (req, res) => {
    try {
      validateRequest(req.body,res);
        const article = {
            heading: req.body.heading,
            content: req.body.content
          };
        const {id} = await articleServices.create(article)
        article.id = id; 
        successResponse(res,201,"Article was successfully created!",article);
    } catch (err) {
        filedResponse(res,err.httpCode | 403,err.message);
    }
  
  };
  
  // Retrieve all Article from the database.
  exports.findAll = async(req, res) => {
      try {
        const articles = await articleServices.fetch();
        successResponse(res,200,"Fetch all articles successfully!",articles);
      } catch (err) {
        filedResponse(res,err.httpCode | 403, err.message);
      }
  };
  
  // Find a single Article with an id
  exports.findOne = async (req, res) => {
      try {
        if(!req.params.id){
          throw new ErrorHandler("You need pass article id",403);
        }
        const id = req.params.id;
        const [article] = await articleServices.findById(id)
      
        successResponse(res,200,"Find article by id was successfully!",article); 
      } catch (err) {
        filedResponse(res, err.httpCode | 403,err.message);
      }
    
  };
  
  // Update a Article by the id in the request
  exports.update = async (req, res) => {
      try {
       
        if(!req.params.id){
          throw new ErrorHandler("You need pass article id",403);
        }
        validateRequest(req.body,res);
        const id = req.params.id;
        const article = {
            heading: req.body.heading,
            content: req.body.content
          }; 
        await articleServices.update(id,article);
        article.id = id;
        successResponse(res,200,`Article with id ${id} was updated successfully!`,article); 
      } catch (err) {
        filedResponse(res, err.httpCode | 403,err.message);
      }
   
    
  };
  
  // Delete a Article with the specified id in the request
  exports.delete = async (req, res) => {
      try {
        const id = req.params.id;
        await articleServices.delete(id);
        successResponse(res,200,`Article with id ${id} was deleted successfully!`);
      } catch (err) {
        filedResponse(res, err.httpCode | 403,err.message);
      }
    
  };
  
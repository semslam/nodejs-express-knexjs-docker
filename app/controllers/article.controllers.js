const articleServices = require("../services/article.services");
const ErrorHandler = require("../libraries/error.handler");
const {successResponse, filedResponse} = require("../response/response.handler");

const validateRequest = (body,res)=>{
  if(!body.content){
    filedResponse(res,403,"Content can't be empty");
  }
  console.log(body.heading.length)
  if(body.content.length > 10000 ||body.heading.length > 255){
    filedResponse(res,403,"The heading must be a max of 250 characters while the content must be a max of 10,000 characters!");
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
        console.log(id);
        successResponse(res,201,"Article was successfully created!",article);
    } catch (err) {
        filedResponse(res, err.httpCode | 403,err.message);
    }
    // Validate request
    
  };
  
  // Retrieve all Article from the database.
  exports.findAll = async(req, res) => {
      try {
        const articles = await articleServices.fetch();
        successResponse(res,200,"Fetch all articles successfully!",articles);
      } catch (err) {
        filedResponse(res, err.httpCode | 403,err.message);
      }
    
  };
  
  // Find a single Article with an id
  exports.findOne = async (req, res) => {
      try {
        if(!req.params.id){
          filedResponse(res,403,"You need pass article id");
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
          filedResponse(res,403,"You need pass article id");
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
        console.log(id);
        await articleServices.delete(id);
        successResponse(res,200,`Article with id ${id} was deleted successfully!`);
      } catch (err) {
        filedResponse(res, err.httpCode | 403,err.message);
      }
    
  };
  
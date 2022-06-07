
const STATUS_FAILED = "Failed";
const STATUS_SUCCESS = "Successful";

const isEmpty = (value) => {
    if (value === undefined || !value) {
      return true;
    }
    return value === null;
  };

const successResponse = (res,HTTP_SUCCESS,successMessage, data = null) =>{
    let result = {
        code:HTTP_SUCCESS,
        status:STATUS_SUCCESS,
        message:successMessage
      }
      if(!isEmpty(data))  result.data = data;
      if(res.writableEnded)return;
      console.log(result);
   return res.status(HTTP_SUCCESS).send(result);
}

const filedResponse = (res,HTTP_ERROR,errorMessage) =>{
   let result = {
        code:HTTP_ERROR,
        status:STATUS_FAILED,
        message:errorMessage
      }
      console.log(result);
      if(res.writableEnded)return;
   return res.status(HTTP_ERROR).send(result);    
}

module.exports = {
    successResponse,
    filedResponse
}
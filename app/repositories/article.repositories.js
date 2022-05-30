
const db = require('../db/db');
const ErrorHandler = require("../libraries/error.handler");

class ArticleRepo {

    async createArticle(article) {
        try {
            const [id] = await db('article')
            .insert(article)
            .returning('id');
            return id;
        } catch (err) {
            throw new  ErrorHandler(err.message | "Can't create article!",403) 
        }
       
    }

    async findByIdArticle(id) {
        try {
            return await db.select()
            .from('article')
            .where('id',id)
        } catch (err) {
            throw new ErrorHandler(err.message | "Can't find article by id!",403)
        }
    
    }

    async fetchArticles() {
        try {
            return await db.select()
        .from('article')
        } catch (error) {
            throw new  ErrorHandler(err.message | "Can't find articles!",403);  
        }
        
    }

    async updateArticle(id,update) {
        try {
            const isUpdate = await db('article').where('id', id)
            .update(update);
            if(!isUpdate)ErrorHandler("No article was update!",403);
            return isUpdate;
        } catch (err) {
            throw new  ErrorHandler(err.message | "Can't update articles!",403); 
        }
        
    }

    async deleteArticle(id) {
        try {
            const isDelete = await db('article').where('id',id)
            .del();
            if(!isDelete) ErrorHandler("No Article was delete!",403);
            return isDelete;
        } catch (err) {
            throw new ErrorHandler(err.message | "Can't delete articles!",403); 
        }
        
    }
}

module.exports = new ArticleRepo();
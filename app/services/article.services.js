const articleRepo = require("../repositories/article.repositories")

class ArticleService{

    async create(article){
        
        return await articleRepo.createArticle({
            heading:article.heading,
            content:article.content
        });
    }

    async findById(id) {
       return await articleRepo.findByIdArticle(id)
    }

    async fetch() {
        return await articleRepo.fetchArticles()
    }

    async update(id,article) {
        return await articleRepo.updateArticle(id,{
            heading:article.heading,
            content:article.content,
            updated_at: new Date()
        })
    }

    async delete(id) {
        return await articleRepo.deleteArticle(id)
    }
}

module.exports = new ArticleService();
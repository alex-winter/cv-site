import { Article } from "client/Model/Article"

export class ArticleRepository
{
    public async getAll(): Promise<Article[]>
    {
        const response = await fetch('/articles')
        const data = await response.json()

        return data.data;
    }
}
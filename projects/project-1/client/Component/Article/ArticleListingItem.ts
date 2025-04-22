import { Article } from "client/Model/Article";
import { Component } from "client/Service/Component";

export class ArticleListingItem extends Component
{
    public template() {
        const article = this.props.article as Article

        return /*html*/`
            <div>
                <h3>${article.title}</h3>
                <p>${article.createdAt}</p>
                <p>${article.slug}</p>   
            </div>
        `
    }
}
import './index.scss'
import { ArticleRepository } from './Service/ArticleRepository'

document.addEventListener('DOMContentLoaded', async () => {
    
    const articles = await new ArticleRepository().getAll()

    const pre = document.createElement('pre')

    pre.innerText = JSON.stringify(articles, null, 2)

    document.body.append(pre)
})
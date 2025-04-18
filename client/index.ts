import './index.scss'

document.addEventListener('DOMContentLoaded', async () => {
    
    const response = await fetch('/articles')
    const data = await response.json()

    const p = document.createElement('p')

    p.innerText = JSON.stringify(data)

    document.body.append(p)

})
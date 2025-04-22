document.addEventListener('DOMContentLoaded', () => {

    const listing = document.querySelector('.project-listing')

    const projects = [
        {
            name: 'Project One',
            dir: 'project-1',
        },
    ]
    
    function createProjectElement(project)
    {
        const element = document.createElement('div')

        element.classList.add('project-item')

        element.innerText = project.name

        return element
    }

    const projectElements = projects.map(createProjectElement)

    listing.append(...projectElements)
})
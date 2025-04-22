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

        element.addEventListener('click', () => {
            fetch('/launch/' + project.dir)
                .then(response => {
                    const reader = response.body.getReader()
                    const decoder = new TextDecoder()
                    const output = document.getElementById('output')
                
                    function read() {
                        reader.read().then(({ done, value }) => {
                            if (done) return
                            output.textContent += decoder.decode(value, { stream: true })
                            read()
                        })
                    }
                
                    read()
                })
        })

        return element
    }

    const projectElements = projects.map(createProjectElement)

    listing.append(...projectElements)
})
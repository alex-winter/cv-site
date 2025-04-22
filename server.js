const express = require('express')
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

const PORT = 3000

const app = express()

const projectsDir = path.join(__dirname, 'projects')

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (_, response) => {
    response.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.post('/launch/:project', (req, res) => {
    const project = req.params.project
    const composePath = path.join(projectsDir, project, 'docker-compose.yml')

    if (!fs.existsSync(composePath)) {
        return res.status(404).send('Project not found')
    }

    exec(`docker compose -f ${composePath} up -d`, (err, stdout, stderr) => {
        if (err) {
            console.error(stderr)
            return res.status(500).send('Failed to launch')
        }

        res.send(`Launched ${project}`)
    })
})

app.listen(PORT, () => console.log(`🚀 Dev launcher at http://localhost:${PORT}`))
const express = require('express')
const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')

const PORT = 3000

const app = express()

const projectsDir = path.join(__dirname, 'projects')

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (_, response) => {
    response.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/launch/:project', (req, res) => {
    const project = req.params.project
    const startPath = path.join(projectsDir, project, 'start.sh')

    if (!fs.existsSync(startPath)) {
        return res.status(404).send('Project not found')
    }

    res.setHeader('Content-Type', 'text/plain')

    const child = spawn('bash', [startPath])

    child.stdout.on('data', (data) => {
        res.write(data)
    })

    child.stderr.on('data', (data) => {
        res.write(data) // or res.write(`[stderr] ${data}`)
    })

    child.on('close', (code) => {
        res.write(`\nProcess exited with code ${code}`)
        res.end()
    })

    // Handle client disconnect
    req.on('close', () => {
        child.kill()
    })
})

app.listen(PORT, () => console.log(`🚀 Dev launcher at http://localhost:${PORT}`))
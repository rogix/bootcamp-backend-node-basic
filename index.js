const express = require("express");

const app = express();

// Help me understand json
app.use(express.json());

const projects = [];

// Hey, I am a middleware, I can get accessed anywhere
function checkIfProjectExists(req, res, next) {
    // ID is my unique name, so check if I am already there
    const { id } = req.params;
    const project = projects.find(p => p.id == id)

    if (!project) {
        return res.status(400).json({error: 'Ops! Project not found'})
    }

    return next();
}

function logRequests(req, res, next) {

    console.count('Number of Requisitions');

    return next();
}

app.use(logRequests);

// List all projects 
app.get('/projects', (req, res) => {
    return res.json(projects);
})

// Create new project 
app.post('/projects', (req, res) => {
    // In order to find me later I will need some unique stuff, like ID?
    const { id, title  } = req.body;

    const project = {
        id,
        title,
        tasks: []
    }

    // See that array up there? Cool, there is where I go.
    projects.push(project);

    return res.json(project);
})

// Update project based on ID
app.put('/projects/:id', checkIfProjectExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(p => p.id == id);

    project.title = title;

    return res.json(project);
})

// Delete project based on ID
app.delete('/projects/:id', (req, res) => {
    const { id } = req.params;

    const projectIndex = projects.findIndex(p => p.id == id);

    projects.splice(projectIndex, 1);

    return res.send();
})

// Add new task
app.post('/projects/:id/tasks', checkIfProjectExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(p => p.id == id);

    project.tasks.push(title);

    return res.json(project); 
})

app.listen(3000);
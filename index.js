const express = require("express");

const server = express();

// Help me understand json
server.use(express.json());

const users = ['Maria', 'Pedro',  'Henrique'];

// Hey, I am a middleware, I can get accessed everywhere
function checkIfUserExists(req, res, next) {
    if (!req.body.name) {
        return res.status(400).json({error: 'User name is required'})
    }

    return next();
}

function checkUserInArray(req, res, next) {
    const user = users[req.params.index]

    if (!user) {
        return res.status(400).json({error: 'User does not exists'})
    }

    req.user = user;

    return next();
}

// List all users
server.get('/users', (req, res) => {
    return res.json(users);
})

// List users by id
server.get('/users/:index', checkUserInArray, (req, res) => {
    return res.json(req.user);
})

// Create new user
server.post('/users', checkIfUserExists, (req, res) => {
    const { name } = req.body;

    users.push(name);

    return res.json(users);
})

// Update user based on ID
server.put('/users/:index', checkIfUserExists, checkUserInArray, (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    users[index] = name;

    return res.json(users);
})

// Delete users based on ID
server.delete('/users/:index', checkUserInArray, (req, res) => {
    const { index } = req.params;

    users.splice(index, 1);

    return res.json(users);
})

server.listen(3000);
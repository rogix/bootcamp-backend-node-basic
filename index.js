const express = require("express");

const server = express();

// Help me understand json
server.use(express.json());

const users = ['Maria', 'Pedro',  'Henrique'];

// List all users
server.get('/users', (req, res) => {
    return res.json(users);
})

// List users by id
server.get('/users/:index', (req, res) => {
    const {index} = req.params;
    
    return res.json(users[index]);
})

// Create new user
server.post('/users', (req, res) => {
    const { name } = req.body;

    users.push(name);

    return res.json(users);
})

// Update user based on ID
server.put('/users/:index', (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    users[index] = name;

    return res.json(users);
})

// Delete users based on ID
server.delete('/users/:index', (req, res) => {
    const { index } = req.params;

    users.splice(index, 1);

    return res.json(users);
})
server.listen(3000);
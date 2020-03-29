const express = require("express");

const server = express();

const users = ['Maria', 'Pedro',  'Henrique'];

server.get('/users/:index', (req, res) => {
    const {index} = req.params;
    
    return res.json(users[index]);
})

server.listen(3000);
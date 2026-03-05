const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Mocking 'The Chamber' route
app.get('/chamber', (req, res) => {
    res.render('theChamber', { user: "Otto" });
});

// Socket.io Logic (Real-time updates)
io.on('connection', (socket) => {
    console.log('User entered The Chamber');
    socket.on('cast_vote', (data) => {
        // Broadcast the vote to everyone instantly
        io.emit('update_bars', data);
    });
});

server.listen(3000, () => {
    console.log('TruthBound running at http://localhost:3000');
});
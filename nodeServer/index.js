const io = require("socket.io")(8000);
const users = {};

// Handle new connections
io.on('connection', socket => {

    // When a new user joins
    socket.on('new-user-joined', name => {
        console.log("New user", name);
        users[socket.id] = name; // Store the user's name with their socket ID
        socket.broadcast.emit('user-joined', name); // Notify other users
    });

    // When a message is sent
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] }); // Broadcast the message
    });

    // When a user disconnects
    socket.on('disconnect', () => {
        socket.broadcast.emit('left', users[socket.id]); // Notify other users
        delete users[socket.id]; // Remove the user from the users object
    });

});
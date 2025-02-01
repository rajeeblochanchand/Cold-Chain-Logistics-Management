// server.js (ES Modules)
import { Server } from 'socket.io';

// Create a Socket.IO server
const io = new Server(3000, {
  cors: {
    origin: '*', // Allow all origins
  },
});

// Handle client connections
io.on('connection', (socket) => {
  console.log('Client connected');

  // Simulate real-time location updates
  setInterval(() => {
    const newPosition = {
      lat: 51.505 + Math.random() * 0.01, // Random latitude near London
      lng: -0.09 + Math.random() * 0.01, // Random longitude near London
    };
    socket.emit('locationUpdate', newPosition); // Send the new position to the client
  }, 5000); // Update every 5 seconds

  // Handle client disconnections
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

console.log('Server is running on port 3000');
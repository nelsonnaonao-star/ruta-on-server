const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
    console.log('✅ Motorizado conectado:', socket.id);
    
    socket.on('nuevo-servicio', (data) => {
        console.log('🚀 ¡NUEVA CARRERA DETECTADA!', data);
        io.emit('notificar-motorizado', data);
    });
});

server.listen(process.env.PORT || 4000, '0.0.0.0', () => {
    console.log('📡 Antena Ruta ON encendida en puerto', process.env.PORT || 4000);
});
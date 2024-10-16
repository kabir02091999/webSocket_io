import express from 'express';
import http from 'http';
import {Server as socketServer} from 'socket.io';


const app = express();
const server = http.createServer(app);
const io = new socketServer(server);

io.on('connection', socket => {
    console.log('New connection');
    socket.on('message', (data) => {
        console.log(data + "   backen cliente");
        socket.broadcast.emit('message', {

            data,
            from : socket.id.slice(5)

        });
    });
    
    socket.on('disconnect', () => {
        console.log('disconnected');
    });
});

server.listen(3000, () => { console.log('Server is running on http://localhost:3000') });

/* se ejecuta eñ banck en lel local con npm run dev
    y el from tiene que entra carpeta frontend y ejecuta el comando npm run dev

*/
const http = require('http')
const express = require('express')
const path = require('path')
const socketio = require('socket.io')


const app = express()
const server = http.createServer(app) //io requires raw http
const io = socketio(server)

const publicDirectoryPath = path.join(__dirname, './public')
app.use(express.static(publicDirectoryPath))

let peopleCount = 0;
let peopleLimit = 30;
let peopleEnterable = 0;
io.on('connection', socket => {
    //socket.broadcast.emit("showMessage", { name: 'Anonymous', message: 'A NEW USER HAS JOINED' });
    //socket.broadcast.emit("peopleCount", { count: '+', peopleCount : peopleCount, peopleLimit : peopleLimit, warning : false});

    socket.on('sendMessage', message => io.emit('showMessage', message))

    socket.on('peopleCount', (data) => {
        if(data.count == '+'){
            peopleCount++;
        }else if (data.count == '-'){
            peopleCount--;
        }
        data.peopleCount = peopleCount;
        if(data.peopleLimit != undefined){
            peopleLimit = data.peopleLimit;
            data.peopleLimit = peopleLimit;
        }else{
            data.peopleLimit = peopleLimit;
        }

        console.log(data.peopleLimit)

        if(peopleCount >= peopleLimit){
            data.warning = true;
            data.peopleEnterable = 0;
        }else{
            data.peopleEnterable = (peopleLimit - peopleCount);
            console.log("data.peopleEnterable = " + data.peopleEnterable);
            data.warning = false;
        }

        io.emit("peopleCount", data);
    });
})

const port = process.env.PORT || 3000
server.listen(port, () => console.log('Server is running...'))
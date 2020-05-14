const socket = io();

/*var plus = document.getElementById('plus');
var minus = document.getElementById('minus');
var kapasite = document.getElementById('kapasite');
var kapasiteBtn = document.getElementById('kapasiteBtn');
*/

$('#plus').on('click', function(){
    socket.emit('peopleCount', {
        count: '+'
    });
});

$('#minus').on('click', function(){
    socket.emit('peopleCount', {
        count: '-'
    });
});

$('#kapasiteBtn').on('click', function(){
    console.log($('#kapasite').val());
    socket.emit('peopleCount', {
        peopleLimit: $('#kapasite').val()
    });
});

socket.emit('peopleCount', {
});

socket.on('peopleCount', message => {
    $('#kapasite').val(message.peopleLimit);
});
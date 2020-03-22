const socket = require('socket.io');

function Offert(server) {
  const io = socket(server);

  const offert = io.of('/user-offert');

  offert.on('connection', (socket) => {
    socket.on('offert', function (data) {
      console.log(data);
      return data
    });
  })
}

module.exports = Offert;
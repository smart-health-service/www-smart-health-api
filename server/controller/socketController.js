const socketConfig = (socket, io) => {
  socket.emit('me', socket.id);

  socket.on('callUser', ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit('callUser', {
      signal: signalData,
      from,
      name,
    });
  });

  socket.on('updateMyMedia', ({ type, currentMediaStatus }) => {
    console.log('updateMyMedia');
    socket.broadcast.emit('updateUserMedia', { type, currentMediaStatus });
  });

  socket.on('msgUser', ({ name, to, msg, sender }) => {
    io.to(to).emit('msgRcv', { name, msg, sender });
  });

  socket.on('answerCall', (data) => {
    socket.broadcast.emit('updateUserMedia', {
      type: data.type,
      currentMediaStatus: data.myMediaStatus,
    });
    io.to(data.to).emit('callAccepted', data);
  });
  socket.on('endCall', ({ id }) => {
    io.to(id).emit('endCall');
  });
};
module.exports = socketConfig;

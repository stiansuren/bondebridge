const app = require("express")();
const http = require("http").Server(app);
const io: any = require("socket.io")(http);

const port = process.env.PORT || 5000;

type Player = {
  id: string;
  name: string;
};

let players: Player[] = [];

io.on("connect", (socket: any) => {
  const socketId = socket.id;
  console.log(socketId);

  socket.on("player", (player: Player) => {
    players = [...players, player];
    console.log(players);
    io.emit("setPlayers", players);
  });

  socket.on("disconnect", () => {
    players = players.filter((p) => p.id !== socketId);
    console.log(players);
    io.emit("setPlayers", players);
  });
});

http.listen(port, () => {
  console.log(`Started server on port ${port}`);
});

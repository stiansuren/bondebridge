const express = require("express");
const app = express();
const http = require("http").Server(app);
const path = require("path");
const socketIO: any = require("socket.io")(http);

const port = process.env.PORT || 5000;

type Player = {
  id: string;
  name: string;
};

let players: Player[] = [];

socketIO.on("connect", (socket: any) => {
  const socketId = socket.id;
  console.log(socketId);

  socket.on("player", (player: Player) => {
    players = [...players, player];
    console.log(players);
    socketIO.emit("setPlayers", players);
  });

  socket.on("disconnect", () => {
    players = players.filter((p) => p.id !== socketId);
    console.log(players);
    socketIO.emit("setPlayers", players);
  });
});

http.listen(port, () => {
  console.log(`Started server on port ${port}`);
});

// Serve any static files
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Handle React routing, return all requests to React app
app.get("*", function (req: any, res: any) {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

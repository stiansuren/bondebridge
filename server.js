const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

let port = 3000;

let players = [];

io.on("connect", (socket) => {
  const socketId = socket.id;

  socket.on("player", (player) => {
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

nextApp.prepare().then(() => {
  app.get("*", (req, res) => {
    return nextHandler(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});

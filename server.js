const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

let port = 3000;

let players = [];

const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const suits = ["diamonds", "clubs", "hearts", "spades"];

const shuffleDeck = () => 0.5 - Math.random();

io.on("connect", (socket) => {
  socket.on("player", (player) => {
    players = [...players, player];
    console.log(players);
    io.emit("setPlayers", players);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
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

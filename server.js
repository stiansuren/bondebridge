const { createServer } = require("http");
const { parse } = require("url");
// const io = require("socket.io")(server);
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

let port = 3000;

// let players = [];

// io.on("connect", (socket) => {
//   const socketId = socket.id;

//   socket.on("player", (player) => {
//     players = [...players, player];
//     console.log(players);
//     io.emit("setPlayers", players);
//   });

//   socket.on("disconnect", () => {
//     players = players.filter((p) => p.id !== socketId);
//     console.log(players);
//     io.emit("setPlayers", players);
//   });
// });

nextApp.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true);
    nextHandler(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});

import { useEffect, useState } from "react";
import io from "socket.io-client";
import styled from "styled-components";

const socket = io("http://localhost:3000");

const H1 = styled.h1`
  font-size: 31px;
`;

type GameProps = {
  name: string;
};

type Player = {
  name: string;
  id: number;
};

export default function Game({ name }: GameProps) {
  const player: Player = {
    name,
    id: socket.id,
  };
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.emit("player", player);

    socket.on("setPlayers", (data) => {
      console.log(data);
      setPlayers(data);
    });
  }, []);

  useEffect(() => {}, [players]);

  return (
    <main>
      <H1>You</H1>
      <p>{player.name}</p>
      <H1>All players</H1>
      {players.map((player) => (
        <p key={player.name}>{player.name}</p>
      ))}
    </main>
  );
}

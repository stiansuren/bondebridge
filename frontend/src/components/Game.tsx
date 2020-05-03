import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import styled from "styled-components";

const socket = io(window.location.href);

const H1 = styled.h1`
  font-size: 31px;
`;

type GameProps = {
  name: string;
};

type Player = {
  name: string;
  id: string;
};

export default function Game({ name }: GameProps) {
  const player: Player = {
    name,
    id: socket.id,
  };
  const [players, setPlayers] = useState([player]);

  useEffect(() => {
    socket.emit("player", player);

    socket.on("setPlayers", (data: Player[]) => {
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
      {players.map((player: Player) => (
        <p key={player.name}>{player.name}</p>
      ))}
    </main>
  );
}

import React, { useState } from "react";
import Game from "./components/Game";

export default function App() {
  const [name, setName] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoggedIn(true);
  }

  return (
    <div className="container">
      {loggedIn ? (
        <Game name={name} />
      ) : (
        <form onSubmit={(e: React.FormEvent) => handleSubmit(e)}>
          <label>
            Navn
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </label>
          <button>Bekreft</button>
        </form>
      )}
    </div>
  );
}

import Head from "next/head";
import { useState } from "react";

import Game from "../components/Game";

export default function App() {
  const [name, setName] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoggedIn(true);
  }

  return (
    <div className="container">
      <Head>
        <title>Bondebridge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loggedIn ? (
        <Game name={name} />
      ) : (
        <form onSubmit={(e) => handleSubmit(e)}>
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

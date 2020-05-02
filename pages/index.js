import Head from "next/head";
import styled from "styled-components";

const H1 = styled.h1`
  font-size: 31px;
`;

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Bondebridge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <H1>Kort</H1>
      </main>
    </div>
  );
}

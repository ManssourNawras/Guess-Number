// lib
import Image from "next/image";
import Head from 'next/head';

// custom
import GameControls from "@/components/GameControls";
import GameBoard from "@/components/GameBoard";
import Ranking from "@/components/Ranking";
import Chat from "@/components/Chat";


export default function Home() {
  return (
    <div className="flex flex-col space-y-5">
      <Head>
        <title>Guess Number Game</title>
      </Head>
      <div className="max-w-max-custom mx-auto w-full gap-4 py-4">
          {/* row */}
          <div className="grid grid-cols-12 md:gap-10 px-2 py-5 w-full">
            <GameControls />
            <GameBoard />
          </div>
          {/* row */}
          <div className="grid grid-cols-12 md:gap-10 px-2 py-5 w-full">
            <Ranking />
            <Chat />
          </div>
      </div>
    </div>
  );
}

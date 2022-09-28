import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';


import './styles/main.css';
import logoImg from './assets/logo-nlw-esports.svg';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { CreateAdModal } from './components/CreateAdModal';


interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}


function App() {

  const [games, setGames] = useState<Game[]>([])

  // faz chamada pra back-end
  useEffect(() => {
    axios('http://192.168.1.112:3333/games').then(response => {
      setGames(response.data)
    })
  }, [])

  return (
    <div className="flex flex-col max-w-[1800px] mx-auto justify-center items-center my-20">
      <img src={logoImg} alt="" />
      <h1 className="text-[64px] text-white font-black mt-20">
        Seu<span className="text-transparent bg-gradient-to-r  from-[#9572FC]  via-[#43E7AD]  to-[#E1D55D] bg-clip-text"> duo </span>esta aqui.
      </h1>


      <div className="grid grid-cols-9 gap-6 mt-16">
        {games.map(game => {
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
            />
          )
        })}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App

import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Check, CodesandboxLogo, GameController, MagnifyingGlassPlus } from 'phosphor-react';
import { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';

import { Input } from './Form/input';




interface Game {
  id: string;
  title: string;
}


export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)


  useEffect(() => {
    axios('http://192.168.1.112:3333/games').then(response => {
      setGames(response.data)
    })
  }, [])

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)
    // validando, para não enviar o form vazio
    if (!data.name) {
      return;
    }


    try {
      await axios.post(`http://192.168.1.112:3333/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel
      })
      alert('Anúncio criado com sucesso')
    } catch (err) {
      console.log(err)
      alert('Erro ao criar anúncio')
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="py-8 px-10 bg-[#2A2634] text-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/50">
        <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>

        <form onSubmit={handleCreateAd} className="flex flex-col gap-4 mt-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">Qual o game? </label>
            <select
              id="game"
              name="game"
              className="bg-zinc-900 py-3 px-4 rounded-lg text-sm  placeholder:text-zinc-500 appearance-none"
              defaultValue=""
            >

              <option disabled value="">Selecione o game que deseja jogar </option>
              {games.map(game => {
                return (
                  <option key={game.id} value={game.id}>{game.title}</option>
                )
              })}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname) </label>
            <Input
              id="name"
              name="name"
              placeholder="Como te chamam dentro do game?" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga há quantos anos? </label>
              <Input
                id="yearsPlaying"
                name="yearsPlaying"
                type="number"
                placeholder="Tudo bem ser ZERO" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual seu Discord?</label>
              <Input
                id="discord"
                name="discord"
                type="text"
                placeholder="Usuario#0000" />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>
        
              <ToggleGroup.Root
                value={weekDays}
                onValueChange={setWeekDays}
                type="multiple"
                className="grid grid-cols-4 gap-2">
                <ToggleGroup.Item
                  value="0"
                  className={`w-8 h-8 rounded-sm ${weekDays.includes('0') ? 'bg-violet-500' : ' bg-zinc-900'}`}
                  title="Domingo">D</ToggleGroup.Item>
                <ToggleGroup.Item
                  value="1"
                  className={`w-8 h-8 rounded-sm ${weekDays.includes('1') ? 'bg-violet-500' : ' bg-zinc-900'}`}
                  title="Segunda">S</ToggleGroup.Item>
                <ToggleGroup.Item
                  value="2"
                  className={`w-8 h-8 rounded-sm ${weekDays.includes('2') ? 'bg-violet-500' : ' bg-zinc-900'}`}
                  title="Terça">T</ToggleGroup.Item>
                <ToggleGroup.Item
                  value="3"
                  className={`w-8 h-8 rounded-sm ${weekDays.includes('3') ? 'bg-violet-500' : ' bg-zinc-900'}`}
                  title="Quarta">Q</ToggleGroup.Item>
                <ToggleGroup.Item
                  value="4"
                  className={`w-8 h-8 rounded-sm ${weekDays.includes('4') ? 'bg-violet-500' : ' bg-zinc-900'}`}
                  title="Quinta">Q</ToggleGroup.Item>
                <ToggleGroup.Item
                  value="5"
                  className={`w-8 h-8 rounded-sm ${weekDays.includes('5') ? 'bg-violet-500' : ' bg-zinc-900'}`}
                  title="Sexta">S</ToggleGroup.Item>
                <ToggleGroup.Item
                  value="6"
                  className={`w-8 h-8 rounded-sm ${weekDays.includes('6') ? 'bg-violet-500' : ' bg-zinc-900'}`}
                  title="Sabádo">S</ToggleGroup.Item>
              </ToggleGroup.Root>


            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="discord">Qual horario do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input id="hourStart" name="hourStart" type="time" placeholder="De" />
                <Input id="hourEnd" name="hourEnd" type="time" placeholder="Até" />
              </div>
            </div>
          </div>
          <label className="flex mt-2 gap-4 text-sm items-center">
            <Checkbox.Root
              checked={useVoiceChannel}
              onCheckedChange={(checked) => {
                if (checked === true) {
                  setUseVoiceChannel(true)
                } else {
                  setUseVoiceChannel(false)
                }
              }} className="w-6 h-6 p-1 rounded bg-zinc-900">

              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-300" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>
          <footer className="flex mt-4 gap-4 justify-end">
            <Dialog.Close className="">
              <button className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-400">Cancelar</button>
            </Dialog.Close>
            <button className="flex gap-3 px-5 h-12 bg-violet-500  rounded-md font-semibold hover:bg-violet-600 items-center" type="submit">
              <GameController className="w-6 h-6" />
              Encontra duo
            </button>

          </footer>
        </form>
      </Dialog.Content>


    </Dialog.Portal>
  )
}
import { MagnifyingGlassPlus } from "phosphor-react"
import * as Dialog from '@radix-ui/react-dialog';

export function CreateAdBanner() {
  return (

    <div className="pt-1  bg-gradient-to-r  self-stretch from-[#9572FC]  via-[#43E7AD]  to-[#E1D55D] rounded-lg mt-6 overflow-hidden">
        <div className="flex bg-[#2A2634] px-8 py-6 justify-between items-center">
          <div>
            <strong className="text-[24px] text-white font-black block">Não encontrou seu duo?</strong>
            <span className="text-[16px] text-zinc-400 block">Publique um anúncio para encontrar novos player!</span>
          </div>
          <Dialog.Trigger className="flex px-6 py-3 bg-violet-500 hover:bg-violet-800 hover:text-white rounded-lg items-center gap-3">
            <MagnifyingGlassPlus size={24} />
            Publicar Anúncio
            </Dialog.Trigger>
        </div>
      </div>
      
 )
}
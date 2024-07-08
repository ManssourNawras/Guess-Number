import React, { useEffect, useState } from 'react';

// lib

// custom
import { PlayerNameProps } from '@/types/PlayerNameProps';
import { classNames } from '@/utils/helper';
import { useMainContext } from '@/contexts/main_context';

const PlayerName: React.FC<PlayerNameProps> = (props) => {
  const {setPlayer} = useMainContext()
  const [playerName , setPlayerName] = useState<string>('')
  const [playerNameSubmited , setPlayerNameSubmited] = useState<boolean>(false)
  const [playerNameValid , setPlayerNameValid] = useState<boolean>(false)


  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
    setPlayerNameSubmited(false)
  };

  const handleSubmit = () => {
    setPlayerNameSubmited(true)
    if(playerNameValid){
      setPlayerNameSubmited(false)
      setPlayer({
        name : playerName,
        points : 100,
        lastRoundPoint : 100
      })
    }
  }

  useEffect(()=>{
    setPlayerNameValid(playerName.length > 0 ?? false)
  },[playerName])

  return (
    <div className='md:col-span-4 col-span-12 border border-gray-700 bg-gray-800 rounded-md flex flex-col space-y-10 items-center justify-center w-full md:py-0 pt-10'>
      <h1 className='text-3xl text-clr-main-gray-2'>
        Welcome
      </h1>
      <div className='flex flex-col space-y-2 items-center py-10 w-full'>
        <label htmlFor="name" className='text-sm font-medium text-clr-main-gray-1'>
          Please Insert Your Name
        </label>
        <div className='flex flex-col w-[90%] mx-auto py-2'>
          <input
            type="text"
            id='name'
            value={playerName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInput(e)}
            className={classNames(
              'py-3 px-2 rounded-md bg-gray-950 border outline-none',
              (playerNameSubmited && !playerNameValid) ? 'border-red-600' : 'border-gray-700'
            )}
          />
          {/* error msg */}
          {
            (playerNameSubmited && !playerNameValid) &&
            <span className='text-xs text-red-600'>* Required</span>
          }
          </div>
          <button
            disabled={!playerNameValid}
            onClick={handleSubmit}
            className={classNames(
              'w-[90%] mx-auto mt-2 text-white text-lg font-medium capitalize  rounded-md py-2 transition-all ease-in-out duration-100',
              playerNameValid ? 'bg-pink-700 bg-gradient-to-r from-pink-700 to-orange-500 hover:shadow hover:shadow-pink-700' : 'bg-gray-500 hover:bg-gray-400'
            )}
          >
            Accept
          </button>
      </div>
    </div>
  );
};

export default PlayerName;
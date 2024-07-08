import React, { useEffect, useState } from 'react';

// lib
import { InputNumber  , Button} from 'antd';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

// custom
import { PlayerInputsProps} from '@/types/PlayerInputsProps';
import { useMainContext } from '@/contexts/main_context';
import { addOrUpdateItemPlayersRound, classNames, generateAutoPlayers, getRandomMultiplierStep, getRandomNumber } from '@/utils/helper';


const PlayerInputs: React.FC<PlayerInputsProps> = (props) => {
  const {setRound , round , setPlayer , player} = useMainContext()
  const [myPoints , setMyPoints] = useState<string | null>('100');
  const [myPointsError , setMyPointsError] = useState<boolean>(false);
  const [myMultiplier , setMyMultiplier] = useState<string | null>('2.25');

  const handleInputPoints  = (value: string | null , type : string) => {
    setMyPointsError(false)
    if(type === 'base')
      setMyPoints(value);
    if(type === 'up'){
      const currentVAl = value ? parseInt(value) : 0
      const tempPoints = (currentVAl + 25 )
      setMyPoints(tempPoints+'');
    }
    if(type === 'down'){
      const currentVAl = value ? parseInt(value) : 0
      const tempPoints = currentVAl === 0 ? 0 : (currentVAl - 25 )
      setMyPoints(tempPoints+'');
    }
  }

  const handleInputMultiplier = (value: string | null , type : string) =>
  {
    if(type === 'base')
      setMyMultiplier(value);
    if(type === 'up'){
      const currentVAl = value ? parseFloat(value) : 0
      const tempPoints = (currentVAl + 0.25 )
      setMyMultiplier(tempPoints+'');
    }
    if(type === 'down'){
      const currentVAl = value ? parseFloat(value) : 0
      const tempPoints = currentVAl === 0 ? 0 : (currentVAl - 0.25 )
      setMyMultiplier(tempPoints+'');
    }
  }

  useEffect( () => {
    const you = {
      name: 'you',
      points: parseFloat(myPoints ?? '0'),
      multiplier : parseFloat(myMultiplier ?? '0'),
    }

    setRound({...round , players : addOrUpdateItemPlayersRound(round.players , you)})
  } , [myPoints,myMultiplier])

  const handleSubmit = () => {
    const you = {
        name: 'you',
        points: parseFloat(myPoints ?? '100'),
        multiplier : parseFloat(myMultiplier ?? '2.25'),
      }
    if((you.points !== 0)  && you.points <= player.points){
        const autoPlayes = generateAutoPlayers(4);
        setRound({
          ...round ,
          isRoundStart : true,
          roundNumber : round.roundNumber + 1,
          guessedNumber : getRandomNumber(),
          multiplier : 0 ,
          isRoundFinish : false,
          players : [you , ...autoPlayes],
          chart : {
            xdata: [],
            ydata: []
          }
        })

        setPlayer({...player , lastRoundPoint : you.points })
    }else{
      setMyPointsError(true)
    }
  }


  // console.log('round' , round)


  return (
    <div className='flex flex-col space-y-2 w-full'>
      {/* inputs */}
      <div className='flex S-1000:flex-row md:flex-col S-430:flex-row flex-col w-full'>
        {/* points */}
        <div className='flex flex-1 m-1 flex-col space-y-1 items-center py-1 px-4 rounded-md border border-gray-700 bg-gray-800 bg-gradient-to-r from-gray-950 to-gray-800'>
          {/* title */}
          <h3 className='capitalize md:text-xs text-base font-medium text-clr-main-gray-2'>
            points
          </h3>
          {/* num */}
          <div className='flex flex-row items-center space-x-2 w-full'>
            <button
              onClick={()=> handleInputPoints(myPoints , 'down')}
              className='rounded-md border border-gray-500 hover:bg-clr-main-gray-6'>
              <FaCaretDown className='w-5 h-5' />
            </button>
            <InputNumber<string>
                className={classNames(
                  'outline-none text-white bg-clr-main-black-1 rounded-lg py-0 px-2 w-full border hover:bg-clr-main-black-1 focus:bg-clr-main-black-1 hover:outline-none',
                  myPointsError ? 'border-red-500' : 'border-gray-700'
                )}
                defaultValue={''}
                min={'0'}
                step={'25'}
                // max={1000}
                onChange={(value) => handleInputPoints(value , 'base')}
                value={myPoints}
            />
            <button
              onClick={()=> handleInputPoints(myPoints , 'up')}
              className='rounded-md border border-gray-500 hover:bg-clr-main-gray-6'>
              <FaCaretUp className='w-5 h-5' />
            </button>
          </div>
        </div>
        {/* multiplier */}
        <div className='flex flex-1 m-1 flex-col space-y-1 items-center py-1 px-4 rounded-md border border-gray-700 bg-gray-800 bg-gradient-to-r from-gray-950 to-gray-800'>
          {/* title */}
          <h3 className='capitalize md:text-xs text-base font-medium text-clr-main-gray-2'>
            multiplier
          </h3>
          {/* num */}
          <div className='flex flex-row items-center space-x-2 w-full'>
            <button
              onClick={() => handleInputMultiplier(myMultiplier, 'down')}
              className='rounded-md border border-gray-500 hover:bg-clr-main-gray-6'>
              <FaCaretDown className='w-5 h-5' />
            </button>
            <InputNumber<string>
                className='outline-none text-white bg-clr-main-black-1 rounded-lg py-0 px-2 w-full border border-gray-700 hover:bg-clr-main-black-1 focus:bg-clr-main-black-1 hover:outline-none'
                defaultValue={''}
                min={'0'}
                step={'0.25'}
                max={'10'}
                onChange={(value) => handleInputMultiplier(value, 'base')}
                value={myMultiplier}
            />
            <button
              onClick={() => handleInputMultiplier(myMultiplier, 'up')}
              className='rounded-md border border-gray-500 hover:bg-clr-main-gray-6'>
              <FaCaretUp className='w-5 h-5' />
            </button>
          </div>
        </div>
      </div>
      <button
          onClick={handleSubmit}
          disabled={round.isRoundStart}
          className={classNames(
            'py-2 px-4 text-white rounded-md',
            !round.isRoundStart ? 'bg-pink-700 bg-gradient-to-r from-pink-700 to-orange-500 hover:shadow hover:shadow-pink-700' : 'bg-gray-500 hover:bg-gray-400'
          )}
        >
          {round.isRoundStart ? 'Started' : 'Start'}
        </button>
    </div>
  );
};

export default PlayerInputs;
import React, { useState } from 'react';

// custom
import PlayerInputs from './PlayerInputs';
import CurrentRound from './CurrentRound';
import SpeedSlider from './SpeedSlider';
import PlayerName from './PlayerName';
import { useMainContext } from '@/contexts/main_context';
import { GameControlsProps } from '@/types/GameControlsProps';




const GameControls: React.FC<GameControlsProps> = (props) => {
  const {player} = useMainContext()

  if(player.name === '' || player.name === undefined || player.name === null)
    return (
      <PlayerName />
    )
  // after saved player name
  return (
    <div className='md:col-span-4 col-span-12 flex flex-col space-y-4 w-full'>
      <PlayerInputs />
      <CurrentRound />
      <SpeedSlider />
    </div>
  );
};

export default GameControls;
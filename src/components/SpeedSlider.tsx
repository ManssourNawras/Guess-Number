import React, { useState } from 'react';

//lib
import { IoIosSpeedometer } from 'react-icons/io';
import { Slider } from 'antd';
import type { SliderSingleProps } from 'antd';

//custom
import { SpeedSliderProps } from '@/types/SpeedSliderProps';
import { useMainContext } from '@/contexts/main_context';

const marks: SliderSingleProps['marks'] = {
  1: {
    style: {
      color: '#fff',
    },
    label: <strong>1x</strong>,
  },
  2: {
    style: {
      color: '#fff',
    },
    label: <strong>2x</strong>,
  },
  3: {
    style: {
      color: '#fff',
    },
    label: <strong>3x</strong>,
  },
  4: {
    style: {
      color: '#fff',
    },
    label: <strong>4x</strong>,
  },
  5: {
    style: {
      color: '#fff',
    },
    label: <strong className='pt-8'>5x</strong>,
  },
};

const SpeedSlider: React.FC<SpeedSliderProps> = (props) => {
  const {setRound , round} = useMainContext()
  const [speed, setSpeed] = useState<number>(1);

  const handleInputSpeed = (value: number) => {
    setSpeed(value);
    setRound({...round , speed : value })
  }

  return (
    <div className='w-full md:col-span-6 col-span-12 flex flex-col space-y-2'>
      {/* title */}
      <h2 className='flex flex-row items-center space-x-2'>
        <IoIosSpeedometer className='w-6 h-6 text-red-600' />
        <span className='text-lg font-semibold'>Current Round</span>
      </h2>
      {/* content */}
      <div className="border border-gray-700 bg-gray-800 rounded-md py-2">
        <Slider
          min={1}
          max={5}
          marks={marks}
          step={1}
          defaultValue={1}
          value={speed}
          onChange={handleInputSpeed}
          className='w-[90%] mx-auto'
        />
      </div>
    </div>
  );
};

export default SpeedSlider;
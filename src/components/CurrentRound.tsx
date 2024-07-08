import React from 'react';

//lib
import { FaTrophy } from 'react-icons/fa';

// custom
import { CurrentRoundProps } from '@/types/CurrentRoundProps';
import { useMainContext } from '@/contexts/main_context';
import { classNames } from '@/utils/helper';


const CurrentRound: React.FC<CurrentRoundProps> = (props) => {
    const {setRound , round} = useMainContext()
  return (
    <div className='w-full md:col-span-6 col-span-12 flex flex-col space-y-2'>
      {/* title */}
      <h2 className='flex flex-row items-center space-x-2'>
        <FaTrophy className='w-6 h-6 text-red-600' />
        <span className='text-lg font-semibold'>Current Round</span>
      </h2>
      {/* content */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-700">
          <table className="w-full text-sm text-left border border-gray-800">
              <thead className="text-sm text-clr-main-gray-2 font-semibold capitalize bg-clr-main-black-1">
                  <tr>
                      <th scope="col" className="px-3 py-2">
                          Name
                      </th>
                      <th scope="col" className="px-3 py-2">
                          Point
                      </th>
                      <th scope="col" className="px-3 py-2">
                          Multiplier
                      </th>
                  </tr>
              </thead>
              <tbody>
                  {round.players && round.players.map((item)=>{
                    return (
                        <tr key={item.name}
                            className={classNames(
                                "border-b border-gray-700 font-medium",
                                item.name == 'you' ? 'bg-clr-main-gray-4' : 'bg-clr-main-black-1',
                                ['CPU2' , 'CPU4'].includes(item.name) ? 'bg-clr-main-gray-6' : 'bg-clr-main-black-1',
                                (item.points == 0 && round.isRoundFinish) ? 'text-red-600' : '',
                                (item.points !== 0 && round.isRoundFinish) ? 'text-green-600' : '',
                            )}
                        >
                            <th scope="row" className="px-6 py-1 font-medium text-white whitespace-nowrap ">
                                {item.name}
                            </th>
                            <td className="px-6 py-1">
                                {(round.isRoundStart || round.multiplier != 0 ) ?  item.points : ' - '}
                            </td>
                            <td className="px-6 py-1">
                                {(round.isRoundStart || round.multiplier != 0 ) ? item.multiplier : ' - '}
                            </td>
                        </tr>
                    )
                  })}
              </tbody>
          </table>
      </div>

    </div>
  );
};

export default CurrentRound;
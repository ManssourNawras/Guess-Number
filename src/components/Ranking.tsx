import React, { useEffect, useState } from 'react';

//lib
import { PiRankingBold } from 'react-icons/pi';

// custom
import { PlayerRank, RankingProps } from '@/types/RankingProps';
import { useMainContext } from '@/contexts/main_context';
import { classNames } from '@/utils/helper';



const Ranking: React.FC<RankingProps> = (props) => {
    const {setRound , round} = useMainContext()
    const [currentRank , setCurrentRank] = useState<PlayerRank[]>([])

    useEffect(()=>{
        const tempRank = round.players.map((item , index)=> {
            return {
                id: index + 1,
                name : item.name,
                score : item.points
             }
        })
        tempRank.sort((a, b) => b.score- a.score);
        setCurrentRank(tempRank)
    } , [round.players])

    return (
        <div className='w-full md:col-span-6 col-span-12 flex flex-col space-y-2'>
        {/* title */}
        <h2 className='flex flex-row items-center space-x-2'>
            <PiRankingBold className='w-6 h-6 text-red-600' />
            <span className='text-2xl font-semibold'>Ranking</span>
        </h2>
        {/* content */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-700 ">
            <table className="w-full text-sm text-left border border-gray-800">
                <thead className="text-sm text-clr-main-gray-2 font-semibold uppercase bg-clr-main-black-1">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            No.
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Score
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentRank && currentRank.map((item , index)=>{
                        return (
                            <tr key={item.name}
                                className={classNames(
                                    "border-b border-gray-700 font-medium",
                                    item.name == 'you' ? 'bg-clr-main-gray-4' : '',
                                    ([2 , 4].includes(index) && item.name !== 'you') ? 'bg-clr-main-gray-6' : '',
                                    ([1 , 3].includes(index) && item.name !== 'you') ? 'bg-clr-main-black-1' : '',
                                )}
                            >
                                <th scope="row" className="px-6 py-2 font-medium text-white whitespace-nowrap ">
                                    {index+1}
                                </th>
                                <td className="px-6 py-1">
                                    {(round.isRoundFinish && round.multiplier != 0 ) ?  item.name : ' - '}
                                </td>
                                <td className="px-6 py-1">
                                    {(round.isRoundFinish && round.multiplier != 0 ) ? (item.score) : ' - '}
                                </td>
                            </tr>
                        )
                    })}
                    {/* <tr className="bg-clr-main-gray-6 border-b border-gray-700 font-medium">
                        <th scope="row" className="px-6 py-2 font-medium text-white whitespace-nowrap ">
                            1
                        </th>
                        <td className="px-6 py-2">
                            CPU1
                        </td>
                        <td className="px-6 py-2">
                            2.56
                        </td>
                    </tr>
                    <tr className="bg-clr-main-black-1 border-b border-gray-700 font-medium">
                        <th scope="row" className="px-6 py-2 font-medium text-white whitespace-nowrap">
                            2
                        </th>
                        <td className="px-6 py-2">
                            CPU3
                        </td>
                        <td className="px-6 py-2">
                            2.56
                        </td>
                    </tr>
                    <tr className="bg-clr-main-gray-4 border-b border-gray-700 font-medium">
                        <th scope="row" className="px-6 py-2 font-medium text-white whitespace-nowrap ">
                            3
                        </th>
                        <td className="px-6 py-2">
                            YOU
                        </td>
                        <td className="px-6 py-2">
                            2.56
                        </td>
                    </tr>
                    <tr className="bg-clr-main-black-1 border-b border-gray-700 font-medium">
                        <th scope="row" className="px-6 py-2 font-medium text-white whitespace-nowrap">
                            4
                        </th>
                        <td className="px-6 py-2">
                            CPU2
                        </td>
                        <td className="px-6 py-2">
                            2.56
                        </td>
                    </tr>
                    <tr className="bg-clr-main-gray-6 border-b border-gray-700 font-medium">
                        <th scope="row" className="px-6 py-2 font-medium text-white whitespace-nowrap ">
                            5
                        </th>
                        <td className="px-6 py-2">
                            CPU4
                        </td>
                        <td className="px-6 py-2">
                            2.56
                        </td>
                    </tr> */}
                </tbody>
            </table>
        </div>

        </div>
    );
};

export default Ranking;
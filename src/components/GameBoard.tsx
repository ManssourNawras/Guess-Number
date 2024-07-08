import React, { useEffect, useState } from 'react';

//li
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { FaAward, FaClock, FaUserAlt } from 'react-icons/fa';
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

// custom
import { GameBoardProps } from '@/types/GameBoardProps';
import { useMainContext } from '@/contexts/main_context';
import { classNames, getRandomMultiplierStep } from '@/utils/helper';


const GameBoard: React.FC<GameBoardProps> = (props) => {
  const {player ,setPlayer , round , setRound} = useMainContext()
  const[currentDate , serCurrentDate] = useState(new Date().toLocaleTimeString())
  const [dynamicpoints ,setDynamicPoints] = useState<number[]>([])
  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([
      {
        name: 'Multiplier',
        data: round.chart.ydata,
      },
    ]);
  const [options , setOption] = useState<ApexOptions>(
    {
        chart: {
          id: 'multiplier',
          toolbar: {
            show : false,
          }
        },
        colors: ['#be185d', '#f97316 '],
        grid: {
          show: false, // Hide grid lines
        },
        tooltip: {
          enabled: false, // Disable tooltip
        },
        stroke: {
          width: [5, 3, 4],
          curve: ['smooth', 'stepline']
        },
        xaxis: {
          categories: round.chart.xdata,
          axisBorder: {
            show: true,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: true,
          },
          min: 0,
          max: 10,
        },
        yaxis: {
          labels: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        responsive: [
          {
            breakpoint: 2600,
            options: {
              chart: {
                width: 800,
                height : 400
              },
            },
          },
          {
            breakpoint: 1300,
            options: {
              chart: {
                width: 700,
                height : 400
              },
            },
          },
          {
            breakpoint: 1150,
            options: {
              chart: {
                width: 600,
                height : 400
              },
            },
          },
          {
            breakpoint: 980,
            options: {
              chart: {
                width: 500,
                height : 400
              },
            },
          },
          {
            breakpoint: 860,
            options: {
              chart: {
                width: 450,
                height : 400
              },
            },
          },
          {
            breakpoint: 765,
            options: {
              chart: {
                width: 600,
                height : 400
              },
            },
          },
          {
            breakpoint: 660,
            options: {
              chart: {
                width: 500,
                height : 400
              },
            },
          },
          {
            breakpoint: 560,
            options: {
              chart: {
                width: 400,
                height : 400
              },
            },
          },
          {
            breakpoint: 460,
            options: {
              chart: {
                width: 300,
                height : 400
              },
            },
          },
        ],
    }
  )

  // timer
  useEffect(() => {
    const intervalId = setInterval(() => {
      serCurrentDate(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // guess number proccess
  useEffect(() => {
    if (round.isRoundStart) {
      const generateRondomMultiplierId = setInterval(() => {
        const nextGuessedNumber = round.multiplier + 0.05;
        // const tempPoints = [...dynamicpoints , nextGuessedNumber];

        if (nextGuessedNumber < round.guessedNumber) {
          // round
          setRound({...round,
            multiplier : nextGuessedNumber,
            chart : { ...round.chart , xdata : [...round.chart.xdata , 0.05] , ydata : [...round.chart.ydata , nextGuessedNumber]}
          });
          // chart
          setDynamicPoints( round.chart.ydata);
          setOption({...options , xaxis : {...options.xaxis , categories : round.chart.ydata }})
          setSeries([
            {
              name: 'Multiplier',
              data: dynamicpoints,
            }
          ])

        } else {
          clearInterval(generateRondomMultiplierId);
          const tempPlayers = round.players.map((item , index)=> {
              return {
                ...item ,
                points : item.multiplier > round.guessedNumber ? 0 : Math.round(item.points * item.multiplier)
              }
          })

          setRound({
            ...round ,
            isRoundStart : false ,
            multiplier : round.guessedNumber ,
            isRoundFinish : true,
            players : tempPlayers
          })

          const mypointsREsult = tempPlayers.find( (item) => item.name === 'you')
          setPlayer({
            ... player,
            points : mypointsREsult?.points === 0 ? player.points - player.lastRoundPoint : (player.points + (mypointsREsult?.points ?? 0))
          })
        }
      }, 500 / round.speed);

      return () => {
        clearInterval(generateRondomMultiplierId);
      };
    }
  }, [round.isRoundStart, round.speed, round.multiplier]);


  return (
    <div className='w-full md:col-span-8 col-span-12 flex flex-col space-y-2 md:py-0 py-10'>
      {/* statistics */}
      <div className='grid S-900:grid-cols-3 S-600:grid-cols-2 gap-4'>
        {/* points */}
        <div className='flex flex-row py-2 px-4 items-center rounded-md space-x-16 border border-gray-700 bg-gray-800 bg-gradient-to-r from-gray-950 to-gray-800'>
          <FaAward className='w-6 h-6 text-amber-400' />
          <span className='text-lg font-medium'>{player.name.length > 0 ? player.points : ''}</span>
        </div>
        {/* name */}
        <div className='flex flex-row py-2 px-4 items-center rounded-md space-x-16 border border-gray-700 bg-gray-800 bg-gradient-to-r from-gray-950 to-gray-800'>
          <FaUserAlt className='w-6 h-6 text-amber-400' />
          <span className='text-lg font-medium'>{player.name.length > 0 ? player.name : ''}</span>
        </div>
        {/* time */}
        <div className='flex flex-row py-2 px-4 items-center rounded-md space-x-16 border border-gray-700 bg-gray-800 bg-gradient-to-r from-gray-950 to-gray-800'>
          <FaClock className='w-6 h-6 text-amber-400' />
          <span className='text-lg font-medium'>{player.name.length > 0 ? currentDate : ''}</span>
        </div>
      </div>
      {/* chart */}
      <div className='w-full border border-gray-700 bg-gray-800 rounded-md h-[450px] relative'>
          <span className={classNames(
            'absolute top-[35%] left-[45%]  text-5xl font-semibold z-250',
            (round.isRoundFinish && round.multiplier != 0 ) ? 'text-pink-700' : "text-white"
          )}>
            {round.multiplier.toFixed(2)}x
          </span>
          <div className='relative w-full h-full z-0 py-8 md:px-8 sm:px-3 px-0 mx-auto'>
            <ApexChart type="line" options={options} series={series} />
          </div>
      </div>
    </div>
  )
}

export default GameBoard;
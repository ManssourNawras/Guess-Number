import React, { useContext, useEffect, useReducer } from 'react';

// lib

// custom
import reducer from '../reducers/main_reducer';
import { SET_PLAYER , SET_ROUND } from '../utils/actions';
import { MainContextState, MainProviderProps, Player, Round } from '@/types/MainContextProps';
import { generateAutoPlayers } from '@/utils/helper';

//vars
const initialState : MainContextState = {
  player: {
    name : '',
    points : 0,
    lastRoundPoint : 0
  },
  setPlayer : () => {},
  round : {
    roundNumber : 0,
    guessedNumber: 0,
    multiplier : 0,
    isRoundStart : false,
    isRoundFinish : false,
    speed: 1,
    players : [],
    chart : {
      xdata: [],
      ydata: []
    }
  },
  setRound: () => {}
}

const MainContext = React.createContext<MainContextState>(initialState);
export const MainProvider: React.FC<MainProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setPlayer = (currentPlayer: Player) => {
    dispatch({ type: SET_PLAYER, payload: currentPlayer });
  };

  const setRound = (currentRound: Round) => {
    dispatch({ type: SET_ROUND, payload: currentRound });
  };

  // init first round
  useEffect(()=>{
    if(state.round.players.length !== 5){
      const you = {
        name: 'you',
        points: 100,
        multiplier : 2.25
      }
      const autoPlayes = generateAutoPlayers(4);

      const currentRound = {
        roundNumber : 0,
        guessedNumber: 0,
        multiplier : 0,
        isRoundStart : false,
        isRoundFinish : false,
        speed: 1,
        players : [you , ...autoPlayes],
        chart : {
          xdata: [],
          ydata: []
        }
      }
      dispatch({ type: SET_ROUND, payload: currentRound });
    }
  } , [])

  return (
    <MainContext.Provider
      value={{
        ...state,
        setPlayer,
        setRound
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContext;

export const useMainContext = () => {
  return useContext(MainContext);
};
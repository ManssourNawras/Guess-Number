export interface MainContextState {
  player: Player
  setPlayer: (currentPlayer: Player) => void
  round: Round
  setRound: (currentRound: Round) => void
}

export interface MainProviderProps {
  children: React.ReactNode
}


export interface Player {
  name : string
  points : number
  lastRoundPoint : number
}

export interface PlayerRound {
  name: string
  points: number
  multiplier : number
}

export interface ChartProps {
  xdata: number[]
  ydata: number[]
}

export interface Round {
  roundNumber: number
  guessedNumber: number
  multiplier: number
  isRoundStart: boolean
  isRoundFinish: boolean
  speed: number
  players: PlayerRound[]
  chart : ChartProps
}
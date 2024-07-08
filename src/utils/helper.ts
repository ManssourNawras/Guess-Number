import { PlayerRound } from "@/types/MainContextProps"


export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}

export const addOrUpdateItemPlayersRound = (arr: PlayerRound[], item: PlayerRound) => {
  if (arr) {
    let tempArr = []
    const tempItem = arr.find((currentItem) => currentItem.name === item.name)
    if (tempItem) {
      tempArr = arr.map((currentItem) => {
        if (currentItem.name === item.name) currentItem = item
        return currentItem
      })
    } else {
      tempArr = [...arr, item]
    }
    return tempArr
  }
  return []
}

export const getRandomNumber = () => {
  return parseFloat( (Math.random() * 10).toFixed(2))
}

export const getRandomMultiplierStep = () => {
  return parseFloat(Math.random().toFixed(2))
}

export const generateAutoPlayers = (count : number) => {
  const players: PlayerRound[] = []

  for (let i = 0; i < count; i++) {
    const player: PlayerRound = {
      name: `CPU${i + 1}`,
      points: 100,
      multiplier: getRandomNumber(),
    }

    players.push(player)
  }
  return players
}

import { SET_PLAYER, SET_ROUND } from '../utils/actions'

const main_reducer = (state: any, action: any) => {
  switch (action.type) {
    case SET_PLAYER:
      return { ...state, player: action.payload }
    case SET_ROUND:
      return { ...state, round: action.payload }
    default:
      return state
    //throw new Error(`No Matching "${action.type}" - action type`)
  }
}

export default main_reducer

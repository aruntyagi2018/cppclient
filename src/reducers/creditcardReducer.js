import { CARDPOST,CARDKEYPRESS } from '../actions/types'
import { cardTypeImages} from "../config/card/type.js"

var initialState = {
  cardtype: '',
  cardTypeImage: cardTypeImages[''],
  billingaddress: '',
}

export default function(state = initialState, action) {
    switch(action.type) {
      case CARDPOST:
        return Object.assign({}, state, {
            cardtype: action.payload._ekv,
            cardTypeImage: cardTypeImages[action.payload._ekv],
            billingaddress:action.payload._ekt
          });
      case CARDKEYPRESS:
        return Object.assign({}, state, {
            cardtype: action.payload.cardtype,
            cardTypeImage: cardTypeImages[action.payload.cardtype]
          });
      default:
          return state;
    }
}

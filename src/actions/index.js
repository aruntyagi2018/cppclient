import axios from 'axios';

import { CARDPOST, CARDKEYPRESS } from './types'
import { cardRange } from "../config/card/type.js"

export const cardPost = (data) => {
    return function(dispatch) {
        axios
            .post('https://pgstaging.emirates.com/restservices/rest/CPGRestService/v1.0/postDetails', data)
            .then(res => dispatch({ type: CARDPOST, payload: res.data}));
    }
};

export const cardKeyPress = (data) => {
    return function(dispatch) {
        let validateLength = data.value.length;
        var res = {
          cardtype: data.cardtype
        };
        if (validateLength === 0) {
          res.cardtype = "";
        }
        else {
          for (var i = 1; i <= validateLength; i++) {
            if (cardRange.hasOwnProperty(i.toString())) {
              let matchvalue = data.value.toString().substring(0,i);
              if (cardRange[i].hasOwnProperty("match")) {
                for(var ctype in cardRange[i]["match"])
                {
                  if(cardRange[i]["match"][ctype].includes(matchvalue)) {
                    res.cardtype = ctype;
                  }
                }
              }
            }
          }
        }
        dispatch({ type: CARDKEYPRESS, payload: res});
    }
};

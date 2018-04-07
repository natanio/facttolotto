// actions are where most of the business logic takes place
// they are dispatched by views or by other actions
// there are 3 types of actions:
//  async thunks - when doing asynchronous business logic like accessing a service
//  sync thunks - when you have substantial business logic but it's not async
//  plain object actions - when you just send a plain action to the reducer

import _ from 'lodash';
import * as types from './actionTypes';
import numberService from '../../services/numbers';
import * as factsSelectors from '../facts/reducer';

// export function fetchRandomFact() {
//   try {
//     const fetchPromise = numberService.getFact();
//     console.log('fact should be fetched');
//     const fact = await fetchPromise;
//     console.log(`fact: ${fact}`);
//     dispatch({ type: types.RANDOM_FETCHED, fact });
//   } catch (error) {
//     console.error(error);
//   }
// }

export function fetchFact(number, category = 'date') {
  if (!number) {
    number = Math.floor(Math.random() * 20000);
  }
  console.log('fetching the fact');
  return async(dispatch) => {
    try {
      const fetchPromise = numberService.getFact(number, category);
      console.log('fact should be fetched');
      const fact = await fetchPromise;
      console.log(`fact: ${fact}`);
      dispatch({ type: types.FACT_FETCHED, fact });
    } catch (error) {
      console.error(error);
    }
  };
}

// export function changeFilter(newFilter) {
//   return({ type: types.FILTER_CHANGED, filter: newFilter });
// }

// export function selectPost(postId) {
//   return({ type: types.POST_SELECTED, postId });
// }

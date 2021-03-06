// reducers hold the store's state (the initialState object defines it)
// reducers also handle plain object actions and modify their state (immutably) accordingly
// this is the only way to change the store's state
// the other exports in this file are selectors, which is business logic that digests parts of the store's state
// for easier consumption by views

import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  currentFilter: undefined,
  currentFact: undefined
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.FACT_FETCHED:
      return state.merge({
        currentFilter: action.fact.type,
        currentFact: action.fact,
      });
    default:
      return state;
  }
}

// selectors

export function getFact(state) {
  return state.facts;
}

export function getFilter(state) {
  return state.facts.type;
}

// export function getPosts(state) {
//   const currentFilter = state.posts.currentFilter;
//   const postsById = state.posts.postsById;
//   const currentTopicUrls = topicsSelectors.getSelectedTopicsByUrl(state);
//   const postsIdArray = currentFilter === 'all' ?
//     _.filter(_.keys(postsById), (postId) => currentTopicUrls[postsById[postId].topicUrl]) :
//     _.filter(_.keys(postsById), (postId) => postsById[postId].topicUrl === currentFilter);
//   return [postsById, postsIdArray];
// }

// export function getCurrentFilter(state) {
//   return state.posts.currentFilter;
// }

// export function getCurrentPost(state) {
//   return _.get(state.posts.postsById, state.posts.currentPostId);
// }

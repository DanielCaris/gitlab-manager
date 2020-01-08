import { FETCH_ISSUES } from '../types';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ISSUES:
      return action.payload;
    default:
      return state;
  }
}

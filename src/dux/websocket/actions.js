import {
  INITIALIZE_APP,
  INITIALIZE_WS,
} from './actionTypes';

export const initializeApp = () => ({ type: INITIALIZE_APP });
export const initializeWs = () => ({ type: INITIALIZE_WS });

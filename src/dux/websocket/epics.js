import { Subject } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  mapTo,
  mergeMap,
  map,
  delay,
} from 'rxjs/operators';
import { webSocket } from 'rxjs/webSocket';
import { ofType, combineEpics } from 'redux-observable';

import {
  INITIALIZE_APP,
  INITIALIZE_WS,
  WS_MESSAGE_RECIEVED,
  WS_CONNECT,
  WS_PULSE,
} from './actionTypes';

const openSubject = new Subject();

let socket$ = webSocket('ws://localhost:3000/ws');

const initAppEpic = action$ => action$.pipe(
  ofType(INITIALIZE_APP),
  mapTo({ type: INITIALIZE_WS }),
);

const authEpic = action$ => action$.pipe(
  ofType(INITIALIZE_APP),
  mergeMap(() => ajax
    .get('/api/security/ticket', { // to test api calls
      'X-Requested-With': 'XMLHttpRequest',
    })
    .pipe(
      map(() => {
        socket$ = webSocket('ws://localhost:3000/ws'); // to test ws
        return ({ type: INITIALIZE_WS });
      }),
    )),
);

const initializeWsEpic = action$ => action$.pipe(
  ofType(INITIALIZE_WS),
  mergeMap(() => [
    { type: WS_CONNECT },
    { type: WS_PULSE },
  ]),
);

const connectToWsEpic = action$ => action$.pipe(
  ofType(WS_CONNECT),
  mergeMap(() => socket$.pipe(
    map(message => ({ type: WS_MESSAGE_RECIEVED, payload: message })),
  )),
);

const pingPongEpic = action$ => action$.pipe(
  ofType(WS_PULSE),
  mergeMap(() => openSubject
    .pipe(
      mapTo(socket$.next({
        op: 'PING',
        principal: 'anonymous',
        ticket: '[]',
        roles: 'anonymous',
      })),
      delay(4000),
      mapTo({ type: WS_PULSE }),
    )),
);

export default combineEpics(
  initAppEpic,
  authEpic,
  initializeWsEpic,
  connectToWsEpic,
  pingPongEpic,
);

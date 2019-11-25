import { Subject, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  mapTo,
  mergeMap,
  map,
  catchError,
} from 'rxjs/operators';
import { webSocket } from 'rxjs/webSocket';
import { ofType, combineEpics } from 'redux-observable';
import get from 'lodash/fp/get';
import noop from 'lodash/fp/noop';

import {
  INITIALIZE_APP,
  INITIALIZE_WS,
  WS_MESSAGE_RECIEVED,
  WS_CONNECT,
  WS_PULSE,
} from './actionTypes';
import {
  GET_NOTEBOOKS,
  GET_NOTEBOOKS_FAILURE,
} from '~/dux/notebooks/actionTypes';
import {
  GET_CURRENT_NOTEBOOK,
  GET_CURRENT_NOTEBOOK_FAILURE,
} from '~/dux/currentNotebook/actionTypes';
import { getNotebooksSuccess } from '~/dux/notebooks/actions';
import { getCurrentNotebookSuccess } from '~/dux/currentNotebook/actions';
import {
  PING,
  NOTE,
  LIST_NOTES,
  GET_NOTE,
  NOTES_INFO,
} from './messageTypes';

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

const handleWSMessageByTypeEpic = action$ => action$.pipe(
  ofType(WS_MESSAGE_RECIEVED),
  mergeMap(({ payload: { op, data } }) => {
    if (op === NOTES_INFO) {
      return of(get('notes', data))
        .pipe(
          map(getNotebooksSuccess),
          catchError(error => of({
            type: GET_NOTEBOOKS_FAILURE,
            payload: get('xhr.response', error),
            error: true,
          })),
        );
    }
    if (op === NOTE) {
      return of(get('note', data))
        .pipe(
          map(getCurrentNotebookSuccess),
          catchError(error => of({
            type: GET_CURRENT_NOTEBOOK_FAILURE,
            payload: get('xhr.response', error),
            error: true,
          })),
        );
    }
    return noop;
  }),
);

const pingPongEpic = action$ => action$.pipe(
  ofType(WS_PULSE),
  mergeMap(() => openSubject
    .pipe(
      mapTo(socket$.next({
        op: PING,
        principal: 'anonymous',
        ticket: 'anonymous',
        roles: '[]',
      })),
      mapTo({ type: WS_PULSE }),
    )),
);

const listNotebookEpic = action$ => action$.pipe(
  ofType(GET_NOTEBOOKS),
  mergeMap(() => openSubject
    .pipe(
      mapTo(socket$.next({
        op: LIST_NOTES,
        principal: 'anonymous',
        ticket: 'anonymous',
        roles: '[]',
      })),
    )),
);

const getNotebookEpic = action$ => action$.pipe(
  ofType(GET_CURRENT_NOTEBOOK),
  mergeMap(({ payload }) => openSubject
    .pipe(
      mapTo(socket$.next({
        op: GET_NOTE,
        data: { id: payload },
        principal: 'anonymous',
        ticket: 'anonymous',
        roles: '[]',
      })),
    )),
);

export default combineEpics(
  initAppEpic,
  authEpic,
  initializeWsEpic,
  connectToWsEpic,
  handleWSMessageByTypeEpic,
  pingPongEpic,
  listNotebookEpic,
  getNotebookEpic,
);

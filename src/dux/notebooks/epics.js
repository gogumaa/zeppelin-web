import { of } from 'rxjs';
import { mergeMap, map, delay } from "rxjs/operators";
import { ofType, combineEpics } from "redux-observable";

import {
  GET_NOTEBOOKS,
} from "./actionTypes.js";
import { getNotebooksSuccess } from "./actions";

const MOCKED_DATA = [{
  id: 1,
  name: "n1"
}, {
  id: 2,
  name: "n2"
}];

const fetchNotebooksEpic = action$ => action$.pipe(
  ofType(GET_NOTEBOOKS),
  mergeMap((/*action*/) => of(MOCKED_DATA)
    .pipe(
      delay(2000),
      map(getNotebooksSuccess)
    )
  )
);

export default combineEpics(fetchNotebooksEpic);

import {
    call,
    delay,
    put,
    takeLatest,
    select,
    debounce,
    throttle
  } from 'redux-saga/effects';
  import {actions, types} from './state';
  import {
    // callApiBaseBrand,
    // callApiRegion,
  } from '~/api/api';
  

  interface AlertPayload {
    open: boolean;
    content: string;
    bottom?: number;
  }
  interface AlertAction {
    type: string;
    payload: AlertPayload;
  }
//   export function* requestBaseBrand() {
//     try {
//       const response = yield call(callApiBaseBrand);
//       if (response.status === 200) {
//         // console.log(
//         //   'status 200 -- base brand response response.data.brand ---->',
//         //   response.data.brand,
//         // );
//         yield put(actions.setBaseBrand(response.data.brand));
//       }
//     } catch (err) {
//       console.log(err, 'requestBaseBrand errrr');
//     }
//   }
  

  export function* requestAlert(action: AlertAction) {
    const {open, content, bottom} = action.payload;
    try {
      yield put(actions.setAlert({open, content, bottom}));
      const {open: opened} = yield select((state) => state.common.alert);
      if (opened) {
        yield delay(4000);
        yield put(actions.setAlert({open: false, content: ''}));
      }
    } catch (err) {
      console.log(err);
    }
  }
  
  export default function* watcher() {
    yield takeLatest(types.REQUEST_ALERT, requestAlert);
  }
  
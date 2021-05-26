import { all, fork } from "redux-saga/effects";
import commonSaga from "@redux/common/saga"
import socketSaga from "@redux/socket/saga"

export default function* rootSaga() {
  yield all([
    fork(commonSaga),
    fork(socketSaga),
  ]);
}

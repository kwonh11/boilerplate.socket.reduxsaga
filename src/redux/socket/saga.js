import {
    call,
    delay,
    put,
    takeEvery,
    select,
    debounce,
    take,
    throttle,
    fork,
    actionChannel,
    takeLatest,
  } from 'redux-saga/effects';
import {buffers} from 'redux-saga';
import {actions, types} from './state';
import { createSocketChannel, closeChannel } from './createSocketChannel';
import socket from '~/config/socket';
import moment from 'moment';

  function* waitTask(task) {
    let channel;
    try {
      channel = yield call(createSocketChannel, "tasks");
      while(true) {
        const task = yield take(channel);
        yield onTask(task);
      }
    } catch(e) {
      console.log(e, "error");
    } finally {
      socket.close();
      closeChannel(channel);
    }
  }
  
  function* onTask(task) {
    yield put(actions.pushTask(task));
  }

  export default function* watcher() {
    yield takeEvery(types.WAIT_TASK, waitTask);
  }
  
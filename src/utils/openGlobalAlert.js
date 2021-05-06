// 사용자와의 인터렉션에 따른 Alert
// 하단에 표시됨

import store from '~/store';
import {actions as commonActions} from '@common/state';

export default function openGlobalAlert(message: string) {
  store.dispatch(
    commonActions.requestBottomAlert({open: true, content: message}),
  );
}

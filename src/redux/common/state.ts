import createReducer from '@utils/createReducer';

export const types = {
  // 알림 창
  REQUEST_ALERT: 'common/REQUEST_ALERT',
  SET_ALERT: 'common/SET_ALERT',
  
  // 로그인 상태
  SET_ISLOGGEDIN: 'common/SET_ISLOGGEDIN'
};

interface AlertPayload {
  open: boolean;
  content: string;
  bottom?: number;
}
export const actions = {
  requestAlert: (payload: AlertPayload) => ({
    type: types.SET_ALERT,
    payload,
  }),
  setAlert: (payload: AlertPayload) => ({
    type: types.SET_ALERT,
    payload,
  }),
  setIsLoggedIn: (payload: boolean) => ({
    type: types.SET_ISLOGGEDIN,
    payload,
  })
};
export const INITIAL_STATE = {
  isLoggedIn: false,
  alert: {
    open: false,
    content: '',
  },
};

interface AlertAction {
  type: string;
  payload: AlertPayload;
}

const reducer = createReducer(INITIAL_STATE, {
  [types.SET_ALERT]: (state: any, action: AlertAction) => {
    state.alert = action.payload;
  },
  [types.SET_ISLOGGEDIN]: (state: any, action: any) => {
    state.isLoggedIn = action.payload;
  }
});

export default reducer;

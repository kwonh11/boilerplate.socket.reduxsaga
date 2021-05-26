import createReducer from '@utils/createReducer';
import moment from 'moment';

export const types = {
  WAIT_TASK: 'socket/WAIT_TASK',
  PUSH_TASK: 'socket/PUSH_TASK',
  COMPLETE_TASK: 'socket/COMPLETE_TASK',
};

export const actions = {
  waitTask: () => ({
    type: types.WAIT_TASK,
  }),
  pushTask: (payload) => ({
    type: types.PUSH_TASK,
    payload,
  }),
  completeTask: (payload) => ({
    type: types.COMPLETE_TASK,
    payload,
  }),
};
export const INITIAL_STATE = {
  tasks: [],
};

const reducer = createReducer(INITIAL_STATE, {
  [types.PUSH_TASK]: (state, action) => {
    state.tasks.push({...action.payload, time: moment(new Date()).format("HH시 mm분 ss초") });
  },
  [types.COMPLETE_TASK]: (state, action) => {
    const id = action.payload;
    const index = state.tasks.findIndex(task => task.id === Number(id));
    if (index > -1) {
      state.tasks.splice(index,1);
    }
  },
});

export default reducer;

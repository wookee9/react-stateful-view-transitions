const defaultState = {
  time: 0,
};

function clockReducer(state = defaultState, action) {
  switch (action.type) {
    case 'UPDATE_TIME':
      return {
        time: action.time,
      };
    default:
      return state;
  }
}

export default clockReducer;

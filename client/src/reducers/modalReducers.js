
export const modalStateReducer = (state = {}, action) => {
  switch (action.type) {
    case 'MODAL_STATE': {
      return Object.assign({}, action.payload);
    }
    default: {
      return state;
    }
  }
};

export const modalPageReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return Object.assign({}, action.payload);
    }
    case 'CLOSE': {
      return Object.assign({}, action.payload);
    }
    default: {
      return state;
    }
  }
};

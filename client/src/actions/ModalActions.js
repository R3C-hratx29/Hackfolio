const modalState = (state) => {
  return {
    type: 'MODAL_STATE',
    payload: { state }
  };
};

export default modalState;

const initialState = {
  modalType: null,
  modalProps: {}
}

const modal = (state = initialState, action) => {
  switch (action.type) {
    case ('SHOW_MODAL'):
      return {
        modalType: action.modalType,
        modalProps: action.modalProps
      }
    default:
      return state;
  }
};

export default modal;

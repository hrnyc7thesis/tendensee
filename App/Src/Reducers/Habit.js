const habit = (state ={addingHabit: false, updatingHabit:false, deletingHabit:false}, action) => {
  switch (action.type) {
    case ('HABIT_INIT'):
      return Object.assign({}, state, {
        addingHabit: true,
      });
    case ('HABIT_SUCCESS'):
      return Object.assign({}, state, {
        addingHabit: false,
      });
    case ('HABIT_FAIL'):
      return Object.assign({}, state, {
        addingHabit: false,
      });
    case ('UPDATE_HABIT_INIT'):
      return Object.assign({}, state, {
        updatingHabit: true,
      });
    case ('UPDATE_HABIT_SUCCESS'):
      return Object.assign({}, state, {
        updatingHabit: false,
      });
    case ('UPDATE_HABIT_FAIL'):
      return Object.assign({}, state, {
        updatingHabit: false,
      });
    case ('DELETE_HABIT_INIT'):
      return Object.assign({}, state, {
        deletingHabit: true,
      });
    case ('DELETE_HABIT_SUCCESS'):
      return Object.assign({}, state, {
        deletingHabit: false,
      });
    case ('DELETE_HABIT_FAIL'):
      return Object.assign({}, state, {
        deletingHabit: false,
      });
    default:
      return state;
  }
};

export default habit;

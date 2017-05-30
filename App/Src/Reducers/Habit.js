const habit = (state ={addingHabit: false}, action) => {
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
    default:
      return state;
  }
};

export default habit;

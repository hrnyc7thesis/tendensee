const addingHabit = (state = false, action) => {
  switch (action.type) {
    case ('HABIT_INIT'):
      return true;
    case ('HABIT_SUCCESS'):
      return false;
    case ('HABIT_FAIL'):
      return false;
    default:
      return state;
  }
};

export default addingHabit;

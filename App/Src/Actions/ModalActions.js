import { MY_IP } from './../myip';

export const editHabitDayType = (day, habitProps, allHabits) => {
  return {
      type: 'SHOW_MODAL',
      modalType: 'EDIT_HABIT_DAY_TYPE',
      modalProps: {
        day: day,
        habitProps: habitProps,
        allHabits: allHabits
      },
    }
};

export const editPastDay = (day, habitProps) => {
  return {
      type: 'SHOW_MODAL',
      modalType: 'EDIT_PAST_DAY',
      modalProps: {
        day: day,
        habitProps: habitProps,
      },
    }
};

export const hideModal = () => {
  return {
    type: 'HIDE_MODAL'
  }
};

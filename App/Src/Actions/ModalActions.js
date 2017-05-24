import { MY_IP } from './../myip';

export const editHabitDayType = (day) => {
  return {
      type: 'SHOW_MODAL',
      modalType: 'EDIT_HABIT_DAY_TYPE',
      modalProps: {
        day: day,
      },
    }
};

import React from 'react';
import { connect } from 'react-redux';
import EditHabitDayTypeModal from './EditHabitDayTypeModal';
import EditPastDayModal from './EditPastDayModal';

const MODAL_COMPONENTS = {
  'EDIT_HABIT_DAY_TYPE': EditHabitDayTypeModal,
  'EDIT_PAST_DAY': EditPastDayModal
}

const ModalRoot = ({ modalType, modalProps}) => {
  if (!modalType) {
    return null;
  }

  const SpecificModal = MODAL_COMPONENTS[modalType];
  return <SpecificModal {...modalProps} />
}

export default connect(state => state.modal)(ModalRoot)

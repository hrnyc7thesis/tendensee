import EditHabitDayTypeModal from './EditHabitDayType'

const MODAL_COMPONENTS = {
  'EDIT_HABIT_DAY_TYPE': EditHabitDayTypeModal
}

const ModalRoot = ({ modalType, modalProps}) => {
  if (!modalType) {
    return null;
  }
  
  const SpecificModal = MODAL_COMPONENTS[modalType];
  return <SpecificModal {...modalProps} />
}

export default connect(state => state.modal)(ModalRoot)

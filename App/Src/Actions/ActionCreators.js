import * as UserActions from './UserActions';
import * as PhotoActions from './PhotoActions';
import * as HabitActions from './HabitActions';
import * as ModalActions from './ModalActions';
import * as AuthActions from './AuthActions';
import * as FriendActions from './FriendActions';
import * as SettingsActions from './SettingsActions';

export const ActionCreators = Object.assign({},
  UserActions,
  PhotoActions,
  HabitActions,
  AuthActions,
  ModalActions,
  FriendActions,
  SettingsActions,
);

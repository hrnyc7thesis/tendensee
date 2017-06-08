import react, { Component } from 'react';
import PushNofication from 'react-native-push-notification';

export default class PushNotificationController extends Component {
  componentDidMount() {
    PushNofication.configure({
      onNotification: (notification) => {
        console.log('NOTIFICATION:', notification);
      },
    });
  };

  render() {
    return null;
  }
};

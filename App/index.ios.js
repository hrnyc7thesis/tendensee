import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';

import configureStore from './Src/Store/ConfigureStore';
import Router from './Src/Containers/Router';

const store = configureStore({
  photoCount: 1,
  user: {
    isFetching: false,
    userData: {
      "user": {
        "id": 101,
        "username": "deb123",
        "email": "debasish@outlook.com",
        "facebook": "dave mozumder"
      },
      "habits": [
        {
          "id": 12,
          "name": "exercise",
          "description": "I will workout every other day for next one month, wish me good luck fellas",
          "type": "gym",
          "start_date": "0000-00-00 00:00:00",
          "notification": null, // would be time of day if set
          "private": false,
          "has_picture": true,
          "id_users": 101,
          "dates": [
            {
              "id": 11,
              "date": "0000-00-00",
              "day": "Mon",
              "picture": "https://pbs.twimg.com/profile_images/714095884578000896/yvfrLbJL.jpg"
            },
            {
              "id": 12,
              "date": "0000-00-00",
              "day": "Tues",
              "picture": "https://pbs.twimg.com/profile_images/714095884578000896/yvfrLbJL.jpg"
            },
            {
              "id": 13,
              "date": "0000-00-00",
              "day": "Wed",
              "picture": "https://www.healthynomics.com/wp-content/demo/uploads/2011/09/5617742148_d1abbf911e_b.jpg"
            },
            {
              "id": 14,
              "date": "0000-00-00",
              "day": "Thur",
              "picture": "https://pbs.twimg.com/profile_images/714095884578000896/yvfrLbJL.jpg"
            }
          ]
        },
        {
          "id": 16,
          "name": "study",
          "description": "I will read every other day for next one month, wish me good luck fellas",
          "type": "book",
          "start_date": "0000-00-00 00:00:00",
          "notification": 1,
          "private": false,
          "has_picture": true,
          "id_users": 101,
          "dates": [
            {
              "id": 21,
              "date": "0000-00-00",
              "day": "Mon",
              "picture": "https://pbs.twimg.com/profile_images/714095884578000896/yvfrLbJL.jpg"
            },
            {
              "id": 22,
              "date": "0000-00-00",
              "day": "Tue",
              "picture": "https://pbs.twimg.com/profile_images/714095884578000896/yvfrLbJL.jpg"
            },
            {
              "id": 23,
              "date": "0000-00-00",
              "day": "Wed",
              "picture": "https://pbs.twimg.com/profile_images/714095884578000896/yvfrLbJL.jpg"
            },
            {
              "id": 24,
              "date": "0000-00-00",
              "day": "Thur",
              "picture": "https://pbs.twimg.com/profile_images/714095884578000896/yvfrLbJL.jpg"
            }
          ]
        }
      ]
    }
  }
});

const App = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

AppRegistry.registerComponent('App', () => App);

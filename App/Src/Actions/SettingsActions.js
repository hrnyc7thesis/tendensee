import { MY_IP } from './../myip';

export const updateUserEmailInit = () => {
  return {
    type: 'UPDATE_EMAIL_INIT'
  }
};

export const updateUserEmailSuccess = (data) => {
  return {
    type: 'UPDATE_EMAIL_SUCCESS',
    response: data
  }
};

export const updateUserEmailFail = (err) =>{
  return {
    type: 'UPDATE_EMAIL_FAIL',
    response: err
  }
};


export const updateEmail = (newEmail, userData, habit) => {
  console.log("inside updateEmail function")
  return dispatch => {
    dispatch(updateUserEmailInit());
    let putData = Object.assign({}, {data: {email: newEmail}, user: userData, habits: habit});
    return fetch(`http://${MY_IP}:8080/api/users/:${userData.id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(putData)
    })
    .then(data => {
      return data.json()
      .then(data => {
        dispatch(updateUserEmailSuccess(data));
      })
    })
    .catch((err)=> {
      dispatch(updateUserEmailFail(err))

    })
  }
}

// export const updateHabit = (userData, habit) => {
//   return dispatch => {
//     dispatch (updateHabitInit());
//     console.log('in update habit, ud then habit:', userData, habit)
//     let postData = Object.assign({}, userData, {data: habit}); // WILL EVENTUALLY HAVE A HABIT TYPE!!!
//
//     return fetch(`http://${MY_IP}:8080/api/habits`, {
//       method: 'PUT',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         "x-custom-header": userData.token
//       },
//       body: JSON.stringify(postData)
//     })
//     .then(data => {
//       return data.json()
//       .then(data => {
//         dispatch(habitSuccess(data));
//       })
//     })
//     .catch((err)=> dispatch(habitFail(err)));
//   }
// }

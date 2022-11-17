import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
const BASE_URL =
  'https://3453-2402-9d80-433-8a05-5911-2f41-1ddb-a304.ap.ngrok.io/api/v1';
// const BASE_URL = 'http://restapi.adequateshop.com/api';
export const Init = () => {
  return async dispatch => {
    let token = await AsyncStorage.getItem('token');
    if (token !== null) {
      console.log('token fetched');
      dispatch({
        type: 'LOGIN',
        payload: token,
      });
    }
  };
};
// export const Register = (
//   email,
//   password,
//   confpass,
//   full_name,
//   phone_number,
//   birthday,
//   gender,
//   fal,
//   address,
// ) => {
//   return async dispatch => {
//     let token = null;
//     if (username === 'nhatquang' && password === '1234') {
//       token = username + password;
//       // here we can use login api to get token and then store it
//       await AsyncStorage.setItem('token', token);
//       console.log('token stored');
//     }
//     dispatch({
//       type: 'LOGIN',
//       payload: token,
//     });
//   };
// };
// export const Login = (username, password) => {
//   return async dispatch => {
//     let token = null;
//     if (username === 'nhatquang' && password === '1234') {
//       token = username + password;
//       // here we can use login api to get token and then store it
//       await AsyncStorage.setItem('token', token);
//       console.log('token stored');
//     }
//     dispatch({
//       type: 'LOGIN',
//       payload: token,
//     });
//   };
// };
export const Login = (username, password) => {
  return async dispatch => {
    let token = null;
    await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    })
      .then(response => {
        // console.log(email + password);
        if (response.status === 200) {
          console.log(response.data);
          // response.json();
          token = response.status.toString();
          AsyncStorage.setItem('token', token);
          // console.log(response.data.toString());
          dispatch({
            type: 'LOGIN',
            payload: token,
          });
        }
        // console.log(JSON.stringify(response.status));
      })
      .then(data => {
        // console.log(data);
      })
      .catch(err => {
        console.log(err + 'NO');
      });
    // fetch(`${BASE_URL}/user`)
    //   .then(response => {
    //     console.log(response.status.toString());
    //   })
    //   .then(data => console.log(data.JSON()))
    //   .catch(error => console.log(error));
  };
};
//     // let res = await axios.post(BASE_URL, {
//     //   email: 'admin@test.com',
//     //   password: 'Admin123',
//     // });

//     // console.log(res.data);
//     // fetch('https://jsonplaceholder.typicode.com/posts', {
//     //   // Adding method type
//     //   method: 'POST',

//     //   // Adding body or contents to send
//     //   body: JSON.stringify({
//     //     title: 'Quang',
//     //     body: 'hahaha',
//     //     userId: 1,
//     //   }),

//     //   // Adding headers to the request
//     //   headers: {
//     //     'Content-type': 'application/json; charset=UTF-8',
//     //   },
//     // })
//     //   .then(response => response.json())

//     //   // Displaying results to console
//     //   .then(json => console.log(json));
//     // await fetch(`${BASE_URL}`)
//     //   .then(response => console.log(response.json()))
//     //   .then(data => console.log(data))
//     //   .catch(err => {
//     //     console.log(err + 'NO');
//     //   });
//     // // await AsyncStorage.setItem('token', token);
//     // console.log('token stored');
//     // console.log(res);
//     // await fetch
//     //   .post(`${BASE_URL}/Tourist`, {
//     //     // username,
//     //     // password,
//     //   })
//     //   .then(res => {
//     //     let userinfo = res.data;
//     //     console.log(userinfo);
//     //     token = userinfo;
//     //     AsyncStorage.setItem('token', token);
//     //     console.log('token stored');
//     //   });
//     // console.log(token + 'y');
//     // dispatch({
//     //   type: 'LOGIN',
//     //   payload: token,
//     // });
//   };
// };

export const Logout = () => {
  return async dispatch => {
    await AsyncStorage.clear();
    dispatch({
      type: 'LOGOUT',
    });
  };
};

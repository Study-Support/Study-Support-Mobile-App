import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {useEffect, useRef, useState} from 'react';
// import axios from 'axios';
const BASE_URL =
  'https://e149-117-2-255-218.ap.ngrok.io/api/v1';
// const BASE_URL1 = 'http://127.0.0.1:8000/api/v1';
export const Init = () => {
  return async dispatch => {
    let token = await AsyncStorage.getItem('token');
    let id = await AsyncStorage.getItem('id');
    if (token !== null) {
      // console.log(token);
      dispatch({
        type: 'LOGIN',
        payload: token,
        id: id,
      });
      await dispatch(GetFaculitys(token));
      await dispatch(GetInfoUser(token));
    }
  };
};

export const Login = (username, password) => {
  let token = null;
  return async dispatch => {
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
      .then(response => response.json())
      .then(async data => {
        // console.log(data);
        var result = [];
        for (var i in data) {
          result.push([i, data[i]]);
        }
        // console.log(result);
        var rs = result[1];
        var rs1 = Object.values(rs[1]);
        // console.log(rs1);
        for (var i in rs1) {
          if (i != 0) {
            if (i == 1) {
              var id = `${Object.values(rs1[i])[0]}`;
              // console.log(id);
              await AsyncStorage.setItem('id', `${id}`);
            } else {
              token = Object.values(rs1[i])[1];
              // console.log(token);
              // console.log(token.type);
              await AsyncStorage.setItem('token', `${token}`);
              // GetAllClients(token);
              dispatch({
                type: 'LOGIN',
                payload: token,
                id: id,
              });
              await dispatch(GetFaculitys(token));
              await dispatch(GetInfoUser(token));
            }
          }
        }
      })
      .catch(err => {
        console.log(err + 'NO');
      });
  };
};
export const Register = account => {
  // let token = null;
  return async dispatch => {
    await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email: account.email,
        password: account.password,
        confirm_password: account.confirm_password,
        full_name: account.full_name,
        phone_number: account.phone_number,
        birthday: account.birthday,
        gender: account.gender,
        faculty_id: account.faculty_id,
        address: account.address,
      }),
    })
      .then(response => {
        if (response.status === 200) {
          console.log('Đăng kí Thành Công !');
          dispatch(Login(account.email, account.password));
          return response.json();
        } else {
          console.log(response);
        }
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err + 'NO');
      });
  };
};
export const GetInfoUser = token => {
  // console.log(`Bearer ${token}`);
  const myHeaders = new Headers({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
  return async dispatch => {
    {
      await fetch(`${BASE_URL}/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            console.log(response.status.toString());
            return response.json();
          }
        })
        .then(response => {
          // console.log(response.data);
          // setUsersData(response.data);
          // console.log(usersData);
          dispatch({
            type: 'GetUserDetail',
            user: response.data,
          });
          return response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
};
export const UpdateUser = async user => {
  // console.log(user);
  // console.log(user);
  // const dispatch = useDispatch();
  let token = await AsyncStorage.getItem('token');
  // console.log(user.gender === 0 ? false : true);
  await fetch(`${BASE_URL}/user/edit`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      phone_number: user.phone_number,
      address: user.address,
      birthday: user.birthday,
      gender: true,
      full_name: user.full_name,
      avatar_url: null,
      faculty_id: user.faculty_id,
    }),
  })
    .then(async response => {
      if (response.status === 200) {
        console.log('Update Thành Công!');
        await GetFaculitys(token);
        await GetInfoUser(token);
        return response.json();
      } else {
        console.log(response.status.toString());
        return response.json();
      }
    })
    .then(data => {
      console.log(data.meta);
    })
    .catch(err => {
      console.log(err + 'NO');
    });
};
export const UpdatePassWord = async user => {
  let token = await AsyncStorage.getItem('token');
  await fetch(`${BASE_URL}/user/edit`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      current_password: user.current_password,
      password: user.password,
      confirm_password: user.confirm_password,
    }),
  })
    .then(response => {
      if (response.status === 200) {
        console.log('Update Pass Thành Công!');
        return response.json();
      } else {
        console.log(response.status.toString());
        return response.json();
      }
    })
    .then(data => {
      console.log(data.meta);
    })
    .catch(err => {
      console.log(err + 'NO');
    });
};
export const GetFaculitys = token => {
  const myHeaders = new Headers({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
  return async dispatch => {
    {
      await fetch(`${BASE_URL}/faculties`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            console.log(response.status.toString());
            return response.json();
          }
        })
        .then(response => {
          // console.log(response.data.data);
          // setUsersData(response.data);
          // console.log(usersData);
          dispatch({
            type: 'GetFaculties',
            faculties: response.data.data,
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
};
export const Logout = () => {
  return async dispatch => {
    await fetch(`${BASE_URL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then(response => {
        console.log(response.status);
        if (response.status === 200) {
          console.log('Logout Thành Công!');
        }
      })
      .catch(err => {
        console.log(err + 'NO');
      });
    await AsyncStorage.clear();
    dispatch({
      type: 'LOGOUT',
    });
  };
};

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {useEffect, useRef, useState} from 'react';
// import axios from 'axios';
import BASE_URL from '../config';
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
export const Creatgroups = async info => {
  let token = await AsyncStorage.getItem('token');
  console.log(info);
  await fetch(`${BASE_URL}/groups`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      confirm: info.confirm,
      faculty_id: info.faculty_id,
      information: info.information,
      location_study: info.location_study,
      self_study: info.self_study,
      subject_id: info.subject_id,
      survey_questions: info.survey_questions,
      time_study: info.time_study,
      topic: info.topic,
      image_url: info.image_url,
    }),
  })
    .then(response => {
      if (response.status === 200) {
        console.log('Đăng kí tạo nhóm Thành Công !');
        alert('Đăng kí tạo nhóm Thành Công !');
        return response.json();
      } else {
        alert('Đăng kí tạo nhóm Thất Bại !');
        console.log(response);
        return response.json();
      }
    })
    .then(response => {
      console.log(response.meta);
    })
    .catch(err => {
      console.log(err + 'NO');
    });
};
export const Updategroups = async info => {
  console.log(info);
  let token = await AsyncStorage.getItem('token');
  await fetch(`${BASE_URL}/groups/${info.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      confirm: info.confirm,
      faculty_id: info.faculty_id,
      information: info.information,
      location_study: info.location_study,
      self_study: info.self_study,
      subject_id: info.subject_id,
      survey_questions: info.survey_questions,
      time_study: info.time_study,
      topic: info.topic,
      image_url: info.image_url,
    }),
  })
    .then(response => {
      if (response.status === 200) {
        alert('Update tạo nhóm Thành Công!');
        return response.json();
      } else {
        alert('Đăng kí tạo nhóm Thất Bại!');
        return response.json();
      }
    })
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err + 'NO');
    });
};
export const DeleteMentor = async id => {
  let token = await AsyncStorage.getItem('token');
  await fetch(`${BASE_URL}/mentor/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => {
      if (response.status === 200) {
        // console.log('Delete đăng kí nhóm Thành Công !');
        alert('Xóa Đăng Kí Làm Mentor Thành Công !');
        return response.json();
      } else {
        console.log(response);
        return response.json();
      }
    })
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err + 'NO');
    });
};
export const Deletegroups = async id => {
  let token = await AsyncStorage.getItem('token');
  await fetch(`${BASE_URL}/groups/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => {
      if (response.status === 200) {
        console.log('Delete đăng kí nhóm Thành Công !');
        return response.json();
      } else {
        console.log(response);
        return response.json();
      }
    })
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err + 'NO');
    });
};
export const Groupjoin = async info => {
  let token = await AsyncStorage.getItem('token');
  // console.log(token);
  return async dispatch => {
    await fetch(`${BASE_URL}/groups/idgroups/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        answers: info.answers,
      }),
    })
      .then(response => {
        if (response.status === 200) {
          console.log('Tham gia group chờ đợi duyệt');
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
export const UpdateGroupjoin = async info => {
  let token = await AsyncStorage.getItem('token');
  console.log(token);
  return async dispatch => {
    await fetch(`${BASE_URL}/groups/idgroups/join`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        answers: info.answers,
      }),
    })
      .then(response => {
        if (response.status === 200) {
          console.log('Sửa tham gia thành công !');
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
export const DeleteGroupJoin = async id => {
  let token = await AsyncStorage.getItem('token');
  console.log(token);
  await fetch(`${BASE_URL}/groups/${id}/join`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => {
      if (response.status === 200) {
        console.log('Xóa Đăng kí Tham gia thành công !');
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

export const Register = account => {
  // let token = null;
  console.log(account);
  return async dispatch => {
    await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(account),
    })
      .then(response => {
        if (response.status === 200) {
          console.log('Đăng kí Thành Công !');
          dispatch(Login(account.email, account.password));
          return response.json();
        } else {
          console.log(response.status);
        }
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err + 'NO');
      });
  };
};
export const GetInfoUser = token => {
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
          console.log(response);
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
  console.log('aa');
  console.log(user.avatar_url);
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
      gender: user.gender,
      full_name: user.full_name,
      avatar_url: user.avatar_url,
      faculty_id: user.faculty_id,
    }),
  })
    .then(async response => {
      if (response.status === 200) {
        console.log('Update Thành Công!');
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
  await fetch(`${BASE_URL}/user/password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      current_password: user.current_password,
      password: user.password,
      password_confirmation: user.password_confirmation,
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
          return response.data.data;
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

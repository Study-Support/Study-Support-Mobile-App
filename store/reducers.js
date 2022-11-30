const initialState = {
  authToken: null,
  idUser: null,
  userDetail: null,
  getFaculties: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state, //copy all previous states
        authToken: action.payload,
        idUser: action.id,
      };
    case 'LOGOUT':
      return {
        authToken: null,
        idUser: null,
        userDetail: null,
        GetFaculties: null,
      };
    case 'GetUserDetail':
      return {
        ...state,
        userDetail: action.user,
      };
    case 'GetFaculties':
      return {
        ...state,
        getFaculties: action.faculties,
      };
    default:
      return state;
  }
};

const initialState = {
  authToken: null,
  idUser: null,
  userDetail: null,
  getFaculties: null,
  subjects: null,
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
        subjects: null,
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
    case 'GetSubjects':
      return {
        ...state,
        subjects: action.subject,
      };
    default:
      return state;
  }
};

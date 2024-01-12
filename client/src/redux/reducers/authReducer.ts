import { AuthActionTypes, SIGNUP_SUCCESS, LOGIN_SUCCESS, LOGOUT } from '../actions/types';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  userId: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  userId: null,
};

const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        isAuthenticated: true,
        token: action.payload.token,
        userId: action.payload.userId,
      };
    case LOGOUT:
      return {
        isAuthenticated: false,
        token: null,
        userId: null,
      };
    default:
      return state;
  }
};

export default authReducer;

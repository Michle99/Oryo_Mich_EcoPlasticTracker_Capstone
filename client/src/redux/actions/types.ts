// src/redux/actions/types.ts
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

interface SignupSuccessAction {
  type: typeof SIGNUP_SUCCESS;
  payload: { token: string; userId: string };
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: { token: string; userId: string };
}

interface LogoutAction {
  type: typeof LOGOUT;
}

export type AuthActionTypes = SignupSuccessAction | LoginSuccessAction | LogoutAction;

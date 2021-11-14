import {Action} from "@ngrx/store";

export const SIGNUP_START = '[Auth] sign up start';
export const AUTHENTICATE_SUCCESS = '[Auth]  Authenticate success';
export const AUTO_LOGIN = '[Auth] Auto login';
export const AUTHENTICATE_START = '[Auth] Authenticate start';
export const AUTHENTICATE_FAIL = '[Auth] Authenticate fail';
export const LOGOUT = '[Auth] Logout';
export const CLEAR_ERROR = '[Auth] Clear error';

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;

  constructor(
    public payload: {
      email: string,
      userId: string,
      token: string,
      expirationDate: Date,
      redirect: boolean
    }) {
  }
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class AuthenticateStart implements Action {
  readonly type = AUTHENTICATE_START;

  constructor(public payload: { email: string, password: string }) {
  }
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;

  constructor(public payload: string) {
  }
}

export class SignUpStart implements Action {
  readonly type = SIGNUP_START;

  constructor(public payload: { email: string, password: string }) {
  }
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export type AuthActions =
  AuthenticateSuccess
  | AutoLogin
  | Logout
  | AuthenticateStart
  | AuthenticateFail
  | SignUpStart
  | ClearError;

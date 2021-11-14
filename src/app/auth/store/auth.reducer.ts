import {User} from "../user.model";
import * as AuthActions from "./auth.action";

export interface State {
  user: User
  authError: string
  loading: boolean
}

const initialState: State = {
  user: null,
  authError: null,
  loading: null
}

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      const payload = action.payload;
      const user = new User(
        payload.email,
        payload.userId,
        payload.token,
        payload.expirationDate)
      return {
        ...state,
        user,
        authError: null,
        loading: false
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
        loading: false
      };
    case AuthActions.AUTHENTICATE_START:
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        user: null,
        authError: null,
        loading: true
      };
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null,
      };
    default:
      return state

  }

}

import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import * as fromAppReducer from "../store/app.reducer";
import * as AuthActions from "./store/auth.action";

@Injectable({providedIn: 'root'})
export class AuthService {

  private tokenExpirationTimer;

  constructor(private store: Store<fromAppReducer.AppState>) {
  }

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
  }

  clearLogoutTime() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
}

import {Actions, createEffect, ofType} from '@ngrx/effects'
import * as AuthActions from './auth.action'
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {AuthService} from "../auth.service";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {User} from "../user.model";

export interface AuthResponseData {
  email: string;
  localId: string;
  idToken: string;
  refreshToken: string;
  expiresIn: string;
  registered?: boolean;
}

const handleAuthentification = (expiresIn: string, email: string, localId: string, idToken: string) => {
  const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
  const user = new User(email, localId, idToken, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));

  return new AuthActions.AuthenticateSuccess({
    email: email,
    userId: localId,
    token: idToken,
    expirationDate,
    redirect: true
  });
};

const handleError = (errorRes) => {
  console.log(errorRes)
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exist already.';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
      break;
  }
  return of(new AuthActions.AuthenticateFail(errorMessage));
}

@Injectable()
export class AuthEffects {
  private readonly loginUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + environment.firebaseApiKey;
  private readonly signUpUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + environment.firebaseApiKey;

  constructor(private actions: Actions,
              private http: HttpClient,
              private router: Router,
              private authService: AuthService,
  ) {
  }


  authLogin = createEffect(() => {
    return this.actions
      .pipe(ofType(AuthActions.AUTHENTICATE_START),
        switchMap((authData: AuthActions.AuthenticateStart) => {
          console.log('login')
          return this.http.post<AuthResponseData>(this.loginUrl, {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          }).pipe(
            tap(resData => {
              this.authService.setLogoutTimer(+resData.expiresIn * 1000)
            }),
            map(resData => {
              const {expiresIn, email, localId, idToken} = resData;
              return handleAuthentification(expiresIn, email, localId, idToken)
            }),
            catchError(errorRes => {
              return handleError(errorRes)
            }));
        }));
  });

  authRedirect = createEffect(() => this.actions.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
        if (authSuccessAction.payload.redirect) {
          this.router.navigate(['/'])
        }
      }
    )), {dispatch: false});

  signupStart = createEffect(() => this.actions.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((authData: AuthActions.SignUpStart) => {
      const {email, password} = authData.payload;
      return this.http.post<AuthResponseData>(this.signUpUrl, {
        email,
        password,
        returnSecureToken: true
      }).pipe(
        tap(resData => {
          this.authService.setLogoutTimer(+resData.expiresIn * 1000)
        }),
        map(resData => {
          const {expiresIn, email, localId, idToken} = resData;
          return handleAuthentification(expiresIn, email, localId, idToken)
        }),
        catchError(errorRes => {
          return handleError(errorRes)
        }))
    })));

  authLogout = this.actions.pipe(ofType(AuthActions.LOGOUT),
    tap(() => {
      this.authService.clearLogoutTime();
      this.router.navigate(['/auth']);
      localStorage.removeItem('userData');
    }))

  authAutoLogin = this.actions.pipe(ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string;
        id: string;
        token: string;
        tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return {type: 'DUMMY'};
      }
      const {email, id, token, tokenExpirationDate} = userData;
      const loadedUser = new User(email, id, token, new Date(tokenExpirationDate));

      if (loadedUser.token) {
        const expirationDuration = new Date(userData.tokenExpirationDate).getTime() - new Date().getTime();
        this.authService.setLogoutTimer(expirationDuration);
        return new AuthActions.AuthenticateSuccess({
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userData.tokenExpirationDate),
          redirect: false
        })
      }
      return {type: 'DUMMY'}
    }));
}

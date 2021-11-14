import {Component, OnInit} from '@angular/core';
import * as AuthActions from '../app/auth/store/auth.action';
import * as fromApp from '../app/store/app.reducer';
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new AuthActions.AutoLogin());
    this.store.dispatch(new AuthActions.Logout());
  }

}

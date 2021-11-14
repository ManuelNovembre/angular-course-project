import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from "rxjs";
import * as fromApp from "../store/app.reducer";
import * as AuthActions from "../auth/store/auth.action";
import * as RecipesActions from "../recipes/store/recipe.action";
import {Store} from "@ngrx/store";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private router: Router,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.userSub = this.store.select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(user => {
        this.isAuthenticated = !!user;
      });
  }

  onSaveData() {
    this.store.dispatch(new RecipesActions.StoreRecipes())
  }

  onFetchData() {
    this.store.dispatch(new RecipesActions.FetchRecipes())
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}

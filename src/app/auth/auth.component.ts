import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AlertComponent} from "../shared/alert/alert.component";
import {PlaceholderDirective} from "../shared/placeholder/placeholder.directive";
import {Store} from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as AuthActions from "../auth/store/auth.action";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, {static: false})
  alertHost: PlaceholderDirective;
  private storeSub: Subscription;
  private closeSub: Subscription;


  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private router: Router,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.storeSub = this.store.select('auth')
      .subscribe(authState => {
        this.isLoading = authState.loading;
        this.error = authState.authError;
      })
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    const email = authForm.value.email
    const password = authForm.value.password
    if (this.isLoginMode) {
      this.store.dispatch(new AuthActions.AuthenticateStart({email, password}));
    } else {
      this.store.dispatch(new AuthActions.SignUpStart({email, password}));
    }
    this.isLoading = true;
    authForm.resetForm();
  }

  onHandleError() {
    this.store.dispatch(new AuthActions.ClearError())
  }

  private showErrorAlert(errorMessage: string) {
    let alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const alertComponentRef = hostViewContainerRef.createComponent(alertComponentFactory);
    alertComponentRef.instance.message = errorMessage;
    this.closeSub = alertComponentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}

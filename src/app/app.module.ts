import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {HttpClientModule} from "@angular/common/http";
import {CoreModule} from "./core.module";
import {SharedModule} from "./shared/shared.module";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {StoreRouterConnectingModule} from "@ngrx/router-store";
import * as fromApp from './store/app.reducer';
import {AuthEffects} from "./auth/store/auth.effects";
import {environment} from "../environments/environment";
import {RecipeEffect} from "./recipes/store/recipe.effect";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, RecipeEffect]),
    StoreDevtoolsModule.instrument({logOnly: environment.production}),
    StoreRouterConnectingModule.forRoot()
  ],
  bootstrap: [AppComponent],
  // entryComponents:[
  //   AlertComponent
  // ]
})
export class AppModule {
}

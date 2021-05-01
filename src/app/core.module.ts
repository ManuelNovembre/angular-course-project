import {NgModule} from "@angular/core";
import {ShoppingService} from "./shopping-list/shopping.service";
import {RecipesService} from "./recipes/recipes.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";

@NgModule({
  providers: [
    ShoppingService,
    RecipesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule {

}

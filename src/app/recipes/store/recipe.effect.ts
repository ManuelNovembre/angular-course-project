import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as RecipesActions from "../store/recipe.action";
import {map, switchMap, tap, withLatestFrom} from "rxjs/operators";
import {Recipe} from "../recipe.model";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import * as fromApp from "../../store/app.reducer";
import {Store} from "@ngrx/store";

@Injectable()
export class RecipeEffect {

  private url = 'https://my-food-app-8cd7d-default-rtdb.firebaseio.com/recipes.json';


  constructor(private actions: Actions,
              private httpClient: HttpClient,
              private store: Store<fromApp.AppState>,) {
  }

  fetchRecipes = createEffect(() => this.actions.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.httpClient.get<Recipe[]>(this.url)
    }),
    map(recipes => {
      recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
      return new RecipesActions.SetRecipes(recipes)
    })));

  storeRecipes = createEffect(() => this.actions.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipesState]) => {
      return this.httpClient.put(this.url, recipesState.recipes)
    })), {dispatch: false});
}

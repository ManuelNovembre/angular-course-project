import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipesService} from "../recipes/recipes.service";
import {Recipe} from "../recipes/recipe.model";
import {map, tap} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";

@Injectable({providedIn: "root"})
export class DataStorageService {


  constructor(private httpClient: HttpClient,
              private recipeService: RecipesService,
              private authService: AuthService) {
  }

  private url = 'https://my-food-app-8cd7d-default-rtdb.firebaseio.com/recipes.json';

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.httpClient.put(this.url, recipes)
      .subscribe(response => {
        console.log(response);
      })
  }

  fetchRecipes() {
    return this.httpClient.get<Recipe[]>(this.url)
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        }));
  }
}

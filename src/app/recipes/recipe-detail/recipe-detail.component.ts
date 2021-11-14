import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Recipe} from '../recipe.model';
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import {map, switchMap} from "rxjs/operators";
import * as RecipesActions from "../store/recipe.action";
import * as ShoppingListAction from "../../shopping-list/store/shopping-list.actions";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})

export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor(private route: ActivatedRoute,
              private store: Store<fromApp.AppState>,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe(map((params: Params) => {
          return +params['id'];
        }),
        switchMap(id => {
          this.id = id;
          return this.store.select('recipes')
        }),
        map(recipesState => recipesState.recipes.find((recipe, index) => {
          return index === this.id;
        })))
      .subscribe(recipe => {
        this.recipe = recipe;
      });
  }

  onAddIngredientToShoppingList() {
    this.store.dispatch(new ShoppingListAction.AddIngredients(this.recipe.ingredients))
  }

  onEditRecipe() {
    this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipesActions.DeleteRecipes(this.id));
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}

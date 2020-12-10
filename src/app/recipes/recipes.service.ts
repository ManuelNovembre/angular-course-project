import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { ShoppingService } from '../shopping-list/shopping.service';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class RecipesService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe('dombwé',
               'plat antillais',
               'https://www.bellemartinique.com/wp-content/uploads/2018/08/dombre-lentilles-recette-antillaise-martinique.jpg',
               [
                  new Ingredient('haricot rouge', 100),
                  new Ingredient('porc', 2),
                  new Ingredient('farine', 100)
               ]),
    new Recipe('Columbo',
               'plat antillais',
               'https://i2.wp.com/www.cookme-shop.com/blog/wp-content/uploads/2018/01/colombo-de-poulet.jpg?fit=1200%2C630&ssl=1',
               [
                 new Ingredient('poulet', 3),
                 new Ingredient('massalé', 200),
                 new Ingredient('pomme de terre', 5)
               ])
  ]
  constructor(private shoppingService: ShoppingService) { }

  getRecipes() {
    return this.recipes.slice(); //get a recipes copy
  }

  addIngredientToShoppingList(ingredients: Ingredient[]){
      for(var ingredient of ingredients) {
        this.shoppingService.addIngredient(ingredient);
      }
   };

}

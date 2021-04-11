import {EventEmitter} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';

import {Subject} from 'rxjs';

export class ShoppingService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>()
  private ingredients: Ingredient[] = [
    new Ingredient('haricot rouge', 300),
    new Ingredient('farine', 300)
  ];

  getIngredients() {
    return this.ingredients.slice(); //get a recipes copy
  }

  getIngredient(index: number) {
    return this.ingredients[index]; //get a recipes copy
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredients: Ingredient) {
    this.ingredients[index] = newIngredients;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}

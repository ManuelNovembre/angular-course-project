import {Action} from "@ngrx/store";
import {Ingredient} from "../../shared/ingredient.model";

export const ADD_INGREDIENT = '[Shopping list] Add ingredient'
export const ADD_INGREDIENTS = '[Shopping list] ADD INGREDIENTS'
export const UPDATE_INGREDIENTS = '[Shopping list] Update ingredients'
export const DELETE_INGREDIENT = '[Shopping list] Delete ingredient'
export const START_EDIT = '[Shopping list] Start edit'
export const STOP_EDIT = '[Shopping list] Stop edit'

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;

  constructor(public payload: Ingredient) {
  }
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;

  constructor(public payload: Ingredient[]) {
  }
}

export class UpdateIngredients implements Action {
  readonly type = UPDATE_INGREDIENTS;

  constructor(public payload: Ingredient) {
  }
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
}

export class StartEdit implements Action {
  readonly type = START_EDIT;

  constructor(public index: number) {
  }
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT;

  constructor() {
  }
}

export type ShoppingListActions =
  AddIngredient
  | AddIngredients
  | UpdateIngredients
  | DeleteIngredient
  | StartEdit
  | StopEdit
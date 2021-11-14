import {Action} from "@ngrx/store";
import {Recipe} from "../recipe.model";

export const SET_RECIPES = '[RECIPES] Set recipes';
export const FETCH_RECIPES = '[RECIPES] Fetch recipes';
export const STORE_RECIPES = '[RECIPES] Store recipes';
export const ADD_RECIPES = '[RECIPES] Add recipes';
export const UPDATE_RECIPES = '[RECIPES] Update recipes';
export const DELETE_RECIPES = '[RECIPES] Delete recipes';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {
  }
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;

  constructor() {
  }
}

export class StoreRecipes implements Action {
  readonly type = STORE_RECIPES;

  constructor() {
  }
}

export class AddRecipes implements Action {
  readonly type = ADD_RECIPES;

  constructor(public payload: Recipe) {
  }
}

export class UpdateRecipes implements Action {
  readonly type = UPDATE_RECIPES;

  constructor(public payload: { index: number, newRecipe: Recipe }) {
  }
}

export class DeleteRecipes implements Action {
  readonly type = DELETE_RECIPES;

  constructor(public payload: number) {
  }
}

export type RecipesActions =
  SetRecipes
  | FetchRecipes
  | AddRecipes
  | UpdateRecipes
  | DeleteRecipes
  | StoreRecipes;

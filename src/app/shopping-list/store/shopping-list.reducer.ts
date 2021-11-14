import {Ingredient} from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient,
  editedIngredientIndex: number
}


const initialState: State = {
  ingredients: [
    new Ingredient('haricot rouge', 300),
    new Ingredient('farine', 300)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(state: State = initialState,
                                    action: ShoppingListActions.ShoppingListActions) : State {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };

    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };

    case ShoppingListActions.UPDATE_INGREDIENTS:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload
      }
      const updatedIngredients = [...state.ingredients]
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null
      };

    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ingredient, index) => index !== state.editedIngredientIndex),
        editedIngredient: null,
        editedIngredientIndex: -1,
      };

    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: state.editedIngredientIndex,
        editedIngredient: {...state.ingredients[state.editedIngredientIndex]}
      };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };
    default:
      return state;
  }
}

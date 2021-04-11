import { Ingredient } from '../shared/ingredient.model'

export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[]

  constructor(public _name : string, public _description : string, public _imagePath : string, public _ingredients: Ingredient[]) {
    this.name = _name;
    this.description = _description;
    this.imagePath = _imagePath;
    this.ingredients = _ingredients;
  }

}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('dombwé','plat antillais','https://www.bellemartinique.com/wp-content/uploads/2018/08/dombre-lentilles-recette-antillaise-martinique.jpg'),
    new Recipe('TEST','plat antillais','https://www.bellemartinique.com/wp-content/uploads/2018/08/dombre-lentilles-recette-antillaise-martinique.jpg')
  ]
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe){
    this.recipeWasSelected.emit(recipe);
  }
}

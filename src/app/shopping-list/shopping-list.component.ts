import {Component, OnInit} from '@angular/core';

import {Ingredient} from '../shared/ingredient.model';
import {Observable} from 'rxjs';
import {Store} from "@ngrx/store";
import * as ShoppingListActions from "./store/shopping-list.actions";
import * as fromApp from '../store/app.reducer';
import {map} from "rxjs/operators";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})

export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList')
      .pipe(map( shoppingListState => {
        return {ingredients: shoppingListState.ingredients};
      }));
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index))
  }
}

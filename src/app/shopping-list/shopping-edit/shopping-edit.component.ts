import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  ElementRef, OnDestroy
} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingService} from '../shopping.service';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {element} from "protractor";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})

export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f')
  slForm: NgForm
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  private editedItem
    : Ingredient;

  constructor(private shoppingService: ShoppingService) {
  }

  ngOnInit(): void {
    this.subscription = this.shoppingService.startedEditing
      .subscribe((index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      })
  }

  onSubmitItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingService.addIngredient(newIngredient);
    }
    this.editMode = false;
    this.slForm.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClearIngredient() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDeleteIngredient() {
    this.shoppingService.deleteIngredient(this.editedItemIndex);
    this.onClearIngredient();
  }
}

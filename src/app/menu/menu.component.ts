import { Component, OnInit } from '@angular/core';
import { Dish } from '../shares/dish';
import { DISHES } from '../shares/dishes'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {

  dishes = DISHES;
  selectedDish: Dish | undefined;


  
  constructor() { }

  ngOnInit(): void {

  }

  onSelect(dish : Dish) {
    this.selectedDish = dish;
  }

}

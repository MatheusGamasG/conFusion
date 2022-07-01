import { Injectable } from '@angular/core';
import { Dish } from '../shares/dish';
import { DISHES } from '../shares/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes() : Dish[] {
    return DISHES;
  }
}

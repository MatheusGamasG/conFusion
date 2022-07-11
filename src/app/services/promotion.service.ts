import { Injectable } from '@angular/core';
import { Promotion } from '../shares/promotion';
import { PROMOTIONS } from '../shares/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions() : Promise<Promotion[]> {
    return Promise.resolve(PROMOTIONS);
  }

  getPromotion(id: string) : Promise<Promotion> {
    return Promise.resolve(PROMOTIONS.filter((promo) => ( promo.id === id ) )[0]);
  }

  getFeaturedPromotion() : Promise<Promotion> {
    return Promise.resolve(PROMOTIONS.filter( (promo) => promo.featured )[0]);
  }
}

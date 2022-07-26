import { Injectable } from '@angular/core';
import { Promotion } from '../shares/promotion';
import { PROMOTIONS } from '../shares/promotions';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shares/baseurl';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http : HttpClient) { }

  getPromotions() : Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotions');
  }

  getPromotion(id: string) : Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions/' + id);
  }

  getFeaturedPromotion() : Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions?featured=true')
      .pipe(map(promotions => promotions[0]));
  }
}

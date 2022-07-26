import { Component, Inject, OnInit } from '@angular/core';
import { Dish } from '../shares/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shares/promotion';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shares/leader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish : Dish | undefined;
  dishErrMess:string;
  promotion : Promotion | undefined;
  leader : Leader | undefined;

  constructor(private dishService : DishService,
    private promoService : PromotionService,
    private leaderService : LeaderService,
    @Inject('BaseURL') public BaseURL) { }

  ngOnInit(): void {
    this.dishService.getFeaturedDish()
      .subscribe((featuredDish) => {
        this.dish = featuredDish;
      }, errmess => this.dishErrMess = <any>errmess);
      
    this.promoService.getFeaturedPromotion()
      .subscribe((promotion) => {
        this.promotion = promotion;
      });
    this.leaderService.getFeaturedLeader()
      .subscribe((leader) => {
        this.leader = leader;
      });
  }

}

import { Component, OnInit } from '@angular/core';
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
  promotion : Promotion | undefined;
  leader : Leader | undefined;

  constructor(private dishService : DishService,
    private promoService : PromotionService,
    private leaderService : LeaderService) { }

  ngOnInit(): void {
    this.dish = this.dishService.getFeaturedDish();
    this.promotion = this.promoService.getFeaturedPromotion();
    this.leader = this.leaderService.getFeaturedLeader();
  }

}

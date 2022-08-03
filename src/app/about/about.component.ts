import { Component, Inject, OnInit } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shares/leader';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style' : 'display: block'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {

  leaders : Leader[] | undefined;
  leadersErrMess:string;

  constructor(private leaderService : LeaderService,
    @Inject('BaseURL') public BaseURL) { }

  ngOnInit(): void {
    this.leaderService.getLeaders()
      .subscribe((leaders) => {
        this.leaders = leaders;
      }, errmess => this.leadersErrMess = <any>errmess);
  }

}

import { Injectable } from '@angular/core';
import { Leader } from '../shares/leader';
import { LEADERS } from '../shares/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders() : Promise<Leader[]> {
    return Promise.resolve(LEADERS);
  }

  getLeader(id : string) : Promise<Leader> {
    return Promise.resolve(LEADERS.filter((leader) => leader.id === id)[0]);
  }

  getFeaturedLeader() : Promise<Leader> {
    return Promise.resolve(LEADERS.filter(leader => leader.featured === true)[0]);
  }
}

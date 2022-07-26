import { Injectable } from '@angular/core';
import { Leader } from '../shares/leader';
import { LEADERS } from '../shares/leaders';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shares/baseurl';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http : HttpClient) { }

  getLeaders() : Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'leadership');
  }

  getLeader(id : string) : Observable<Leader> {
    return this.http.get<Leader>(baseURL + 'leadership/' + id);
  }

  getFeaturedLeader() : Observable<Leader> {
    return this.http.get<Leader>(baseURL + 'leadership?featured=true')
    .pipe(map(leaders => leaders[0])) ;
  }
}

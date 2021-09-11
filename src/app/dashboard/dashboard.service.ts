import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Odds } from './odds.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  private fetchedOdds : Odds[] = []
  constructor(private http: HttpClient) { }


  fetchOdds() : Observable<Odds[]> {
    return this.http.get<Odds[]>('http://localhost:3000/api/odd');
  }

  fetchSelections() : Observable<any> {
    return this.http.get('http://localhost:3000/api/odd/test')
  }
}

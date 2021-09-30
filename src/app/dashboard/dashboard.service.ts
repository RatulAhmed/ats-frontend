import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Odds } from './odds.model';
import { UserSelection } from './user-selection.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private fetchedOdds : Odds[] = []

  constructor(private http: HttpClient) { }


  submitChoices(selections: UserSelection[]) : Observable<any> {
    return this.http.post(environment.api +'/api/userChoice', selections);
  }

  fetchOdds() : Observable<Odds[]> {
    return this.http.get<Odds[]>(environment.api +'/api/odd');
  }

  fetchSelections() : Observable<any> {
    return this.http.get(environment.api +'/api/userChoice/' +
    localStorage.getItem('userId'));
  }
}

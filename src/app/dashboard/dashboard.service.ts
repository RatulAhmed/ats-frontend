import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Odds } from './odds.model';
import { UserSelection } from './user-selection.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private fetchedOdds : Odds[] = []

  constructor(private http: HttpClient) { }


  submitChoices(selections: UserSelection[]) : Observable<any> {
    console.log(selections);
    return this.http.post('https://ats-backend-gtv4m.ondigitalocean.app/api/userChoice', selections);
  }

  fetchOdds() : Observable<Odds[]> {
    return this.http.get<Odds[]>('https://ats-backend-gtv4m.ondigitalocean.app/api/odd');
  }

  fetchSelections() : Observable<any> {
    return this.http.get('https://ats-backend-gtv4m.ondigitalocean.app/api/odd/' +
    localStorage.getItem('userId'));
  }
}

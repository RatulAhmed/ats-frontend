import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

import { Odds } from './odds.model';

const ELEMENT_DATA: Odds[] = [
  // {week: 1, homeTeam: 'CAR Panthers',homeSpread:'-5.5', awayTeam: 'NY Jets', awaySpread: '+5.5'}
  // {week: 1, homeTeam: 'BUF Bills',homeSpread:'-6.5', awayTeam: 'PIT Steelers', awaySpread: '+6.5'},
  // {week: 1, homeTeam: 'DET Lions',homeSpread:'+7', awayTeam: 'SF 49ers', awaySpread: '-7'},
  // {week: 1, homeTeam: 'HOU Texans', homeSpread:'+3',awayTeam: 'JAX Jaguars', awaySpread: '-3'},
  // {week: 1, homeTeam: 'IND Colts', homeSpread:'+2.5',awayTeam: 'SEA Seahawks', awaySpread: '+2.5'},
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['home_team', 'home_spread', 'away_team', 'away_spread', 'selections'];
  dataSource = ELEMENT_DATA;
  selections : any[] = [];

  constructor(public dashboardService : DashboardService) { }

  ngOnInit(): void {
    this.getOdds();
    this.getSelections();
  }

  getOdds() {
    this.dashboardService.fetchOdds()
      .subscribe(res => {
        this.dataSource = res;
      })
    }

    getSelections() {
      this.dashboardService.fetchSelections()
        .subscribe(res => {
          console.log(res);

          for(let i = 0; i < this.dataSource.length; i++) {
            for(let j = 0; j < res.length; j++){
              if(this.dataSource[i].id === res[j].odd_id) {
                this.dataSource[i].selection = res[j].selection;
              }
            }
          }
          console.log(this.dataSource);

        })
    }

    onSubmit() {
    }

    onSelect(value: any) {

      console.log(value);
    }
  }

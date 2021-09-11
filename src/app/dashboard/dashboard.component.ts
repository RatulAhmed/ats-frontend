import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
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

  selectedValue : string = 'No Selection';
  displayedColumns: string[] = ['home_team', 'home_spread', 'away_team', 'away_spread', 'selections'];
  dataSource = ELEMENT_DATA;
  selections : string[] = [];

  constructor(public dashboardService : DashboardService) { }

  ngOnInit(): void {
    this.getOdds();
  }

  getOdds() {
    this.dashboardService.fetchOdds()
      .subscribe(res => {
        console.log(res);
        this.dataSource = res;
      })
    }

    onSubmit() {
    }

    onSelect(elementId: number, selectValue: string) {

      console.log(elementId);
    }
  }

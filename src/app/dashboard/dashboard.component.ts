import { Component, OnInit } from '@angular/core';

export interface Odds {
  week: number;
  homeTeam: string;
  homeSpread: string;
  awayTeam: string;
  awaySpread: string;
  selection: { homeTeam: string, awayTeam: string}
}

const ELEMENT_DATA: Odds[] = [
  {week: 1, homeTeam: 'TB Buccaneers', homeSpread:'-7.5', awayTeam: 'DAL Cowboys', awaySpread: '+7.5', selection: {homeTeam: 'home', awayTeam: 'away'}},
  // {week: 1, homeTeam: 'CAR Panthers',homeSpread:'-5.5', awayTeam: 'NY Jets', awaySpread: '+5.5'},
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

  displayedColumns: string[] = ['week', 'homeTeam', 'homeSpread', 'awayTeam', 'awaySpread','selection' ];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}

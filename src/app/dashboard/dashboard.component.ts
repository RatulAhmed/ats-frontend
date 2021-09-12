import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from './dashboard.service';

import { Odds } from './odds.model';
import { UserSelection } from './user-selection.model';

const ELEMENT_DATA: Odds[] = [];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['home_team', 'home_spread', 'away_team', 'away_spread', 'selections'];
  dataSource = ELEMENT_DATA;
  selections : UserSelection[] = [];

  constructor(public dashboardService : DashboardService, public router : Router) { }

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
          for(let i = 0; i < this.dataSource.length; i++) {
            for(let j = 0; j < res.length; j++){
              if(this.dataSource[i].id === res[j].odd_id) {
                this.dataSource[i].selection = res[j].selection;
              }
            }
          }
        })
    }

    onSubmit() {
      this.dashboardService.submitChoices(this.selections)
        .subscribe(res => {
          console.log(res);
        })
      this.selections = [];
    }

    onSelect(value: string, oddId: number) {
      // create a request json of objects that have
      // userId: oddid, selection
      let newSelection = <UserSelection>{};
      newSelection.user_id = localStorage.getItem('userId');
      newSelection.odd_id = oddId;
      newSelection.selection = value;

      if(value === 'No Selection') {
        newSelection.selection = null;
      }
      // TODO this will push literally all selections - maybe update
      //  the ones that currently exists - still works e2e however
      this.selections.push(newSelection);
    }
  }

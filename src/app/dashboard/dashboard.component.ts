import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DashboardService } from './dashboard.service';
import { Odds } from './odds.model';
import { UserSelection } from './user-selection.model';

const ELEMENT_DATA: Odds[] = [];
const maxPicks = 5;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['home_team', 'home_spread', 'away_team', 'away_spread', 'selections'];
  dataSource = ELEMENT_DATA;
  selections : UserSelection[] = [];
  isLoading: boolean = true;
  currentNumPicks : number = 0;


  constructor(public dashboardService : DashboardService, public router : Router, private snackbar:MatSnackBar) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.getOdds();
  }

  getOdds() {
    this.dashboardService.fetchOdds()
      .subscribe(res => {
        this.dataSource = res;
        this.getSelections();
      })
    }

     getSelections() {
      this.dashboardService.fetchSelections()
        .subscribe(res => {
          this.currentNumPicks = res.length;
          this.selections = res;
          for(let i = 0; i < this.dataSource.length; i++) {
            for(let j = 0; j < res.length; j++){
              if(this.dataSource[i].id === res[j].odd_id) {
                this.dataSource[i].selection = res[j].selection;
              }
            }
          }
          this.isLoading = false;
        })
    }

    onSubmit() {
      if(this.currentNumPicks > 5) {
        alert('You have Selected ' + this.currentNumPicks + ' selections. Please select 5');
        return;
      }
      this.dashboardService.submitChoices(this.selections)
        .subscribe(res => {
          console.log(res.message);
          this.snackbar.open(res.message, 'Dismiss', {
            duration:3000,
            verticalPosition: 'top'
          });
        })
    }

    onSelect(selection: string, oddId: number) {
      // create a request json of objects that have
      // userId: oddid, selection
      let prevSelected = false;
      let newSelection = <UserSelection>{};
      newSelection.user_id = localStorage.getItem('userId');
      newSelection.odd_id = oddId;
      newSelection.selection = selection;

      this.selections.some(i => {
        if(i.odd_id === newSelection.odd_id) { // this means it exists already so update

            //if the current selection is no selection and we switch to something else we increment
            if(i.selection === 'No Selection' && newSelection.selection != 'No Selection')
            {
              this.currentNumPicks += 1
            }

            i.selection = newSelection.selection;
            if(i.selection === 'No Selection') { this.decrementNumPicks() }
            prevSelected = true;
            return;
        }
      })

      if(prevSelected) { return; }

      // We should decrement unless this doesn't exist yet which is covered above
      if(selection === 'No Selection') {
        newSelection.selection = 'No Selection';
      }
      else {
        this.selections.push(newSelection);
        this.currentNumPicks += 1;
      }
    }

    private decrementNumPicks() {
      this.currentNumPicks -= 1;
      if(this.currentNumPicks < 0) {
        this.currentNumPicks = 0;
      }
    }

  }

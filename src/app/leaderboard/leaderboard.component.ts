import { Component, OnInit } from '@angular/core';
import { LeaderboardService } from './leaderboard.service';
import { Scores }  from './scores.model'

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  displayedColumns: string[] = ['username', 'score'];
  data : Scores[] = [];
  isLoading: boolean = true;


  constructor(public leaderboardService : LeaderboardService) { }

  ngOnInit(): void {
    this.leaderboardService.getScores()
      .subscribe(res => {
          this.data = res;
      })
  }
}

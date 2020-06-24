import { Component, OnInit, ViewChild } from '@angular/core';
import { MatchService } from 'src/app/shared/match.service';
import { TeamService } from 'src/app/shared/team.service';
import { Match } from 'src/app/shared/match.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-basketballmatches',
  templateUrl: './basketballmatches.component.html',
  styleUrls: ['./basketballmatches.component.css']
})
export class BasketballmatchesComponent implements OnInit {

  constructor(private service: MatchService,
    private teamService: TeamService) { }

  // Data arrays.
  teams: any;
  matches: Match[];
  listData: MatTableDataSource<any>;

  // Date variables.
  currentSelectedDate: Date = new Date();
  currentSelectedDateString: string;

  width: number;

  // Table variables.
  displayedColumns: string[] = ['Time', 'TeamNames', 'FirstQuarterScore', 'SecondQuarterScore', 'ThirdQuarterScore', 'FourthQuarterScore', 'FinalScore'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    // Setting current date string.
    this.currentSelectedDateString = this.currentSelectedDate.getDate()
      + '.'
      + (this.currentSelectedDate.getMonth() + 1)
      + '. '
      + this.service.dayOfWeek(this.currentSelectedDate.getDay());

    // Basketball ID = 2.
    this.teamService.getTeamsBySport(2).pipe(
      concatMap(
        res => {
          this.teams = res;

          // Get basketball (sport ID is 2) matches for today (dateDifference is 0).
          return this.service.getMatchesBySportByDateDifference(2, 0);
        }
      )
    ).subscribe(
      list => {
        let array = list.map(
          item => {
            return {
              Time: ("0" + new Date(item.Date).getHours()).slice(-2) + ':' + ("0" + new Date(item.Date).getMinutes()).slice(-2),
              HomeTeam: item.HomeTeam?.Name,
              AwayTeam: item.AwayTeam?.Name,
              FirstQuarterHomeTeamScore: item.BasketballMatchComponents?.FirstQuarterHomeTeamScore == null ? '' : item.BasketballMatchComponents.FirstQuarterHomeTeamScore,
              FirstQuarterAwayTeamScore: item.BasketballMatchComponents?.FirstQuarterAwayTeamScore == null ? '' : item.BasketballMatchComponents.FirstQuarterAwayTeamScore,
              SecondQuarterHomeTeamScore: item.BasketballMatchComponents?.SecondQuarterHomeTeamScore == null ? '' : item.BasketballMatchComponents.SecondQuarterHomeTeamScore,
              SecondQuarterAwayTeamScore: item.BasketballMatchComponents?.SecondQuarterAwayTeamScore == null ? '' : item.BasketballMatchComponents.SecondQuarterAwayTeamScore,
              ThirdQuarterHomeTeamScore: item.BasketballMatchComponents?.ThirdQuarterHomeTeamScore == null ? '' : item.BasketballMatchComponents.ThirdQuarterHomeTeamScore,
              ThirdQuarterAwayTeamScore: item.BasketballMatchComponents?.ThirdQuarterAwayTeamScore == null ? '' : item.BasketballMatchComponents.ThirdQuarterAwayTeamScore,
              FourthQuarterHomeTeamScore: item.BasketballMatchComponents?.FourthQuarterHomeTeamScore == null ? '' : item.BasketballMatchComponents.FourthQuarterHomeTeamScore,
              FourthQuarterAwayTeamScore: item.BasketballMatchComponents?.FourthQuarterAwayTeamScore == null ? '' : item.BasketballMatchComponents.FourthQuarterAwayTeamScore,
              FinalHomeTeamScore: item.BasketballMatchComponents.FirstQuarterHomeTeamScore
                + item.BasketballMatchComponents.SecondQuarterHomeTeamScore
                + item.BasketballMatchComponents.ThirdQuarterHomeTeamScore
                + item.BasketballMatchComponents.FourthQuarterHomeTeamScore,
              FinalAwayTeamScore: item.BasketballMatchComponents.FirstQuarterAwayTeamScore
                + item.BasketballMatchComponents.SecondQuarterAwayTeamScore
                + item.BasketballMatchComponents.ThirdQuarterAwayTeamScore
                + item.BasketballMatchComponents.FourthQuarterAwayTeamScore
            };
          });

        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      },
      err => {
        console.log(err);
      }
    );
  }

  reduceDate() {
    this.currentSelectedDate.setDate(this.currentSelectedDate.getDate() - 1);
    this.updateCurrentDateString();

    this.updateTable();
  }

  increaseDate() {
    this.currentSelectedDate.setDate(this.currentSelectedDate.getDate() + 1);
    this.updateCurrentDateString();

    this.updateTable();
  }

  updateCurrentDateString() {
    this.currentSelectedDateString = this.currentSelectedDate.getDate()
      + '.'
      + (this.currentSelectedDate.getMonth() + 1)
      + '. '
      + this.service.dayOfWeek(this.currentSelectedDate.getDay());
  }

  updateTable() {
    let currentDate = new Date();
    let differenceInTime = this.currentSelectedDate.getTime() - currentDate.getTime();
    let differenceInDays = Math.round((differenceInTime / (1000 * 3600 * 24)));

    // Get basketball matches for selected date.
    this.service.getMatchesBySportByDateDifference(2, differenceInDays)
      .subscribe(
        list => {
          let array = list.map(item => {
            return {
              Time: ("0" + new Date(item.Date).getHours()).slice(-2) + ':' + ("0" + new Date(item.Date).getMinutes()).slice(-2),
              HomeTeam: item.HomeTeam?.Name,
              AwayTeam: item.AwayTeam?.Name,
              FirstQuarterHomeTeamScore: item.BasketballMatchComponents?.FirstQuarterHomeTeamScore == null ? '' : item.BasketballMatchComponents.FirstQuarterHomeTeamScore,
              FirstQuarterAwayTeamScore: item.BasketballMatchComponents?.FirstQuarterAwayTeamScore == null ? '' : item.BasketballMatchComponents.FirstQuarterAwayTeamScore,
              SecondQuarterHomeTeamScore: item.BasketballMatchComponents?.SecondQuarterHomeTeamScore == null ? '' : item.BasketballMatchComponents.SecondQuarterHomeTeamScore,
              SecondQuarterAwayTeamScore: item.BasketballMatchComponents?.SecondQuarterAwayTeamScore == null ? '' : item.BasketballMatchComponents.SecondQuarterAwayTeamScore,
              ThirdQuarterHomeTeamScore: item.BasketballMatchComponents?.ThirdQuarterHomeTeamScore == null ? '' : item.BasketballMatchComponents.ThirdQuarterHomeTeamScore,
              ThirdQuarterAwayTeamScore: item.BasketballMatchComponents?.ThirdQuarterAwayTeamScore == null ? '' : item.BasketballMatchComponents.ThirdQuarterAwayTeamScore,
              FourthQuarterHomeTeamScore: item.BasketballMatchComponents?.FourthQuarterHomeTeamScore == null ? '' : item.BasketballMatchComponents.FourthQuarterHomeTeamScore,
              FourthQuarterAwayTeamScore: item.BasketballMatchComponents?.FourthQuarterAwayTeamScore == null ? '' : item.BasketballMatchComponents.FourthQuarterAwayTeamScore,
              FinalHomeTeamScore: (item.BasketballMatchComponents?.FirstQuarterHomeTeamScore
                + item.BasketballMatchComponents?.SecondQuarterHomeTeamScore
                + item.BasketballMatchComponents?.ThirdQuarterHomeTeamScore
                + item.BasketballMatchComponents?.FourthQuarterHomeTeamScore),
              FinalAwayTeamScore: item.BasketballMatchComponents?.FirstQuarterAwayTeamScore
                + item.BasketballMatchComponents?.SecondQuarterAwayTeamScore
                + item.BasketballMatchComponents?.ThirdQuarterAwayTeamScore
                + item.BasketballMatchComponents?.FourthQuarterAwayTeamScore
            };
          });

          this.listData = new MatTableDataSource(array);
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;
        }
      );
  }

  onSearchClear() {
    this.searchKey = "";
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
}

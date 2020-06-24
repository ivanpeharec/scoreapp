import { Component, OnInit, ViewChild } from '@angular/core';
import { MatchService } from 'src/app/shared/match.service';
import { TeamService } from 'src/app/shared/team.service';
import { Match } from 'src/app/shared/match.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-icehockeymatches',
  templateUrl: './icehockeymatches.component.html',
  styleUrls: ['./icehockeymatches.component.css']
})
export class IcehockeymatchesComponent implements OnInit {

  constructor(private service: MatchService,
    private teamService: TeamService) { }

  // Data arrays.
  teams: any;
  matches: Match[];
  listData: MatTableDataSource<any>;

  // Date variables.
  currentSelectedDate: Date = new Date();
  currentSelectedDateString: string;

  // Table variables.
  displayedColumns: string[] = ['Time', 'TeamNames', 'FirstPeriodScore', 'SecondPeriodScore', 'ThirdPeriodScore', 'FinalScore'];
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

    // Ice hockey ID = 5.
    this.teamService.getTeamsBySport(5).pipe(
      concatMap(
        res => {
          this.teams = res;

          // Get ice hockey (sport ID is 5) matches for today (dateDifference is 0).
          return this.service.getMatchesBySportByDateDifference(5, 0);
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
              FirstPeriodHomeTeamScore: item.IceHockeyMatchComponents?.FirstPeriodHomeTeamScore == null ? '' : item.IceHockeyMatchComponents.FirstPeriodHomeTeamScore,
              FirstPeriodAwayTeamScore: item.IceHockeyMatchComponents?.FirstPeriodAwayTeamScore == null ? '' : item.IceHockeyMatchComponents.FirstPeriodAwayTeamScore,
              SecondPeriodHomeTeamScore: item.IceHockeyMatchComponents?.SecondPeriodHomeTeamScore == null ? '' : item.IceHockeyMatchComponents.SecondPeriodHomeTeamScore,
              SecondPeriodAwayTeamScore: item.IceHockeyMatchComponents?.SecondPeriodAwayTeamScore == null ? '' : item.IceHockeyMatchComponents.SecondPeriodAwayTeamScore,
              ThirdPeriodHomeTeamScore: item.IceHockeyMatchComponents?.ThirdPeriodHomeTeamScore == null ? '' : item.IceHockeyMatchComponents.ThirdPeriodHomeTeamScore,
              ThirdPeriodAwayTeamScore: item.IceHockeyMatchComponents?.ThirdPeriodAwayTeamScore == null ? '' : item.IceHockeyMatchComponents.ThirdPeriodAwayTeamScore,
              FinalHomeTeamScore: item.IceHockeyMatchComponents?.FirstPeriodHomeTeamScore
                + item.IceHockeyMatchComponents?.SecondPeriodHomeTeamScore
                + item.IceHockeyMatchComponents?.ThirdPeriodHomeTeamScore,
              FinalAwayTeamScore: item.IceHockeyMatchComponents?.FirstPeriodAwayTeamScore
                + item.IceHockeyMatchComponents?.SecondPeriodAwayTeamScore
                + item.IceHockeyMatchComponents?.ThirdPeriodAwayTeamScore
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

    // Get ice hockey matches for selected date.
    this.service.getMatchesBySportByDateDifference(5, differenceInDays)
      .subscribe(
        list => {
          let array = list.map(item => {
            return {
              Time: ("0" + new Date(item.Date).getHours()).slice(-2) + ':' + ("0" + new Date(item.Date).getMinutes()).slice(-2),
              HomeTeam: item.HomeTeam?.Name,
              AwayTeam: item.AwayTeam?.Name,
              FirstPeriodHomeTeamScore: item.IceHockeyMatchComponents?.FirstPeriodHomeTeamScore == null ? '' : item.IceHockeyMatchComponents.FirstPeriodHomeTeamScore,
              FirstPeriodAwayTeamScore: item.IceHockeyMatchComponents?.FirstPeriodAwayTeamScore == null ? '' : item.IceHockeyMatchComponents.FirstPeriodAwayTeamScore,
              SecondPeriodHomeTeamScore: item.IceHockeyMatchComponents?.SecondPeriodHomeTeamScore == null ? '' : item.IceHockeyMatchComponents.SecondPeriodHomeTeamScore,
              SecondPeriodAwayTeamScore: item.IceHockeyMatchComponents?.SecondPeriodAwayTeamScore == null ? '' : item.IceHockeyMatchComponents.SecondPeriodAwayTeamScore,
              ThirdPeriodHomeTeamScore: item.IceHockeyMatchComponents?.ThirdPeriodHomeTeamScore == null ? '' : item.IceHockeyMatchComponents.ThirdPeriodHomeTeamScore,
              ThirdPeriodAwayTeamScore: item.IceHockeyMatchComponents?.ThirdPeriodAwayTeamScore == null ? '' : item.IceHockeyMatchComponents.ThirdPeriodAwayTeamScore,
              FinalHomeTeamScore: (item.IceHockeyMatchComponents.FirstPeriodHomeTeamScore
                + item.IceHockeyMatchComponents.SecondPeriodHomeTeamScore
                + item.IceHockeyMatchComponents.ThirdPeriodHomeTeamScore),
              FinalAwayTeamScore: item.IceHockeyMatchComponents.FirstPeriodAwayTeamScore
                + item.IceHockeyMatchComponents.SecondPeriodAwayTeamScore
                + item.IceHockeyMatchComponents.ThirdPeriodAwayTeamScore
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

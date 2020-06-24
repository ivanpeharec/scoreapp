import { Component, OnInit, ViewChild } from '@angular/core';
import { MatchService } from 'src/app/shared/match.service';
import { TeamService } from 'src/app/shared/team.service';
import { Match } from 'src/app/shared/match.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-footballmatches',
  templateUrl: './footballmatches.component.html',
  styleUrls: ['./footballmatches.component.css']
})
export class FootballmatchesComponent implements OnInit {

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
  displayedColumns: string[] = ['Time', 'HomeTeam', 'HomeTeamScore', 'DashCell', 'AwayTeamScore', 'AwayTeam', 'HalfTimeScore'];
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

    // Football ID = 1.
    this.teamService.getTeamsBySport(1)
      .subscribe(
        res => {
          this.teams = res;
        },
        err => {
          console.log(err);
        },
        () =>
          // Get football (sport ID is 1) matches for today (dateDifference is 0).
          this.service.getMatchesBySportByDateDifference(1, 0)
            .subscribe(
              list => {
                let array = list.map(item => {
                  return {
                    Time: ("0" + new Date(item.Date).getHours()).slice(-2) + ':' + ("0" + new Date(item.Date).getMinutes()).slice(-2),
                    HomeTeam: item.HomeTeam.Name,
                    AwayTeam: item.AwayTeam.Name,
                    HomeTeamScore: item.FootballMatchComponents?.HomeTeamScore == null ? '' : item.FootballMatchComponents?.HomeTeamScore,
                    AwayTeamScore: item.FootballMatchComponents?.AwayTeamScore == null ? '' : item.FootballMatchComponents?.AwayTeamScore,
                    HalfTimeScore: (item.FootballMatchComponents?.HalfTimeHomeTeamScore == null ? '' : item.FootballMatchComponents?.HalfTimeHomeTeamScore).toString() 
                    + ' - ' 
                    + (item.FootballMatchComponents?.HalfTimeAwayTeamScore == null ? '' : item.FootballMatchComponents?.HalfTimeAwayTeamScore).toString()
                  };
                });

                this.listData = new MatTableDataSource(array);
                this.listData.sort = this.sort;
                this.listData.paginator = this.paginator;
              },
              err => {
                console.log(err);
              }
            )
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

    // Get football matches for selected date.
    this.service.getMatchesBySportByDateDifference(1, differenceInDays)
      .subscribe(
        list => {
          let array = list.map(item => {
            return {
              Time: ("0" + new Date(item.Date).getHours()).slice(-2) + ':' + ("0" + new Date(item.Date).getMinutes()).slice(-2),
              HomeTeam: item.HomeTeam.Name,
              AwayTeam: item.AwayTeam.Name,
              HomeTeamScore: item.FootballMatchComponents?.HomeTeamScore == null ? '' : item.FootballMatchComponents?.HomeTeamScore,
              AwayTeamScore: item.FootballMatchComponents?.AwayTeamScore == null ? '' : item.FootballMatchComponents?.AwayTeamScore,
              HalfTimeScore: (item.FootballMatchComponents?.HalfTimeHomeTeamScore == null ? '' : item.FootballMatchComponents?.HalfTimeHomeTeamScore).toString()
                + ' - '
                + (item.FootballMatchComponents?.HalfTimeAwayTeamScore == null ? '' : item.FootballMatchComponents?.HalfTimeAwayTeamScore).toString()
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

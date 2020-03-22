import { Component, OnInit, ViewChild } from '@angular/core';
import { MatchService } from 'src/app/shared/match.service';
import { TeamService } from 'src/app/shared/team.service';
import { UserService } from 'src/app/shared/user.service';
import { Match } from 'src/app/shared/match.model';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

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
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    // Setting current date string.
    this.currentSelectedDateString = this.currentSelectedDate.getDate() + '.' + (this.currentSelectedDate.getMonth() + 1) + '. ' + this.dayOfWeek(this.currentSelectedDate.getDay());

    // Data retreive.
    this.teamService.refreshList();

    // Football ID = 1
    this.teamService.getTeamsBySport(1)
      .subscribe(
        res => {
          this.teams = res;
        },
        err => { },
        () => this.service.getMatchesByDateDifference(0)
          .subscribe(
            list => {
              let array = list.map(item => {
                return {
                  Time: ("0" + new Date(item.Date).getHours()).slice(-2) + ':' + ("0" + new Date(item.Date).getMinutes()).slice(-2),
                  HomeTeam: this.getTeamName(item.HomeTeamID),
                  AwayTeam: this.getTeamName(item.AwayTeamID),
                  HomeTeamScore: item.HomeTeamScore == null ? '' : item.HomeTeamScore,
                  AwayTeamScore: item.AwayTeamScore == null ? '' : item.AwayTeamScore,
                  HalfTimeScore: (item.HalfTimeHomeTeamScore == null ? '' : item.HalfTimeHomeTeamScore).toString() + ' - ' + (item.HalfTimeAwayTeamScore == null ? '' : item.HalfTimeAwayTeamScore).toString()
                };
              });

              this.listData = new MatTableDataSource(array);
              this.listData.sort = this.sort;
              this.listData.paginator = this.paginator;
            }
          )
      );
  }

  getTeamName(id: number) {
    return this.teams.find(item => item.ID === id).Name;
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

  dayOfWeek(dayNumber) {
    return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dayNumber];
  }

  updateCurrentDateString() {
    this.currentSelectedDateString = this.currentSelectedDate.getDate() + '.' + this.currentSelectedDate.getMonth() + '. ' + this.dayOfWeek(this.currentSelectedDate.getDay());
  }

  updateTable() {
    let currentDate = new Date();
    let differenceInTime = this.currentSelectedDate.getTime() - currentDate.getTime();
    let differenceInDays = Math.round((differenceInTime / (1000 * 3600 * 24)));

    this.service.getMatchesByDateDifference(differenceInDays)
      .subscribe(
        list => {
          let array = list.map(item => {
            return {
              Time: ("0" + new Date(item.Date).getHours()).slice(-2) + ':' + ("0" + new Date(item.Date).getMinutes()).slice(-2),
              HomeTeam: this.getTeamName(item.HomeTeamID),
              AwayTeam: this.getTeamName(item.AwayTeamID),
              HomeTeamScore: item.HomeTeamScore == null ? '' : item.HomeTeamScore,
              AwayTeamScore: item.AwayTeamScore == null ? '' : item.AwayTeamScore,
              HalfTimeScore: (item.HalfTimeHomeTeamScore == null ? '' : item.HalfTimeHomeTeamScore).toString() + ' - ' + (item.HalfTimeAwayTeamScore == null ? '' : item.HalfTimeAwayTeamScore).toString()
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

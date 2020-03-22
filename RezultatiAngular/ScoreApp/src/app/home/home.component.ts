import { Component, OnInit, ViewChild } from '@angular/core';
import { MatchService } from '../shared/match.service';
import { TeamService } from '../shared/team.service';
import { Match } from '../shared/match.model';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: MatchService,
    private teamService: TeamService) { }

  teams: any;
  matches: Match[];
  listData: MatTableDataSource<any>;

  displayedColumns: string[] = ['Time', 'HomeTeam', 'HomeTeamScore', 'DashCell', 'AwayTeamScore', 'AwayTeam', 'HalfTimeScore'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    this.service.refreshList();
    this.teamService.refreshList();

    this.teamService.getTeams()
      .subscribe(
        res => {
          this.teams = res;
        },
        err => { },
        () => this.service.getTodaysMatches()
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

  isToday(match: Match) {
    let today = new Date();
    let date = new Date(match.Date);
    return date.getDate() == today.getDate() &&
      date.getMonth() == today.getMonth() &&
      date.getFullYear() == today.getFullYear();
  }

  todayMatchesExist() {
    let today = new Date();
    let exists = false;
    for (let match of this.service.list) {
      let date = new Date(match.Date);
      if (date.getDate() == today.getDate() &&
        date.getMonth() == today.getMonth() &&
        date.getFullYear() == today.getFullYear()) {
        exists = true;
      }
    }
    return exists;
  }

  onSearchClear() {
    this.searchKey = "";
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
}

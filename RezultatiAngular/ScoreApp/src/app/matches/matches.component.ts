import { Component, OnInit, ViewChild } from '@angular/core';
import { MatchService } from '../shared/match.service';
import { ToastrService } from 'ngx-toastr';
import { TeamService } from '../shared/team.service';
import { UserService } from '../shared/user.service';
import { DialogService } from '../shared/dialog.service';
import { Match } from '../shared/match.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  constructor(private service: MatchService,
    private teamService: TeamService,
    private userService: UserService,
    private toastr: ToastrService,
    private dialogService: DialogService) { }

  // Data arrays.
  teams: any;
  matches: Match[];
  listData: MatTableDataSource<any>;

  // Date variables.
  currentSelectedDate: Date = new Date();
  currentSelectedDateString: string;

  // Table variables.
  displayedColumns: string[] = ['Time', 'HomeTeam', 'DashCell', 'AwayTeam', 'EditOrDelete'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    // Setting current date string.
    this.currentSelectedDateString = this.currentSelectedDate.getDate() + '.' + (this.currentSelectedDate.getMonth() + 1) + '. ' + this.dayOfWeek(this.currentSelectedDate.getDay());

    // Data retreive.
    this.teamService.refreshList();
    this.teamService.getTeams()
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
                  ID: item.ID,
                  Time: ("0" + new Date(item.Date).getHours()).slice(-2) + ':' + ("0" + new Date(item.Date).getMinutes()).slice(-2),
                  HomeTeam: this.getTeamName(item.HomeTeamID),
                  AwayTeam: this.getTeamName(item.AwayTeamID)
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

  onDelete(matchID) {
    this.dialogService
      .openConfirmDialog('Are you sure you want to delete this match?')
      .afterClosed()
      .pipe(
        concatMap(
          res => {
            if (res) {
              return this.service.deleteMatch(matchID);
            }

            return of(res);
          }
        )
      ).subscribe(
        deleted => {
          if (deleted) {
            const index = this.listData.data.findIndex(obj => obj.ID == matchID);
            this.listData.data.splice(index, 1);
            this.listData._updateChangeSubscription();
            this.toastr.success('Deleted successfully!');
          }
        },
        err => {
          console.log(err);
          this.toastr.error('Deleting failed!');
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

  dayOfWeek(dayNumber) {
    return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dayNumber];
  }

  updateCurrentDateString() {
    this.currentSelectedDateString = this.currentSelectedDate.getDate()
      + '.'
      + (this.currentSelectedDate.getMonth() + 1)
      + '. '
      + this.dayOfWeek(this.currentSelectedDate.getDay());
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
              ID: item.ID,
              Time: ("0" + new Date(item.Date).getHours()).slice(-2) + ':' + ("0" + new Date(item.Date).getMinutes()).slice(-2),
              HomeTeam: this.getTeamName(item.HomeTeamID),
              AwayTeam: this.getTeamName(item.AwayTeamID)
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

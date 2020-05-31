import { Component, OnInit, ViewChild } from '@angular/core';
import { TeamService } from '../shared/team.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../shared/user.service';
import { Team } from '../shared/team.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from '../shared/dialog.service';
import { concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})

export class TeamsComponent implements OnInit {

  constructor(public service: TeamService,
    private userService: UserService,
    private toastr: ToastrService,
    private dialogService: DialogService) {
    this.service.getAllAttachments();
  }

  listData: MatTableDataSource<Team>;

  displayedColumns: string[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    // Only users with admin role should be able to see edit and delete buttons.
    if (this.userService.isAdmin()) {
      this.displayedColumns = ['Name', 'Edit', 'Delete'];
    }
    else {
      this.displayedColumns = ['Name'];
    }

    this.service.refreshList();

    this.service.getTeams()
      .subscribe(
        list => {
          let array = list.map(
            item => {
              return {
                Name: item.Name,
                ID: item.ID,
                SportID: item.SportID
              };
            });

          // Initializing the data source array.
          this.listData = new MatTableDataSource(array);
          // Making sorting case insensitive.
          this.listData.sortingDataAccessor = (data, sortHeaderID) => data[sortHeaderID].toLocaleLowerCase();
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;
        },
        err => {
          console.log(err);
        }
      )
  }

  onDelete(teamID) {
    this.dialogService
      .openConfirmDialog('Are you sure you want to delete this team?')
      .afterClosed()
      .pipe(
        concatMap(
          res => {
            if (res) {
              return this.service.deleteTeam(teamID);
            }

            return of(res);
          }
        )
      ).subscribe(
        deleted => {
          if (deleted) {
            const index = this.listData.data.findIndex(obj => obj.ID == teamID);
            this.listData.data.splice(index, 1);
            this.listData._updateChangeSubscription();
            this.toastr.success('Deleted successfully!');
          }
        },
        err => {
          console.log(err);
          this.toastr.error('Deleting failed!');
        }
      )
  }

  imageUrl(teamId: number) {
    let image = null;
    let imageLink = null;

    if (this.service.attachments.some(x => x.TeamID === teamId)) {
      image = this.service.attachments
        .filter(a => a.TeamID == teamId)
        .map(function (x) { return x.Image; });

      imageLink = 'https://localhost:44327/' + image;
    }

    return imageLink;
  }

  onSearchClear() {
    this.searchKey = "";
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
}

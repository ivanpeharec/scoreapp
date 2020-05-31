import { Component, OnInit, ViewChild } from '@angular/core';
import { CompetitionService } from '../shared/competition.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../shared/user.service';
import { Competition } from '../shared/competition.model';
import { DialogService } from '../shared/dialog.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit {

  constructor(private service: CompetitionService,
    private toastr: ToastrService,
    private userService: UserService,
    private dialogService: DialogService) { }

  listData: MatTableDataSource<Competition>;

  displayedColumns: string[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    if (this.userService.isAdmin()) {
      this.displayedColumns = ['Name', 'ChildrenEntityList', 'Edit', 'Delete'];
    }
    else {
      this.displayedColumns = ['Name', 'ChildrenEntityList'];
    }

    this.service.refreshList();

    this.service.getCompetitions()
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

          this.listData = new MatTableDataSource(array);
          // Makes sorting case insensitive.
          this.listData.sortingDataAccessor = (data, sortHeaderID) => data[sortHeaderID].toLocaleLowerCase();
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;
        },
        err => {
          console.log(err);
        }
      )
  }

  onDelete(competitionID) {
    this.dialogService
      .openConfirmDialog('Are you sure you want to delete this competition?')
      .afterClosed()
      .pipe(
        concatMap(
          res => {
            if (res) {
              return this.service.deleteCompetition(competitionID);
            }

            return of(res);
          }
        )
      ).subscribe(
        deleted => {
          if (deleted) {
            const index = this.listData.data.findIndex(obj => obj.ID == competitionID);
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

  onSearchClear() {
    this.searchKey = "";
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
}

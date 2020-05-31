import { Component, OnInit, ViewChild } from '@angular/core';
import { SportService } from 'src/app/shared/sport.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../shared/user.service';
import { Sport } from '../shared/sport.model';
import { Observable, of } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from '../shared/dialog.service';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css']
})
export class SportsComponent implements OnInit {

  constructor(public service: SportService,
    private toastr: ToastrService,
    private userService: UserService,
    private dialogService: DialogService) { }

  sports: Observable<Sport[]>;
  listData: MatTableDataSource<Sport>;

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

    this.service.getSports()
      .subscribe(
        list => {
          let array = list.map(
            item => {
              return {
                Name: item.Name,
                ID: item.ID
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

  onDelete(sportID) {
    this.dialogService
      .openConfirmDialog('Are you sure you want to delete this sport?')
      .afterClosed()
      .pipe(
        concatMap(
          res => {
            if (res) {
              return this.service.deleteSport(sportID);
            }

            return of(res);
          }
        )
      ).subscribe(
        deleted => {
          if (deleted) {
            const index = this.listData.data.findIndex(obj => obj.ID == sportID);
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

  onSearchClear() {
    this.searchKey = "";
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
}

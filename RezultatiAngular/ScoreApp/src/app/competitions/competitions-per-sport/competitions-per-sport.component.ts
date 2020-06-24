import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../shared/user.service';
import { Competition } from '../../shared/competition.model';
import { CompetitionService } from '../../shared/competition.service';
import { SportService } from '../../shared/sport.service';
import { Sport } from '../../shared/sport.model';

@Component({
  selector: 'app-competitions-per-sport',
  templateUrl: './competitions-per-sport.component.html',
  styleUrls: ['./competitions-per-sport.component.css']
})
export class CompetitionsPerSportComponent implements OnInit {
  loadComponent: boolean = false;
  sport = {
    ID: 0,
    Name: ''
  };

  listData: MatTableDataSource<Competition>;

  displayedColumns: string[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    public userService: UserService,
    private service: CompetitionService,
    private sportService: SportService) {
    route.params.subscribe(
      p => {
        if (+p['id'] > 0) {
          // Saves the competition ID from the route parameters.
          this.sport.ID = +p['id'];

          this.sportService.getSport(this.sport.ID)
            .subscribe(b => {
              this.sport = b as Sport;
            });
        }

        // Loading of the HTML code can begin.
        this.loadComponent = true;
      },
      err => {
        // Navigate to the not-found component.
        if (err.status == 404)
          this.router.navigate(['/not-found']);
      });
  }

  ngOnInit() {
    // Only users with admin role should be able to see edit and delete buttons.
    if (this.userService.isAdmin()) {
      this.displayedColumns = ['Name', 'ChildrenEntityList', 'Edit', 'Delete'];
    }
    else {
      this.displayedColumns = ['Name', 'ChildrenEntityList'];
    }

    this.service.getCompetitionsBySport(this.sport.ID)
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

  onSearchClear() {
    this.searchKey = "";
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../shared/team.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Team } from '../shared/team.model';
import { UserService } from '../shared/user.service';
import { Competition } from '../shared/competition.model';
import { CompetitionService } from '../shared/competition.service';

@Component({
  selector: 'app-teams-per-competition',
  templateUrl: './teams-per-competition.component.html',
  styleUrls: ['./teams-per-competition.component.css']
})
export class TeamsPerCompetitionComponent implements OnInit {
  loadComponent: boolean = false;
  competition = {
    ID: 0,
    Name: '',
    SportID: 0
  };

  listData: MatTableDataSource<Team>;

  displayedColumns: string[];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  searchKey: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private service: TeamService,
    private competitionService: CompetitionService) {
    route.params.subscribe(
      p => {
        if (+p['id'] > 0) {
          // Saves the competition ID from the route parameters.
          this.competition.ID = +p['id'];

          this.competitionService.getCompetition(this.competition.ID)
            .subscribe(b => {
              this.competition = b as Competition;
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

    this.service.getAllAttachments();
  }

  ngOnInit() {
    // Only users with admin role should be able to see edit and delete buttons.
    if (this.userService.isAdmin()) {
      this.displayedColumns = ['Name', 'Edit', 'Delete'];
    }
    else {
      this.displayedColumns = ['Name'];
    }

    this.service.getTeamsByCompetition(this.competition.ID)
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

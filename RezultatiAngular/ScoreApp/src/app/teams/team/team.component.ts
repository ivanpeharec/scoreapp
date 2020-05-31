import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TeamService } from 'src/app/shared/team.service';
import { SportService } from 'src/app/shared/sport.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Team } from 'src/app/shared/team.model';
import { NgForm } from '@angular/forms';
import { CompetitionService } from 'src/app/shared/competition.service';
import { Competition } from 'src/app/shared/competition.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  @ViewChild('labelImport')
  labelImport: ElementRef;

  team = {
    ID: 0,
    Name: '',
    SportID: 0
  };

  competitionTeam = {
    CompetitionID: 0,
    TeamID: 0,
    Active: true
  };

  imageLink: any = {
    imageLink: null
  };

  image: string = null;
  loadComponent = false;
  updateMode = false;
  imageLoaded = false;
  sports: any;
  competitions: any;
  possibleCompetitions: Competition[];
  fileUploaded = null;
  uploadedFile: string = null;

  constructor(public service: TeamService,
    private sportService: SportService,
    private competitionService: CompetitionService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router) {
    // Resets the form.
    this.service.form.reset();

    // Gets the route parameters. 
    this.route.params
      .subscribe(
        p => {
          if (+p['id'] > 0) {
            // Save the team ID from the route parameters.
            this.team.ID = +p['id'];

            // Sets the TeamID of the "Add to competition" form to the current ID.
            this.competitionTeam.TeamID = this.team.ID;

            // Used to load HTML parts that should be shown only when the user is updating the team.
            this.updateMode = true;
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
    console.log(this.service.getTeam(this.team.ID));
    if (this.team.ID > 0 && this.loadComponent == true) {
      this.service.competitionTeamForm.reset();
      this.imageLink = '';

      this.service.getTeam(this.team.ID)
        .subscribe(
          b => {
            this.team = b as Team;
            this.service.form.patchValue({
              ID: this.team.ID,
              Name: this.team.Name,
              SportID: this.team.SportID
            });

            this.service.competitionTeamForm.patchValue({
              TeamID: this.team.ID,
              Active: true
            });
          },
          err => { }
        );

      this.service.getImage(this.team.ID)
        .subscribe(
          res => {
            if (res != null) {
              this.imageLink = res;
              this.image = `https://localhost:44327/` + this.imageLink.imageLink;
              this.imageLoaded = true;
            }
          },
          err => {
            if (err.status == 404) {
              console.log("Image not found!");
            }
          });

      this.competitionService.getPossibleCompetitions(this.team.ID)
        .subscribe(c => {
          this.possibleCompetitions = c;
          this.loadComponent = true;
        });
    }
    else if (this.team.ID == 0) {
      this.loadComponent = true;
    }

    this.resetForm();
    this.service.refreshList();

    this.sportService.getSports()
      .subscribe(b => {
        this.sports = b;
      });

    this.competitionService.getCompetitions()
      .subscribe(b => {
        this.competitions = b;
      });
  }

  resetForm(form?: NgForm) {
    this.team = {
      ID: 0,
      Name: '',
      SportID: 0
    };
  }

  onSubmit(form: NgForm) {
    if (this.team.ID == 0) {
      this.insertRecord(form);
    }
    else {
      this.updateRecord(form);
    }
  }

  onSubmitCompetitionTeam(form: NgForm) {
    this.insertCompetitionTeamRecord();

    // Reset the form to remove validation errors.
    form.resetForm();
  }

  insertRecord(form: NgForm) {
    this.service.postTeam().subscribe(
      (res: any) => {
        this.toastr.success('Inserted successfully', this.team.Name);
        this.router.navigate(['/edit-team/' + res.ID]);
        this.competitionService.getPossibleCompetitions(res.ID)
          .subscribe(c => {
            this.possibleCompetitions = c;
          });
        // form.resetForm();
        this.service.refreshList();
      },
      err => {
        this.toastr.error('There was an error while inserting the team.', this.team.Name);
        console.log(err);
      }
    )
  }

  insertCompetitionTeamRecord() {
    this.service.postTeamToCompetition().subscribe(
      res => {
        this.toastr.success('Added successfully!');
        this.competitionService.getPossibleCompetitions(this.team.ID)
          .subscribe(
            res => {
              this.possibleCompetitions = res;
            },
            err => {
              console.log(err);
            }
          )
        this.service.competitionTeamForm.reset();
        this.service.competitionTeamForm.patchValue({
          TeamID: this.team.ID,
          Active: true
        });
        // this.router.navigate(['/edit-team/' + this.team.ID]);
      },
      err => {
        this.toastr.error('Failed!');
        console.log(err);
      }
    )
  }

  updateRecord(form: NgForm) {
    this.service.putTeam().subscribe(
      res => {
        this.toastr.success('Edited successfully', this.team.Name);
        this.service.refreshList();
      },
      err => {
        this.toastr.error('There was an error while editing this team.', this.team.Name);
        console.log(err);
      }
    )
  }

  fileInputChange(file) {
    if (file.length === 0) {
      this.fileUploaded = false;
    }
    else {
      this.fileUploaded = true;
      this.labelImport.nativeElement.innerText = <File>file[0].name;
    }
  }

  uploadFile(files) {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('uploadedFile', fileToUpload, fileToUpload.name);

    if (this.imageLink) {
      this.service.updateImagePath(formData, this.team.ID).subscribe(
        res => {
          this.toastr.success(fileToUpload.name, 'Logo updated successfully!');
          this.uploadedFile = '';
          this.fileUploaded = false;
          this.labelImport.nativeElement.innerText = 'Choose file...';
        },
        err => {
          this.toastr.error(fileToUpload.name, 'Logo failed to update!');
        }
      );
    }

    else {
      this.service.uploadImage(formData, this.team.ID).subscribe(
        (res: any) => {
          this.imageLink = res.dbPath;
          this.uploadedFile = '';
          this.fileUploaded = false;
          this.labelImport.nativeElement.innerText = 'Choose file...';
          this.toastr.success(fileToUpload.name, 'Image uploaded successfully!');
        },
        err => {
          this.toastr.error(fileToUpload.name, 'Image failed to upload!');
        }
      );
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { CompetitionService } from 'src/app/shared/competition.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { SportService } from 'src/app/shared/sport.service';
import { Competition } from 'src/app/shared/competition.model';
import { Sport } from 'src/app/shared/sport.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {

  competition = {
    ID: 0,
    Name: '',
    SportID: 0
  };

  sports: Sport[];

  constructor(public service: CompetitionService,
    private sportService: SportService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.service.form.reset();

    // Assign ID retrieved from route to the competition object.
    this.route.params
      .subscribe(
        p => {
          if (+p['id'] > 0) {
            this.competition.ID = +p['id'];
          }
        },
        err => {
          if (err.status == 404)
            this.router.navigate(['/competitions']);
        });

    // On edit - retrieve competition object by ID and update the form model values.
    if (this.competition.ID > 0) {
      this.service.getCompetition(this.competition.ID)
        .subscribe(b => {
          this.competition = b as Competition;

          this.service.form.patchValue({
            ID: this.competition.ID,
            Name: this.competition.Name,
            SportID: this.competition.SportID
          });
        });
    }

    // Retrieves all sports and stores them.
    this.sportService.getSports()
      .subscribe(
        b => {
          this.sports = b;
        });
  }

  onSubmit(form: NgForm) {
    if (this.competition.ID == 0) {
      this.insertRecord(form);
    }
    else {
      this.updateRecord();
    }
  }

  insertRecord(form: NgForm) {
    this.service.postCompetition()
      .subscribe(
        res => {
          this.toastr.success('Competition inserted successfully!', this.competition.Name);
          form.resetForm();
        },
        err => {
          this.toastr.error('There was an error while inserting the competition.', this.competition.Name);
          console.log(err);
        }
      )
  }

  updateRecord() {
    this.service.putCompetition().subscribe(
      res => {
        this.toastr.success('Edited successfully', this.competition.Name);
      },
      err => {
        this.toastr.error('There was an error while editing this competition.', this.competition.Name);
        console.log(err);
      }
    )
  }
}
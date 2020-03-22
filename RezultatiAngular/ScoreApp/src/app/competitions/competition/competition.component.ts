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

  loaded = false;
  sports: Sport[];

  constructor(private service: CompetitionService,
    private sportService: SportService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router) {

    this.service.form.reset();

    route.params.subscribe(p => {
      this.competition.ID = +p['id'];
    }, err => {
      if (err.status == 404)
        this.router.navigate(['/competitions']);
    });
  }

  ngOnInit() {
    if (this.competition.ID > 0) {
      this.service.getCompetition(this.competition.ID)
        .subscribe(b => {
          this.competition = b as Competition;

          this.service.form.patchValue({
            ID: this.competition.ID,
            Name: this.competition.Name,
            SportID: this.competition.SportID
          });

          this.loaded = true;
        });
    }
    else {
      this.loaded = true;
    }

    this.resetForm();
    this.service.refreshList();

    this.sportService.getSports()
      .subscribe(b => {
        this.sports = b;
      });
  }

  resetForm(form?: NgForm) {
    this.competition = {
      ID: 0,
      Name: '',
      SportID: 0
    };
  }

  onSubmit(form: NgForm) {
    if (this.competition.ID == 0) {
      this.insertRecord(form);
    }
    else {
      this.updateRecord(form);
    }
  }

  insertRecord(form: NgForm) {
    this.service.postCompetition().subscribe(
      res => {
        this.toastr.success('Inserted successfully', this.competition.Name);
        form.resetForm();
        this.service.refreshList();
      },
      err => {
        this.toastr.error('There was an error while inserting the competition.', this.competition.Name);
        console.log(err);
      }
    )
  }

  updateRecord(form: NgForm) {
    this.service.putCompetition().subscribe(
      res => {
        this.toastr.success('Edited successfully', this.competition.Name);
        this.service.refreshList();
      },
      err => {
        this.toastr.error('There was an error while editing this competition.', this.competition.Name);
        console.log(err);
      }
    )
  }
}
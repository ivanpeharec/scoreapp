import { Component, OnInit } from '@angular/core';
import { SportService } from 'src/app/shared/sport.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Sport } from 'src/app/shared/sport.model';

@Component({
  selector: 'app-sport',
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.css']
})
export class SportComponent implements OnInit {

  sport = {
    ID: 0,
    Name: ''
  };

  loaded = false;

  constructor(private service: SportService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router) {

    this.service.form.reset();

    route.params.subscribe(p => {
      this.sport.ID = +p['id'];
    }, err => {
      if (err.status == 404)
        this.router.navigate(['/sports']);
    });
  }

  ngOnInit() {
    if (this.sport.ID > 0) {
      this.service.getSport(this.sport.ID)
        .subscribe(b => {
          this.sport = b as Sport;

          this.service.form.patchValue({
            ID: this.sport.ID,
            Name: this.sport.Name
          });

          this.loaded = true;
        });
    }
    else {
      this.loaded = true;
    }

    this.resetForm();
    this.service.refreshList();
  }

  resetForm(form?: NgForm) {
    this.sport = {
      ID: 0,
      Name: ''
    };
  }

  onSubmit(form: NgForm) {
    if (this.sport.ID == 0) {
      this.insertRecord(form);
    }
    else {
      this.updateRecord(form);
    }
  }

  insertRecord(form: NgForm) {
    this.service.postSport().subscribe(
      res => {
        this.toastr.success('Inserted successfully', this.sport.Name);
        form.resetForm();
        this.service.refreshList();
      },
      err => {
        this.toastr.error('There was an error while inserting the sport.', this.sport.Name);
        console.log(err);
      }
    )
  }

  updateRecord(form: NgForm) {
    this.service.putSport().subscribe(
      res => {
        this.toastr.success('Edited successfully', this.sport.Name);
        this.service.refreshList();
      },
      err => {
        this.toastr.error('There was an error while editing this sport.', this.sport.Name);
        console.log(err);
      }
    )
  }
}
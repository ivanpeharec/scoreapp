import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public service: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/');
  }

  onSubmit(form: NgForm) {
    this.service.login().subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.service.getUserProfile()
          .subscribe(
            res => {
              this.service.userDetails = res;
              this.toastr.success('Login successful.', 'Hello '
                + this.service.userDetails.UserName + '!');
              this.service.isAuthenticated = true;
            },
            err => {
              console.log(err);
            });
        this.router.navigateByUrl('/');
      },
      err => {
        if (err.status == 400) {
          this.toastr.error('Incorrect username or password.', 'Login failed!');
        }
        else {
          console.log(err);
        }
      });
  }
}

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
  formModel = {
    UserName: '',
    Password: ''
  }

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/home');
  }

  onSubmit(form: NgForm) {
    this.userService.login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.userService.getUserProfile().subscribe(
          res => {
            this.userService.userDetails = res;
            this.toastr.success('Login successful.', 'Hello '
              + this.userService.userDetails.UserName + '!');
            this.userService.isAuthenticated = true;
          },
          err => {
            console.log(err);
          });
        this.router.navigateByUrl('/home');
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

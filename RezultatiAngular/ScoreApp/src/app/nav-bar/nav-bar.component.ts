import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router, public service: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.service.getUserProfile().subscribe(
        res => {
          this.service.userDetails = res;
          this.service.isAuthenticated = true;
        },
        err => {
          console.log(err);
        },
        () => {
          this.service.navbarLoaded = true;
        }
      );
    }
  }

  onLogout() {
    this.service.isAuthenticated = false;
    localStorage.removeItem('token');
    this.toastr.success('You have successfuly logged out.');
    this.router.navigate(['/']);
    this.service.userDetails = false;
  }
}
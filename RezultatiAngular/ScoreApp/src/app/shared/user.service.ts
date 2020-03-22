import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  isAuthenticated = false;
  isAdministrator = false;

  userDetails;

  readonly rootURL = 'https://localhost:44327/api';

  formModel = this.formBuilder.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    Passwords: this.formBuilder.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', [Validators.required, Validators.minLength(4)]]
    })
  });

  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      Password: this.formModel.value.Passwords.Password
    };
    return this.http.post(this.rootURL + '/ApplicationUser/Register', body);
  }

  login(formData) {
    return this.http.post(this.rootURL + '/ApplicationUser/Login', formData);
  }

  getUserProfile() {
    return this.http.get(this.rootURL + '/UserProfile');
  }

  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;
    allowedRoles.forEach(element => {
      if (userRole == element) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }

  isLoggedIn() {
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;
    if (userRole) {
      return true;
    }
    else {
      return false;
    }
  }

  isAdmin() {
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;
    if (userRole == 'Admin') {
      this.isAdministrator = true;
      return true;
    }
    else {
      return false;
    }
  }
}

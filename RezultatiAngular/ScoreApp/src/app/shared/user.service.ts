import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  isAuthenticated = false;
  isAdministrator = false;

  userDetails;

  readonly rootURL = 'https://localhost:44327/api';

  registerForm = this.formBuilder.group(
    {
      UserName: ['', Validators.required],
      Email: ['', Validators.email],
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', [Validators.required, Validators.minLength(4)]]
    },
    {
      // Check if two passwords match. 
      validator: comparePasswords("Password", "ConfirmPassword")
    }
  );

  loginForm: FormGroup = new FormGroup({
    UserName: new FormControl(null, Validators.required),
    Password: new FormControl(null, Validators.required)
  });

  register() {
    var body = {
      UserName: this.registerForm.value.UserName,
      Email: this.registerForm.value.Email,
      Password: this.registerForm.value.Password
    };

    return this.http.post(this.rootURL + '/ApplicationUser/Register', body);
  }

  login() {
    var body = {
      UserName: this.loginForm.value.UserName,
      Password: this.loginForm.value.Password
    };

    return this.http.post(this.rootURL + '/ApplicationUser/Login', body);
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
    if (localStorage.getItem('token') != null) {
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
    else {
      return false;
    }
  }
}

function comparePasswords(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.passwordsMismatch) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ passwordsMismatch: true })
    }
    else {
      matchingControl.setErrors(null);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.registerForm.reset();
  }

  // On form submit.
  onSubmit(form: NgForm) {
    this.service.register()
      .subscribe(
        (res: any) => {
          if (res.Succeeded) {
            form.resetForm();
            this.service.registerForm.reset();
            this.toastr.success('You have successfully registered.', 'Registration succeeded!');
          }
          else {
            res.Errors.forEach(element => {
              switch (element.Code) {
                case 'DuplicateUserName':
                  // Username is already taken.
                  this.toastr.error('Username is already taken.', 'Registration failed!');
                  break;

                default:
                  // Registration failed.
                  this.toastr.error(element.Description, 'Registration failed!');
                  break;
              }
            });
          }
        },
        err => {
          console.log(err);
        }
      );
  }
}
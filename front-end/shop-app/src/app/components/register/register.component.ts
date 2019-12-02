import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as rootReducers from '../../reducers/index';
import * as UserActions from '../../actions/user.action';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstNameErrMsg: string;
  lastNameErrMsg: string;
  emailErrMsg: string;
  passwordErrMsg: string;
  confirmPasswordErrMsg: string;
  error_msg: string;

  constructor(
    private store: Store<rootReducers.AppState>,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.store.pipe(select('user')).subscribe(res => {
      this.firstNameErrMsg = res.firstNameErrMsg;
      this.lastNameErrMsg = res.lastNameErrMsg;
      this.emailErrMsg = res.emailErrMsg;
      this.passwordErrMsg = res.passwordErrMsg;
      this.confirmPasswordErrMsg = res.confirmPasswordErrMsg;

      if (res.loading) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }

      if (res.valid) {
        this.router.navigate(['/login']);
      }
    })

    this.store.pipe(select('error')).subscribe(res => {
      this.error_msg = res.error_msg;
    })
  }

  isFirstNameValid = () => {
    return typeof this.firstNameErrMsg === 'undefined' || this.firstNameErrMsg === null;
  }

  isLastNameValid = () => {
    return typeof this.lastNameErrMsg === 'undefined' || this.lastNameErrMsg === null;
  }

  isEmailValid = () => {
    return typeof this.emailErrMsg === 'undefined' || this.emailErrMsg === null;
  }

  isPasswordValid = () => {
    return typeof this.passwordErrMsg === 'undefined' || this.passwordErrMsg === null;
  }

  isConfirmPasswordValid = () => {
    return typeof this.confirmPasswordErrMsg === 'undefined' || this.confirmPasswordErrMsg === null;
  }

  register = (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    const body = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    }
    this.store.dispatch(UserActions.REGISTER({ payload: body }))
  }

}

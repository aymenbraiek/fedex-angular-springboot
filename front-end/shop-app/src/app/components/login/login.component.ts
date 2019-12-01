import { Component, OnInit } from '@angular/core';
import * as UserActions from '../../actions/user.action';
import { Store, select } from '@ngrx/store';
import * as rootReducers from '../../reducers/index';
import { User } from '../../models/User.model';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  current_user: User;
  passwordErrMsg: string;
  emailErrMsg: string;
  valid: boolean;
  account_createdSucess_msg: string;

  constructor(
    private store: Store<rootReducers.AppState>,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.store.pipe(select('user')).subscribe((res) => {
      this.current_user = res.current_user;
      this.passwordErrMsg = res.passwordErrMsg;
      this.emailErrMsg = res.emailErrMsg;
      this.valid = res.valid;
      this.account_createdSucess_msg = res.successMsg;

      if (res.loading) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }

      if (res.valid) {
        this.router.navigate(['/users']);
      }
    })
  }

  isEmailValid = () => {
    return typeof this.emailErrMsg === 'undefined' || this.emailErrMsg === null;
  }

  isPasswordValid = () => {
    return typeof this.passwordErrMsg === 'undefined' || this.passwordErrMsg === null;
  }

  login = (email, password) => {
    const credentials = {
      email: email,
      password: password
    }
    this.store.dispatch(UserActions.LOG_IN({ payload: credentials }));
  }
}

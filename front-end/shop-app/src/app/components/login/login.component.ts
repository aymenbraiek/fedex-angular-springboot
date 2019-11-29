import { Component, OnInit } from '@angular/core';
import * as UserActions from '../../actions/user.action';
import { Store, select } from '@ngrx/store';
import * as rootReducers from '../../reducers/index';
import { User } from '../../models/User.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  current_user: User;
  passwordErrMsg: string;
  userNameErrMsg: string;
  valid: boolean;

  constructor(
    private store: Store<rootReducers.AppState>
  ) { }

  ngOnInit() {
    this.store.pipe(select('user')).subscribe((res) => {
      this.current_user = res.current_user;
      this.passwordErrMsg = res.passwordErrMsg;
      this.userNameErrMsg = res.userNameErrMsg;
      this.valid = res.valid;
    })
  }

  isUserNameValid = () => {
    return typeof this.userNameErrMsg === 'undefined' || this.userNameErrMsg === null;
  }

  isPasswordValid = () => {
    return typeof this.passwordErrMsg === 'undefined' || this.passwordErrMsg === null;
  }

  login = (userName, password) => {
    const credentials = {
      username: userName,
      password: password
    }
    this.store.dispatch(UserActions.LOG_IN({ payload: credentials }));
  }
}

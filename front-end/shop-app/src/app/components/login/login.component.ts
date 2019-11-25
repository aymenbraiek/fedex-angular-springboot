import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import * as UserActions from '../../actions/user.action';
import { Store } from '@ngrx/store';
import * as rootReducers from '../../reducers/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isUserNameValid: boolean;
  isPasswordValid: boolean;

  constructor(
    private userService: UserService,
    private store: Store<rootReducers.AppState>
  ) { }

  ngOnInit() {
  }

  isUserNameFilled = (userName) => {
    return typeof userName !== 'undefined' && userName !== '';
  }

  isPasswordFilled = (password) => {
    return typeof password !== 'undefined' && password !== '';
  }

  login = (userName, password) => {
    if (this.isUserNameFilled(userName)) {
      this.isUserNameValid = true;
    } else {
      this.isUserNameValid = false;
    }

    if (this.isPasswordFilled(password)) {
      this.isPasswordValid = true;
    } else {
      this.isPasswordValid = false;
    }

    if (this.isUserNameFilled(userName) && this.isPasswordFilled(password)) {
      //this.userService.logIn(userName, password).subscribe(val => console.log(val));
      const credentials = {
        userName: userName,
        password: password
      }
      this.store.dispatch(UserActions.LOG_IN({ payload: credentials }));
    }
  }
}

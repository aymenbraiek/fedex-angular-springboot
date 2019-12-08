import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as rootReducers from '../../reducers/index';
import * as UserActions from '../../actions/user.action';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { User } from 'src/app/models/User.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  success_msg: string;
  error_msg: string[];
  firstNameTitle: string;
  lastNameTitle: string;
  email: string;
  current_user: User;

  constructor(
    private store: Store<rootReducers.AppState>,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.store.pipe(select('success')).subscribe(info => {
      this.success_msg = info.success_msg;
    })

    this.store.pipe(select('error')).subscribe(info => {
      this.error_msg = info.error_msg;
    })

    this.store.pipe(select('user')).subscribe(res => {
      this.current_user = res.current_user;

      if (res.current_user !== null) {
        this.firstNameTitle = res.current_user.firstName;
        this.lastNameTitle = res.current_user.lastName;
        this.email = res.current_user.email;
      }

      if (res.loading) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }

    })
  }

  onUpdate = (firstName: string, lastName: string) => {
    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: this.email,
      roles: this.current_user === null || typeof this.current_user === 'undefined' ? [] : this.current_user.roles
    }
    this.store.dispatch(UserActions.EDIT_USER({ payload: payload }));
  }

  onDelete = () => {
    const payload = {
      email: this.email,
      current_user: this.current_user
    }
    this.store.dispatch(UserActions.DELETE_USER({ payload: payload }));
  }

}

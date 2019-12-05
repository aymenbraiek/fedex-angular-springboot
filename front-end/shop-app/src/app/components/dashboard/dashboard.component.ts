import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as rootReducers from '../../reducers/index';
import * as UserActions from '../../actions/user.action';
import { NgxSpinnerService } from "ngx-spinner";

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

  constructor(
    private store: Store<rootReducers.AppState>,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.store.pipe(select('success')).subscribe(info => {
      this.success_msg = info.success_msg;
    })
    this.store.pipe(select('user')).subscribe(res => {
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
    this.store.pipe(select('error')).subscribe(info => {
      this.error_msg = info.error_msg;
    })
  }

  onUpdate = (firstName: string, lastName: string) => {
    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: this.email
    }
    this.store.dispatch(UserActions.EDIT_USER({ payload: payload }));
  }

  onDelete = (firstName: string, lastName: string) => {
    console.log('DELETE ' + firstName + ', ' + lastName);
  }

}

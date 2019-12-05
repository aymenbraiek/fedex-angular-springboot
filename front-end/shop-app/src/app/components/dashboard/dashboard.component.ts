import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as rootReducers from '../../reducers/index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  success_msg: string;
  firstNameTitle: string;
  lastNameTitle: string;
  email: string;

  constructor(
    private store: Store<rootReducers.AppState>,
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
    })
  }

  onUpdate = (firstName: string, lastName: string) => {
    console.log('UDPATE ' + firstName + ', ' + lastName);
  }

  onDelete = (firstName: string, lastName: string) => {
    console.log('DELETE ' + firstName + ', ' + lastName);
  }

}

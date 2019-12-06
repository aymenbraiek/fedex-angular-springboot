import { Component, OnInit } from '@angular/core';
import * as rootReducers from '../../reducers/index';
import * as UserActions from '../../actions/user.action';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  current_user: string;
  hasAdminRole: boolean;
  hasCustomerRole: boolean;
  hasEmployeeRole: boolean;

  constructor(
    private store: Store<rootReducers.AppState>
  ) { }

  ngOnInit() {
    this.store.pipe(select('user')).subscribe(data => {
      if (data.current_user !== null && typeof data.current_user !== 'undefined') {
        this.current_user = data.current_user.firstName + " " + data.current_user.lastName;

        if (new Set(data.current_user.roles).has('ADMIN')) {
          this.hasAdminRole = true;
        }
      }
    })
  }

  logout() {
    this.store.dispatch(UserActions.LOG_OUT());
  }

}

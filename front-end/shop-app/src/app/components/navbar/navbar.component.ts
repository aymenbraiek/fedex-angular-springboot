import { Component, OnInit, Input } from '@angular/core';
import * as rootReducers from '../../reducers/index';
import * as UserActions from '../../actions/user.action';
import { Store, select } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean;
  currentUserFirstName: string;
  currentUserLastName: string;
  hasAdminRole: boolean;
  hasCustomerRole: boolean;
  hasEmployeeRole: boolean;
  @Input() active: string;

  constructor(
    private store: Store<rootReducers.AppState>,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.isAuthenticated = true;
    }

    this.store.pipe(select('user')).subscribe(data => {
      if (data.current_user !== null && typeof data.current_user !== 'undefined') {
        this.currentUserFirstName = data.current_user.firstName;
        this.currentUserLastName = data.current_user.lastName;

        if (new Set(data.current_user.roles).has('ADMIN')) {
          this.hasAdminRole = true;
        }
      }
    })
  }

  setActive(tab: string) {
    return {
      'active': this.active === tab,
      'font-weight-bold': this.active === tab
    }
  }

  logout() {
    this.store.dispatch(UserActions.LOG_OUT());
  }

}

import { Component, OnInit } from '@angular/core';
import * as rootReducers from '../../reducers/index';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  current_user: string;

  constructor(
    private store: Store<rootReducers.AppState>
  ) { }

  ngOnInit() {
    this.store.pipe(select('user')).subscribe(data => {
      if (data.current_user !== null && typeof data.current_user !== 'undefined') {
        this.current_user = data.current_user.firstName + " " + data.current_user.lastName;
      }
    })
  }

  logout() {
    localStorage.removeItem('jwtToken');
  }

}

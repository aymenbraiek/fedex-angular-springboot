import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User.model';
import { Store, select } from '@ngrx/store';
import * as rootReducers from '../../reducers/index';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users_list: User[] = [];
  success_msg: string;

  constructor(
    private store: Store<rootReducers.AppState>,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe((users) => {
      this.users_list = users
    });

    this.store.pipe(select('success')).subscribe(info => {
      this.success_msg = info.success_msg;
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { User } from 'src/app/models/User.model';
import { Consignment } from 'src/app/models/Consignment.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: Object;

  constructor(
    private userDetailsService: UserDetailsService
  ) { }

  ngOnInit() {
    this.user = this.userDetailsService.viewUser;
    // console.log(this.user);
  }

}

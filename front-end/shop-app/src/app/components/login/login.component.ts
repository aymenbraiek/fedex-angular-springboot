import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName: string;
  password: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  isUserNameValid = () => {
    return this.userName !== '';
  }

  isPasswordValid = () => {
    return this.password !== '';
  }

  login = () => {
    if (typeof this.userName === 'undefined')
      this.userName = '';

    if (typeof this.password === 'undefined')
      this.password = '';

    if (this.isUserNameValid() && this.isPasswordValid()) {
      // perform login
      console.log("start login...");
      this.userService.logIn(this.userName, this.password).subscribe(val => console.log(val));
    }
  }
}

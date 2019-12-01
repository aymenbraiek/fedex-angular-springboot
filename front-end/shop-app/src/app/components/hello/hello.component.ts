import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {
  text: String;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    // this.userService.getHello().subscribe(val => {
    //   console.log(val);
    //   // this.text = val;
    // })
  }

  onClick() {
    this.userService.getHello().subscribe(val => {
      console.log(val);
      this.text = val.response;
    })
  }

}

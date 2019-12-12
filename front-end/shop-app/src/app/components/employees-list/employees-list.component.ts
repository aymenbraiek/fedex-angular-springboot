import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as rootReducers from '../../reducers/index';
import * as AdminActions from '../../actions/admin.action';
import { User } from 'src/app/models/User.model';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  available_employees: Set<User> = new Set<User>();
  @Input() target_user: User;
  @Input() target_user_roles: Set<string>;
  assigned_employee_email: string;

  constructor(
    private store: Store<rootReducers.AppState>
  ) { }

  ngOnInit() {
    this.store.pipe(select('user')).subscribe(res => {
      if (res.allUsers) {
        this.store.dispatch(AdminActions.LOAD_EMPLOYEES({ payload: res.allUsers }));
      }
    })

    this.store.pipe(select('employee')).subscribe(res => {
      // console.log(res.all_employees);      
      res.all_employees.forEach(employee => {
        if (!this.target_user_roles.has('EMPLOYEE') || this.target_user.email !== employee.email) {
          this.available_employees.add(employee);
        }
      })
      // console.log(this.available_employees);
    })
  }

  onAssign(assigned_employee_email: string) {
    if (this.assigned_employee_email !== assigned_employee_email) {
      this.assigned_employee_email = assigned_employee_email;
    } else {
      this.assigned_employee_email = null;
    }
  }

  setBtnStyle(employee_email: string) {
    return {
      'btn-light': this.assigned_employee_email !== employee_email,
      'btn-warning': this.assigned_employee_email === employee_email
    }
  }

  setBtnTextStyle(employee_email: string) {
    return {
      'font-weight-bold': this.assigned_employee_email === employee_email
    }
  }

}

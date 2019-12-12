import { Injectable } from '@angular/core';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  viewUser: Object;

  constructor() { }

  setViewUser(user: User) {
    const consignments = this.constructConsignments(user);
    this.viewUser = {
      ...user,
      format_consignments: consignments
    }
  }

  constructConsignments(user: User) {
    const map = {
      notReceived: [],
      received: []
    };

    user.consignments.forEach(consignment => {
      if (consignment.received) {
        map.received.push(consignment);
      } else {
        map.notReceived.push(consignment);
      }
    })
    return map;
  }
}

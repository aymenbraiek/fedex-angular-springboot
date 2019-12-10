import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as rootReducers from '../../reducers/index';
import * as ConsignmentActions from '../../actions/consignment.action';
import { NgxSpinnerService } from "ngx-spinner";
import { Consignment } from 'src/app/models/Consignment.model';

@Component({
  selector: 'app-consignments',
  templateUrl: './consignments.component.html',
  styleUrls: ['./consignments.component.css']
})
export class ConsignmentsComponent implements OnInit {
  consignments: {
    notReceived: Consignment[],
    received: Consignment[]
  };

  constructor(
    private store: Store<rootReducers.AppState>,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.store.pipe(select('user')).subscribe(res => {
      if (res.current_user) {
        this.store.dispatch(ConsignmentActions.LOAD_CONSIGNMENTS({ payload: res.current_user.email }));
      }
    })

    this.store.pipe(select('consignment')).subscribe(res => {
      console.log(res.consignments);
      this.consignments = res.consignments;

      if (res.loading) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    })
  }

}

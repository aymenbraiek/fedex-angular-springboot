import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as rootReducers from '../../reducers/index';

@Component({
  selector: 'app-add-consignment',
  templateUrl: './add-consignment.component.html',
  styleUrls: ['./add-consignment.component.css']
})
export class AddConsignmentComponent implements OnInit {
  @Input() add_clicked: boolean;
  @Output() cancelAdd: EventEmitter<any> = new EventEmitter();
  @Output() addEvent: EventEmitter<any> = new EventEmitter();
  success_msg: string;
  error_msg: string;
  errors: string[];

  constructor(
    private store: Store<rootReducers.AppState>
  ) { }

  ngOnInit() {
    this.store.pipe(select('success')).subscribe(res => {
      this.success_msg = res.success_msg;
    })

    this.store.pipe(select('error')).subscribe(info => {
      this.error_msg = info.error_msg;
      this.errors = info.errors;
    })
  }

  onAdd(
    description: string,
    street: string,
    city: string,
    state: string,
    zipcode: string,
    country: string,
    price: string,
    currency: string
  ) {
    this.addEvent.emit({
      description: description,
      street: street,
      city: city,
      state: state,
      zipcode: zipcode,
      country: country,
      price: price,
      currency: currency
    });
  }

  onCancel() {
    this.cancelAdd.emit();
  }

}

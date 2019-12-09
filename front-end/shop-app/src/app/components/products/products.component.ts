import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Product } from 'src/app/models/Product.model';
import { NavbarComponent } from '../navbar/navbar.component';
import { Store, select } from '@ngrx/store';
import * as rootReducers from '../../reducers/index';
import * as ProductActions from '../../actions/product.action';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, AfterViewInit {
  products: Product[];
  isAuthenticated: boolean;
  @ViewChild(NavbarComponent, { static: false }) navBarComponent: NavbarComponent;

  constructor(
    private store: Store<rootReducers.AppState>,
    private spinner: NgxSpinnerService
  ) { }

  ngAfterViewInit() {
    this.isAuthenticated = this.navBarComponent.isAuthenticated;
  }

  ngOnInit() {
    this.store.dispatch(ProductActions.LOAD_PRODUCTS());

    this.store.pipe(select('product')).subscribe(res => {
      this.products = res.products;

      if (res.loading) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    })
  }

}

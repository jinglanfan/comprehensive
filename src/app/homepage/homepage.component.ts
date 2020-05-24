import { Component } from '@angular/core';
import { MENUS, PRODUCTS } from './data';


@Component({
  selector: 'app-root',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  menus = MENUS;

  products = PRODUCTS;
  title: any;


}


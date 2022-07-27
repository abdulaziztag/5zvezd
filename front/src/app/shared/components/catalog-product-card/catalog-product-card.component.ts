import {Component, Input, OnInit} from '@angular/core';
import {FilteredProductsInterface} from "../../interfaces/product.interface";

@Component({
  selector: 'app-catalog-product-card',
  templateUrl: './catalog-product-card.component.html',
  styleUrls: ['./catalog-product-card.component.scss']
})
export class CatalogProductCardComponent implements OnInit {
  @Input() public product: FilteredProductsInterface;
  public isHover: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}

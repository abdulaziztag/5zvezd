import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ProductCardInterface} from "../../interfaces/product.interface";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent implements OnInit {
  @Input() product: ProductCardInterface;

  public get url(): string {
    return `/product/${this.product._id}`
  }

  constructor() { }

  ngOnInit(): void {
  }

}

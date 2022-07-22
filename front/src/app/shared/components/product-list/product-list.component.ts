import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ProductCardInterface} from "../../interfaces/product.interface";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {
  @Input() public title: string = '';
  @Input() public data: ProductCardInterface[] = [];
  @ViewChild('productList', {static: true}) private productList?: ElementRef;

  public transformValue: number = 0;
  private CARD_WIDTH: number = 270;
  private MARGINS: number = 30;


  constructor() {
  }

  ngOnInit(): void {
  }

  public leftClick(): void {
    if (this.transformValue + this.CARD_WIDTH > 0) {
      this.transformValue = 0;
    } else {
      this.transformValue += this.CARD_WIDTH
    }
  }

  public rightClick(): void {
    const FULL_SIZE = this.CARD_WIDTH * this.data.length;
    const elementSize = this.productList?.nativeElement.getBoundingClientRect();
    const difference = Math.trunc(-FULL_SIZE - (elementSize.left - this.MARGINS) - -elementSize.width);
    if (difference === 0) {
      return;
    }
    if (difference + this.CARD_WIDTH > 0) {
      this.transformValue += difference;
    } else {
      this.transformValue -= this.CARD_WIDTH;
    }
  }
}

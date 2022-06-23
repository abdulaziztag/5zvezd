import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass']
})
export class ProductListComponent implements OnInit {
  @ViewChild('productList', {static: true}) private productList?: ElementRef

  public transformCounter: number = 0
  constructor() { }

  ngOnInit(): void {
  }

  public leftClick(): void {
    this.transformCounter > 0 && this.transformCounter--
  }

  public rightClick(): void {
    this.transformCounter < 9 && this.transformCounter++
    console.log(
      this.productList?.nativeElement.getBoundingClientRect(),
      window.pageXOffset
    )
  }
}

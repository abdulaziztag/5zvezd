import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input() public title: string = '';
  @ViewChild('productList', {static: true}) private productList?: ElementRef;

  public transformCounter: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

  public leftClick(): void {
    this.transformCounter > 0 && this.transformCounter--;
  }

  public rightClick(): void {
    const FULL_SIZE = 3000;
    const elementSize = this.productList?.nativeElement.getBoundingClientRect();
    let isEndOfCarousel = -FULL_SIZE - (elementSize.left - 20) > -elementSize.width - 250;
    if (isEndOfCarousel) return;
    this.transformCounter < 12 && this.transformCounter++;
  }
}

import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input() public title: string = ''
  @ViewChild('productList', {static: true}) private productList?: ElementRef

  public transformCounter: number = 0
  constructor() { }

  ngOnInit(): void {
  }

  public leftClick(): void {
    this.transformCounter > 0 && this.transformCounter--
  }

  public rightClick(): void {
    let elementSize = this.productList?.nativeElement.getBoundingClientRect();
    let difference = elementSize.width > 980 ? 250 : 0;
    let isEndOfCarousel = -3000 - (elementSize.left - 20) > -elementSize.width - difference;
    if (isEndOfCarousel) return
    this.transformCounter < 12 && this.transformCounter++;
  }
}

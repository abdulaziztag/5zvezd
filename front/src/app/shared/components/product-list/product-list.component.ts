import {
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  Input,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {ExampleCardComponent} from "../example-card/example-card.component";
import {CardDirective} from "../../directives/card.directive";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, AfterViewInit {
  @Input() public title: string = '';
  @ViewChild('productList', { static: true }) private productList?: ElementRef;

  @ContentChild('headerContent') headerContent: ElementRef;

  @ContentChild(CardDirective) productCard: CardDirective;
  @ContentChild(CardDirective, {read: TemplateRef}) productCardTemplate: TemplateRef<HTMLElement>;

  public transformCounter: number = 0;
  constructor() { }

  public ngOnInit(): void {
  }

  public ngAfterViewInit() {
    console.log('productCard', this.productCard);
  }

  public leftClick(): void {
    this.transformCounter > 0 && this.transformCounter--;
  }

  public rightClick(): void {
    let elementSize = this.productList?.nativeElement.getBoundingClientRect();
    let difference = elementSize.width > 980 ? 250 : 0;
    let isEndOfCarousel = -3000 - (elementSize.left - 20) > -elementSize.width - difference;
    if (isEndOfCarousel) {
      return;
    }
    this.transformCounter < 12 && this.transformCounter++;
  }
}

import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {ProductService} from "../../../shared/services/product.service";
import {ProductInterface} from "../../../shared/interfaces/product.interface";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit, OnDestroy {
  private notifier = new Subject<void>()
  private productId: string = ''
  public product?: ProductInterface

  constructor(
    private route: ActivatedRoute,
    public productService: ProductService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.notifier)).subscribe(params => {
      this.productId = params['productId']
    })
    this.productService.getProduct().pipe(takeUntil(this.notifier)).subscribe(data => {
      this.product = data
    })
  }

  ngOnDestroy(): void {
    this.notifier.next()
    this.notifier.complete()
  }
}

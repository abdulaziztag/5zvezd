import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {HomePageService} from "../../../shared/services/home-page.service";
import {ProductService} from "../../../shared/services/product.service";
import {LoaderService} from "../../../shared/services/loader.service";
import {Subject, switchMap} from "rxjs";
import {ProductCardInterface} from "../../../shared/interfaces/product.interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  private notifier = new Subject<void>();

  constructor(
    public data: HomePageService,
    public productService: ProductService,
    public loader: LoaderService,
  ) { }

  ngOnInit(): void {
    this.loader.setLoader(true)
    const avgRating = this.productService.requestSortedProducts(
      'averageRating',
      'desc',
      12
    )
      .pipe(
        switchMap((data: { filteredProduct: ProductCardInterface[] }) => {
          this.productService.setPopular(data.filteredProduct)
          return this.productService.requestSortedProducts('createdAt', 'desc', 12)
        })
      )

    avgRating
      .pipe(
        switchMap((data: { filteredProduct: ProductCardInterface[] }) => {
          this.productService.setRecently(data.filteredProduct)
          return this.productService.requestSortedProducts('minCost', 'desc', 12)
        })
      )
      .subscribe((data: { filteredProduct: ProductCardInterface[] }) => {
        this.productService.setMostExpensive(data.filteredProduct)
        this.loader.setLoader(false)
      })
  }

  ngOnDestroy(): void {
    this.notifier.next()
    this.notifier.complete()
  }

}

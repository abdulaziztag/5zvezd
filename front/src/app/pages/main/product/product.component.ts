import {ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {ProductService} from "../../../shared/services/product.service";
import {ProductInterface} from "../../../shared/interfaces/product.interface";
import {TokenStorageService} from "../../../shared/services/token-storage.service";
import {MatDialog} from '@angular/material/dialog';
import {AddReviewDialogComponent} from "../../../shared/components/add-review-dialog/add-review-dialog.component";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit, OnDestroy {
  @ViewChild('el', {static: true}) private el: ElementRef

  private notifier = new Subject<void>()
  private productId: string = ''
  public product?: ProductInterface

  constructor(
    private route: ActivatedRoute,
    public productService: ProductService,
    public tokenService: TokenStorageService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.notifier)).subscribe(params => {
      this.productId = params['productId']
    })
    this.productService.getProduct().pipe(takeUntil(this.notifier)).subscribe(data => {
      this.product = data
    })
  }

  public openDialog(): void {
    this.dialog.open(AddReviewDialogComponent, {
      disableClose: true,
      minWidth: '70vw'
    })
  }

  ngOnDestroy(): void {
    this.notifier.next()
    this.notifier.complete()
  }
}

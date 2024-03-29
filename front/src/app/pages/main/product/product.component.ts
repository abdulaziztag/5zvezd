import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, map, Subject, switchMap, takeUntil, throwError} from "rxjs";
import {ProductService} from "../../../shared/services/product.service";
import {TokenStorageService} from "../../../shared/services/token-storage.service";
import {MatDialog} from '@angular/material/dialog';
import {AddReviewDialogComponent} from "../../../shared/components/add-review-dialog/add-review-dialog.component";
import {AlertService} from "../../../shared/services/alert.service";
import {CommentService} from "../../../shared/services/comment.service";
import {Title} from '@angular/platform-browser';
import {LoaderService} from "../../../shared/services/loader.service";
import {CommentInterface} from "../../../shared/interfaces/comment.interface";
import {DashboardService} from "../../../shared/services/dashboard.service";
import {DeleteProductComponent} from "../../../shared/components/delete-product/delete-product.component";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  @ViewChild('el', {static: true}) private el: ElementRef

  private notifier = new Subject<void>();
  public convertedBase64: string = ''
  public loadAllReviews: boolean = false
  public reviewLoader: boolean = false
  public commentOwner: boolean;
  public isAdmin: boolean = false;

  constructor(
    private route: ActivatedRoute,
    public productService: ProductService,
    public tokenService: TokenStorageService,
    private dialog: MatDialog,
    private alertService: AlertService,
    private router: Router,
    public commentService: CommentService,
    public loaderService: LoaderService,
    private titleService: Title,
    private dashboardService: DashboardService
  ) {
  }

  ngOnInit(): void {
    const productId = this.route.snapshot.params['productId'];
    this.loaderService.setLoader(true);

    const productRequest$ = this.productService
      .requestProduct(productId)
      .pipe(
        catchError((error) => {
          this.alertService.openSnackBar(error.error.message, 'error');
          this.router.navigate([
            '/error'
          ])
          return throwError(error);
        }),
        switchMap((data) => {
          this.productService.setProduct({...data.product.product, img: data.product.img});
          const userId = this.tokenService.getUser().userId;
          this.titleService.setTitle(data.product.product.title);

          return this.commentService.requestComment(
            productId,
            undefined,
            undefined,
            (!userId ? 1 : 2),
            userId
          )
        })
      )

    productRequest$
      .pipe(
        takeUntil(this.notifier),
        map(key => {
          return key.comment.filter((key: CommentInterface) => {
            if (key.user === this.tokenService.getUser().userId) {
              this.commentService.setCommentOwner(key)
              this.commentOwner = true
            }
            return key.user !== this.tokenService.getUser().userId
          })
        })
      )
      .subscribe(data => {
        this.commentService.setComment(data);
        this.loaderService.setLoader(false);
      })

    this.dashboardService
      .checkForAdmin()
      .pipe(takeUntil(this.notifier))
      .subscribe(() => {
        this.isAdmin = true;
      }, () => {
        this.isAdmin = false
      })
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AddReviewDialogComponent, {
      disableClose: true,
      minWidth: '70vw',
      data: {
        productId: this.route.snapshot.params['productId']
      }
    });

    dialogRef.afterClosed().pipe(takeUntil(this.notifier)).subscribe(
      (res) => {
        this.commentOwner = res.commentOwner
      }
    );
  }

  public loadReviews(): void {
    this.reviewLoader = true
    this.commentService.requestAllComments(this.route.snapshot.params['productId'])
      .pipe(
        takeUntil(this.notifier),
        map(key => {
          return key.comments.filter((key: CommentInterface) => {
            if (key.user === this.tokenService.getUser().userId) {
              this.commentService.setCommentOwner(key)
              this.commentOwner = true
            }
            return key.user !== this.tokenService.getUser().userId
          })
        })
      )
      .subscribe(data => {
        this.commentService.setComment(data)
      })
    this.loadAllReviews = true
  }

  public deleteProduct(): void {
    this.dialog.open(DeleteProductComponent, {
      disableClose: true,
      data: {
        productId: this.route.snapshot.params['productId']
      }
    })
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}

import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {CommentService} from "../../services/comment.service";
import {AlertService} from "../../services/alert.service";
import {ProductService} from "../../services/product.service";
import {DashboardService} from "../../services/dashboard.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent implements OnInit, OnDestroy {
  private notifier = new Subject<void>();
  public loader: boolean = false
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { productId: string },
    private notification: AlertService,
    private dialog: MatDialog,
    private dashboardService: DashboardService,
    private router: Router
  ) { }

  public deleteProduct(): void {
    this.loader = true
    this.dashboardService.deleteProduct(this.data.productId)
      .pipe(
        takeUntil(this.notifier)
      )
      .subscribe(data => {
          this.notification.openSnackBar(data.message);
          this.router.navigate(['/'])
          this.dialog.closeAll();
        },
        error => {
          this.notification.openSnackBar(error.error.message, 'error');
          this.dialog.closeAll();
        })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}

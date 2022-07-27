import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {CommentService} from "../../services/comment.service";
import {AlertService} from "../../services/alert.service";
import {Subject, takeUntil} from "rxjs";
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-delete-comment-dialog',
  templateUrl: './delete-comment-dialog.component.html',
  styleUrls: ['./delete-comment-dialog.component.scss']
})
export class DeleteCommentDialogComponent implements OnInit, OnDestroy {
  private notifier = new Subject<void>();

  public loader: boolean = false
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { productId: string },
    private comment: CommentService,
    private notification: AlertService,
    private dialog: MatDialog,
    private productService: ProductService
  ) {
  }

  public deleteComment(): void {
    this.loader = true
    this.comment.deleteComment(this.data.productId)
      .pipe(
        takeUntil(this.notifier)
      )
      .subscribe(data => {
          this.notification.openSnackBar(data.message);
          this.comment.setCommentOwner(null);
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

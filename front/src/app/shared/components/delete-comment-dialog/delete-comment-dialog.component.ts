import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommentService} from "../../services/comment.service";
import {AlertService} from "../../services/alert.service";
import {Subject, takeUntil} from "rxjs";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-comment-dialog',
  templateUrl: './delete-comment-dialog.component.html',
  styleUrls: ['./delete-comment-dialog.component.scss']
})
export class DeleteCommentDialogComponent implements OnInit, OnDestroy {

  private notifier = new Subject<void>();

  constructor(
    private comment: CommentService,
    private notification: AlertService,
    private dialog: MatDialog
  ) {
  }

  public deleteComment(): void {
    this.comment.deleteComment()
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

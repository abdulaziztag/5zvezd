import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {CommentInterface} from "../../interfaces/comment.interface";
import {MatDialog} from "@angular/material/dialog";
import {DeleteCommentDialogComponent} from '../delete-comment-dialog/delete-comment-dialog.component';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewComponent implements OnInit {
  @Input() comment: CommentInterface;
  @Input() yourComment: boolean;
  public starId: number[] = [1, 2, 3, 4, 5];
  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  public get userInfo() {
    return this.comment.userInfo[0]
  }

  ngOnInit(): void {
  }

  public deleteComment(): void {
    this.dialog.open(DeleteCommentDialogComponent, {
      disableClose: true,
      data: {
        productId: this.route.snapshot.params['productId']
      }
    })
  }
}

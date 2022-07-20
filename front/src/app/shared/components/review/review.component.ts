import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {CommentInterface} from "../../interfaces/comment.interface";
import {base64ArrayBuffer} from "../../helpers/base64ArrayBuffer.function";
import {MatDialog} from "@angular/material/dialog";
import {DeleteCommentDialogComponent} from '../delete-comment-dialog/delete-comment-dialog.component';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewComponent implements OnInit {
  @Input() comment: CommentInterface;
  @Input() yourComment: boolean;
  public convertedBase64: string = ''
  public starId: number[] = [1, 2, 3, 4, 5];
  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    if (this.comment.userInfo[0]?.img) {
      this.convertedBase64 = base64ArrayBuffer(this.comment.userInfo[0]?.img?.data)
    }
  }

  public deleteComment(): void {
    this.dialog.open(DeleteCommentDialogComponent, {
      disableClose: true
    })
  }
}

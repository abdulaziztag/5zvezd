import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {CommentInterface} from "../../interfaces/comment.interface";
import {base64ArrayBuffer} from "../../helpers/base64ArrayBuffer.function";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewComponent implements OnInit {
  @Input() comment: CommentInterface;

  public convertedBase64: string = ''
  public starId: number[] = [1, 2, 3, 4, 5];
  constructor() { }

  ngOnInit(): void {
    if (this.comment.userInfo[0]?.img) {
      this.convertedBase64 = base64ArrayBuffer(this.comment.userInfo[0]?.img?.data)
    }
  }

}

import {ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Subject, takeUntil} from "rxjs";
import {CommentService} from "../../services/comment.service";
import {AlertService} from "../../services/alert.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-add-review-dialog',
  templateUrl: './add-review-dialog.component.html',
  styleUrls: ['./add-review-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddReviewDialogComponent implements OnInit {
  @ViewChild('ratingContainer', {static: true}) ratingContainer: ElementRef;
  public form: FormGroup = new FormGroup({});
  private notifier = new Subject<void>();

  public starId: number[] = [1, 2, 3, 4, 5];
  public activeStarId: number = 0;
  public loader: boolean = false


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { productId: string },
    private dialogRef: MatDialogRef<AddReviewDialogComponent>,
    private fb: FormBuilder,
    private comment: CommentService,
    private alert: AlertService,
    private tokenService: TokenStorageService,
    private productService: ProductService
  ) {
    this.form = fb.group({
      title: ['', [Validators.required]],
      price: [null, [Validators.min(1)]],
      body: ''
    })
  }

  public get reviewForm() {
    return this.form.controls;
  }

  ngOnInit(): void {
  }

  public setStar($event: Event): void {
    this.activeStarId = +(<HTMLTextAreaElement>$event.target).dataset['id'];
  }

  public addReview(): void {
    this.loader = true
    this.comment.addComment(
      this.reviewForm['title'].value,
      this.reviewForm['price'].value,
      this.activeStarId,
      this.reviewForm['body'].value,
      this.data.productId
    )
      .pipe(takeUntil(this.notifier))
      .subscribe(
        (data: { message: string, averageRating: number }) => {
          this.loader = false
          this.alert.openSnackBar(data.message);
          this.comment.setCommentOwner({
            title: this.reviewForm['title'].value,
            rating: this.activeStarId,
            createdAt: new Date().getDate(),
            body: this.reviewForm['body'].value,
            user: this.tokenService.getUser().userId,
            userInfo: [{
              firstName: this.tokenService.getUser().firstName,
              lastName: this.tokenService.getUser().lastName
            }]
          })
          this.productService.changeRating(data.averageRating);
          this.dialogRef.close({
            commentOwner: true
          });
        },
        (error) => {
          this.loader = false
          this.alert.openSnackBar(error.error.message, 'error');
        }
      )
  }

  public enableAddBtn(): boolean {
    return (
      this.reviewForm['title']?.errors?.['required'] ||
      this.reviewForm['price']?.errors?.['min']
    )
  }
}

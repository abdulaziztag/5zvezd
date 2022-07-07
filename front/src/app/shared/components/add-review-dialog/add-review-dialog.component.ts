import {ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-add-review-dialog',
  templateUrl: './add-review-dialog.component.html',
  styleUrls: ['./add-review-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddReviewDialogComponent implements OnInit {
  @ViewChild('ratingContainer', {static: true}) ratingContainer: ElementRef;
  public starId: number[] = [1, 2, 3, 4, 5];
  public activeStarId: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  public setStar($event: Event): void {
    this.activeStarId = +(<HTMLTextAreaElement>$event.target).dataset['id'];
  }
}

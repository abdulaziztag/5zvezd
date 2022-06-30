import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-add-review-dialog',
  templateUrl: './add-review-dialog.component.html',
  styleUrls: ['./add-review-dialog.component.scss']
})
export class AddReviewDialogComponent implements OnInit {
  @ViewChild('ratingContainer', {static: true}) ratingContainer: ElementRef;
  public activeStarId: number = 0

  constructor() { }

  ngOnInit(): void {
  }

  public setStar($event: Event): void {
    this.activeStarId = +(<HTMLTextAreaElement>$event.target).dataset['id']
  }
}

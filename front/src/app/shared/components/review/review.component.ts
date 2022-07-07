import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewComponent implements OnInit {
  public starId: number[] = [1, 2, 3, 4, 5];
  public index: number = 1;
  constructor() { }

  ngOnInit(): void {
  }

}

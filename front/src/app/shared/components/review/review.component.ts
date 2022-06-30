import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  @ViewChild('ratingContainer', {static: true}) ratingContainer: ElementRef;

  constructor() { }

  ngOnInit(): void {
    const child = this.ratingContainer.nativeElement.childNodes
    child.forEach((el: any, index: number) => {
      if (index < 1) {
        el.classList.add('star')
        el.innerHTML = 'star'
      }
    })
  }

}

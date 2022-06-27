import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import { trigger, transition, style, animate } from "@angular/animations";
import { carouselItem } from '../../interfaces/carousel.interface'

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselComponent implements OnInit {
  @Input() slides: carouselItem[] = []

  public currentSlide: number = 0;
  public activeSlide?: carouselItem
  constructor() { }

  ngOnInit(): void {
    this.activeSlide = this.slides[0]
  }
  onPreviousClick(): void {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
    this.activeSlide = this.slides[this.currentSlide];
  }

  onNextClick(): void {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
    this.activeSlide = this.slides[this.currentSlide];
  }
}

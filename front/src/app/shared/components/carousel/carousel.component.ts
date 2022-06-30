import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {CarouselItemInterface} from '../../interfaces/carousel.interface'
import {carouselAnimation} from "../../helpers/carousel.animation";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    carouselAnimation()
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselComponent implements OnInit {
  @Input() slides: CarouselItemInterface[] = [];

  public currentSlide: number = 0;
  public activeSlide?: CarouselItemInterface;
  constructor() { }

  ngOnInit(): void {
    this.activeSlide = this.slides[0];
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

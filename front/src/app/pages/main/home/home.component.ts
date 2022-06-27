import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {carouselItem} from "../../../shared/interfaces/carousel.interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  public slides: carouselItem[] = [
    {
      imgSrc: 'https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
      title: 'Candy',
      rating: 4.6,
      brand: 'Nestle',
      url: 'nestle-candle',
      category: 'Food'
    },
    {
      imgSrc: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80',
      title: 'Cherry',
      rating: 4.9,
      brand: 'Havas',
      url: 'havas-cherry',
      category: 'Food'
    },
    {
      imgSrc: 'https://images.unsplash.com/photo-1557800634-7bf3c7305596?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2001&q=80',
      title: 'Orange',
      rating: 4.1,
      brand: 'Havas',
      url: 'havas-orange',
      category: 'Food'
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}

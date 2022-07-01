import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {HomePageService} from "../../../shared/services/home-page.service";
import {ProductCardInterface} from "../../../shared/interfaces/product.interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  public productList: ProductCardInterface[] = [
    {
      title: 'Orange1',
      imgUrl: 'https://images.unsplash.com/photo-1557800634-7bf3c7305596?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2001&q=80',
      averageRating: 4.6,
      id: '123'
    },
    {
      title: 'Orange',
      imgUrl: 'https://images.unsplash.com/photo-1557800634-7bf3c7305596?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2001&q=80',
      averageRating: 4.6,
      id: '123'
    },
    {
      title: 'Orange',
      imgUrl: 'https://images.unsplash.com/photo-1557800634-7bf3c7305596?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2001&q=80',
      averageRating: 4.6,
      id: '123'
    },
    {
      title: 'Orange',
      imgUrl: 'https://images.unsplash.com/photo-1557800634-7bf3c7305596?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2001&q=80',
      averageRating: 4.6,
      id: '123'
    },
    {
      title: 'Orange',
      imgUrl: 'https://images.unsplash.com/photo-1557800634-7bf3c7305596?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2001&q=80',
      averageRating: 4.6,
      id: '123'
    },
    {
      title: 'Orange',
      imgUrl: 'https://images.unsplash.com/photo-1557800634-7bf3c7305596?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2001&q=80',
      averageRating: 4.6,
      id: '123'
    },
    {
      title: 'Orange2',
      imgUrl: 'https://images.unsplash.com/photo-1557800634-7bf3c7305596?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2001&q=80',
      averageRating: 4.6,
      id: '123'
    }
  ]

  constructor(public data: HomePageService) { }

  ngOnInit(): void {
  }

}

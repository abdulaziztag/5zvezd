import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {HomePageService} from "../../../shared/services/home-page.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  constructor(public data: HomePageService) { }

  public flag = false;

  ngOnInit(): void {
  }

}

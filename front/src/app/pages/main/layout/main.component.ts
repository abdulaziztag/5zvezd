import { Component, OnInit } from '@angular/core';
import { TabInterface } from '../../../shared/interfaces/tab.interface'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainLayoutComponent implements OnInit {
  public tabs: TabInterface[] = [
    {
      title: 'Brands',
      list: [
        {
          listItemTitle: 'Pepsi-Co',
          url: '/brand/pepsi-co'
        },
        {
          listItemTitle: 'Lactel',
          url: '/brand/lactel'
        }
      ]
    },
    {
      title: 'Categories',
      list: [
        {
          listItemTitle: 'Medicine',
          url: '/category/medicine'
        },
        {
          listItemTitle: 'Drinks',
          url: '/category/drinks'
        }
      ]
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { TabInterface } from '../../../shared/models/tab.interface'

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
          url: '/brands/pepsi-co'
        },
        {
          listItemTitle: 'Lactel',
          url: '/brands/lactel'
        }
      ]
    },
    {
      title: 'Categories',
      list: [
        {
          listItemTitle: 'Medicine',
          url: '/categories/medicine'
        },
        {
          listItemTitle: 'Drinks',
          url: '/categories/drinks'
        }
      ]
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {TabInterface} from "../../models/tab.interface";

@Component({
  selector: 'app-drawer-list',
  templateUrl: './drawer-list.component.html',
  styleUrls: ['./drawer-list.component.sass']
})
export class DrawerListComponent implements OnInit {
  @Input() tab?: TabInterface

  public activeSubList: boolean = false
  constructor() { }

  ngOnInit(): void {
  }

  public toggleS(element: any): void {
    if (this.activeSubList) {
      element.style.maxHeight = 0
    } else {
      element.style.maxHeight = element.scrollHeight + 'px'
    }
    this.activeSubList = !this.activeSubList
  }
}

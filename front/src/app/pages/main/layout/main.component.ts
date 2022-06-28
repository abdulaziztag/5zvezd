import { Component, OnInit } from '@angular/core';
import { TabInterface } from '../../../shared/interfaces/tab.interface'
import {tabs} from "../../../shared/helpers/tabs.data";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainLayoutComponent implements OnInit {
  public tabs: TabInterface[] = tabs()
  constructor() { }

  ngOnInit(): void {
  }

}

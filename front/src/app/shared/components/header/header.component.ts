import { Component, OnInit } from '@angular/core';
import {DrawerService} from "../../services/drawer.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  constructor(private drawerService: DrawerService) { }

  ngOnInit(): void {
  }
  public openDrawer(): void {
    this.drawerService.setDrawer(true)
  }
}

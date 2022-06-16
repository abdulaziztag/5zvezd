import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DrawerService} from "../../services/drawer.service";
import {Subscription} from "rxjs";
import {TabInterface} from "../../models/tab.interface";

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.sass']
})
export class DrawerComponent implements OnInit, OnDestroy {
  @Input() tabs: TabInterface[] = []

  private subscription?: Subscription
  public drawerState: boolean = false
  constructor(public drawerService: DrawerService) { }

  ngOnInit(): void {
    this.subscription = this.drawerService.getDrawer().subscribe(drawerState => {
      this.drawerState = drawerState
    })
  }

  public close(): void {
    this.drawerService.setDrawer(false)
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }

}

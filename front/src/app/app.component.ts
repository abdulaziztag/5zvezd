import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {DrawerService} from "./shared/services/drawer.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  @HostBinding('class.openedDrawer') get promoted() {
    return this.drawerState
  }
  public drawerState: boolean = false
  private subscription?: Subscription
  constructor(public drawerService: DrawerService) { }

  ngOnInit(): void {
    this.subscription = this.drawerService.getDrawer().subscribe(drawerState => {
      this.drawerState = drawerState
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }
}

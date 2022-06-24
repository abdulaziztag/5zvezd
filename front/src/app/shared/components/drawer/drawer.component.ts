import {ChangeDetectionStrategy, Component, Inject, Input, OnDestroy, OnInit, Optional} from '@angular/core';
import {DrawerService, DrawerService1, DrawerServiceBase, DrawerServiceInterface} from "../../services/drawer.service";
import {TabInterface} from "../../interfaces/tab.interface";
import {CONFIG_PROVIDER, ConfigInterface, DRAWER_INTERFACE} from "../../../app.module";

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawerComponent implements OnInit, OnDestroy {
  @Input() tabs: TabInterface[] = [];

  constructor(@Optional() public drawerService: DrawerServiceBase, @Inject(CONFIG_PROVIDER) public config: ConfigInterface) { }

  ngOnInit(): void {

  }

  public close(): void {
    this.drawerService.setDrawer(false)
  }

  ngOnDestroy() {
  }

}

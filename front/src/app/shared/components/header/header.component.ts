import {ChangeDetectionStrategy, Component, forwardRef, Inject, Input, OnInit} from '@angular/core';
import {DrawerService, DrawerServiceBase, DrawerServiceInterface} from "../../services/drawer.service";
import {TabInterface} from "../../interfaces/tab.interface";
import {CONFIG_PROVIDER, ConfigInterface, DRAWER_INTERFACE, INIT_CONF} from "../../../app.module";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
  providers: [{
    provide: forwardRef(() => CONFIG_PROVIDER),
    useFactory: (config: number) => {
        return { textColor: config ? 'green' : 'blue' }
    },
    deps: [forwardRef(() => INIT_CONF)]
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Input() tabs: TabInterface[] = [];
  constructor(public drawerService: DrawerServiceBase, @Inject(CONFIG_PROVIDER) public config: ConfigInterface) { }

  ngOnInit(): void {
  }
  public openDrawer(): void {
    this.drawerService.setDrawer(true);
  }
}

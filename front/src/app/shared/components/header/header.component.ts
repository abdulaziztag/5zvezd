import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {DrawerService} from "../../services/drawer.service";
import {TabInterface} from "../../interfaces/tab.interface";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Input() tabs: TabInterface[] = []
  constructor(private drawerService: DrawerService) { }

  ngOnInit(): void {
  }
  public openDrawer(): void {
    this.drawerService.setDrawer(true);
  }
}

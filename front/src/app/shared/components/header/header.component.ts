import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {DrawerService} from "../../services/drawer.service";
import {TabInterface} from "../../interfaces/tab.interface";
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Input() tabs: TabInterface[] = [];
  constructor(
    private drawerService: DrawerService,
    public tokenService: TokenStorageService
  ) { }

  ngOnInit(): void {
  }
  public openDrawer(): void {
    this.drawerService.setDrawer(true);
  }
}

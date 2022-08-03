import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {DrawerService} from "../../services/drawer.service";
import {TabInterface} from "../../interfaces/tab.interface";
import {TokenStorageService} from "../../services/token-storage.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawerComponent implements OnInit {
  @Input() tabs: TabInterface[] = [];
  public searchInput = new FormControl('');

  constructor(
    public drawerService: DrawerService,
    public tokenService: TokenStorageService,
    public router: Router,
    public userService: UserService,
  ) {
  }

  ngOnInit(): void {

  }

  public close(): void {
    this.drawerService.setDrawer(false);
  }

  public search(): void {
    this.searchInput.value !== '' &&
    this.router.navigate(['/all'], {
      queryParams: {
        title: this.searchInput.value
      }
    });
    this.drawerService.setDrawer(false);
  }

}

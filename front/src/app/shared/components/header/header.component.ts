import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {DrawerService} from "../../services/drawer.service";
import {TabInterface} from "../../interfaces/tab.interface";
import {TokenStorageService} from "../../services/token-storage.service";
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Input() tabs: TabInterface[] = [];
  public searchInput = new FormControl('');

  constructor(
    private drawerService: DrawerService,
    public tokenService: TokenStorageService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  public goToCatalog(queryKey: string, queryValue: string): void {
    this.router.navigate(['/all'], {
      queryParams: {
        [queryKey]: queryValue
      }
    });
  }

  public search(): void {
    this.searchInput.value !== '' &&
    this.router.navigate(['/all'], {
      queryParams: {
        title: this.searchInput.value
      }
    });
  }

  public openDrawer(): void {
    this.drawerService.setDrawer(true);
  }
}

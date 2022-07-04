import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {TabInterface} from "../../interfaces/tab.interface";
import {Router} from "@angular/router";
import {DrawerService} from "../../services/drawer.service";

@Component({
  selector: 'app-drawer-list',
  templateUrl: './drawer-list.component.html',
  styleUrls: ['./drawer-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawerListComponent implements OnInit {
  @Input() tab?: TabInterface;

  public activeSubList: boolean = false;
  constructor(
    private router: Router,
    private drawer: DrawerService
  ) { }

  ngOnInit(): void {
  }

  public goToCatalog(queryKey: string, queryValue: string): void {
    this.router.navigate(['/all'], {
      queryParams: {
        [queryKey]: queryValue
      }
    });
    this.drawer.setDrawer(false);
  }

  public toggleSubList(element: any): void {
    if (this.activeSubList) {
      element.style.maxHeight = 0;
    } else {
      element.style.maxHeight = element.scrollHeight + 'px';
    }
    this.activeSubList = !this.activeSubList;
  }
}

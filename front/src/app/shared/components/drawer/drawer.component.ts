import {ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DrawerService} from "../../services/drawer.service";
import {TabInterface} from "../../interfaces/tab.interface";

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawerComponent implements OnInit, OnDestroy {
  @Input() tabs: TabInterface[] = []
  @ViewChild('file', {static: true}) private nmadur?: ElementRef

  constructor(public drawerService: DrawerService) { }

  ngOnInit(): void {
  }

  public close(): void {
    this.drawerService.setDrawer(false)
  }

  public chooseAvatar(): void {
    this.nmadur?.nativeElement?.click()
  }

  ngOnDestroy() {
  }

}

import {ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DrawerService} from "../../services/drawer.service";
import {TabInterface} from "../../interfaces/tab.interface";
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawerComponent implements OnInit, OnDestroy {
  @Input() tabs: TabInterface[] = []
  @ViewChild('file', {static: true}) private fileInput?: ElementRef

  constructor(
    public drawerService: DrawerService,
    public tokenService: TokenStorageService
  ) { }

  ngOnInit(): void {
  }

  public close(): void {
    this.drawerService.setDrawer(false)
  }

  public chooseAvatar(): void {
    this.fileInput?.nativeElement?.click()
  }

  ngOnDestroy() {
  }

}

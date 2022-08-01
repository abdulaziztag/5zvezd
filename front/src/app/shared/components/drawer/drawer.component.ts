import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DrawerService} from "../../services/drawer.service";
import {TabInterface} from "../../interfaces/tab.interface";
import {TokenStorageService} from "../../services/token-storage.service";
import {AlertService} from "../../services/alert.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {UserSettingsDialogComponent} from "../user-settings-dialog/user-settings-dialog.component";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawerComponent implements OnInit, OnDestroy {
  @Input() tabs: TabInterface[] = []
  public avatar: string = ''

  constructor(
    public drawerService: DrawerService,
    public tokenService: TokenStorageService,
    private alertService: AlertService,
    public router: Router,
    private dialog: MatDialog,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getAvatar().subscribe(data => {
      this.avatar = data
    })
    this.userService.setAvatar(this.tokenService.getUser().img)
  }

  public close(): void {
    this.drawerService.setDrawer(false);
  }

  public changeAvatar(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file)
  }

  public signOut(): void {
    this.tokenService.signOut();
    this.drawerService.setDrawer(false);
    this.alertService.openSnackBar('Successfully signed out!');
    this.router.navigate(['/']);
  }

  public openSettings(): void {
    this.dialog.open(UserSettingsDialogComponent, {
      disableClose: true
    })
  }

  ngOnDestroy() {
  }

}

import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {UserSettingsDialogComponent} from "../user-settings-dialog/user-settings-dialog.component";
import {DrawerService} from "../../services/drawer.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {UserService} from "../../services/user.service";
import {AlertService} from "../../services/alert.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountMenuComponent implements OnInit, OnDestroy {
  public avatar: string = '';
  private notifier = new Subject<void>();
  public loader: boolean = false;

  constructor(
    public drawerService: DrawerService,
    public tokenService: TokenStorageService,
    public userService: UserService,
    private alertService: AlertService,
    private dialog: MatDialog,
    private ref: ChangeDetectorRef
  ) { }

  public changeAvatar(event: Event): void {
    this.loader = true
    const file = (event.target as HTMLInputElement).files[0];
    this.userService.uploadAvatar(file)
      .pipe(takeUntil(this.notifier))
      .subscribe((data) => {
        this.tokenService.saveUser({...this.tokenService.getUser(), img: data.img})
        this.loader = false
        this.userService.setAvatar(data.img)
        this.alertService.openSnackBar(data.message)
      })
  }

  public signOut(): void {
    this.tokenService.signOut();
    this.drawerService.setDrawer(false);
    this.alertService.openSnackBar('Successfully signed out!');
  }

  public openSettings(): void {
    this.dialog.open(UserSettingsDialogComponent, {
      disableClose: true
    })
  }

  ngOnInit(): void {
    this.userService.getAvatar()
      .pipe(takeUntil(this.notifier))
      .subscribe(data => {
        this.avatar = data;
        this.ref.markForCheck();
      });
    this.userService.setAvatar(this.tokenService.getUser().img);
  }

  ngOnDestroy() {
    this.notifier.next()
    this.notifier.complete()
  }
}

import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DrawerService} from "../../services/drawer.service";
import {TabInterface} from "../../interfaces/tab.interface";
import {TokenStorageService} from "../../services/token-storage.service";
import {AlertService} from "../../services/alert.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {UserSettingsDialogComponent} from "../user-settings-dialog/user-settings-dialog.component";
import {UserService} from "../../services/user.service";
import {Subject, takeUntil} from "rxjs";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawerComponent implements OnInit, OnDestroy {
  @Input() tabs: TabInterface[] = [];
  public avatar: string = '';
  private notifier = new Subject<void>();
  public loader: boolean = false;
  public searchInput = new FormControl('');

  constructor(
    public drawerService: DrawerService,
    public tokenService: TokenStorageService,
    private alertService: AlertService,
    public router: Router,
    private dialog: MatDialog,
    public userService: UserService,
    private ref: ChangeDetectorRef
  ) {
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

  public close(): void {
    this.drawerService.setDrawer(false);
  }

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
    this.router.navigate(['/']);
  }

  public openSettings(): void {
    this.dialog.open(UserSettingsDialogComponent, {
      disableClose: true
    })
  }

  public search(): void {
    this.router.navigate(['/all'], {
      queryParams: {
        title: this.searchInput.value
      }
    });
    this.drawerService.setDrawer(false);
  }

  ngOnDestroy() {
    this.notifier.next()
    this.notifier.complete()
  }

}

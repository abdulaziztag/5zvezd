import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Subject, takeUntil} from "rxjs";
import {FormControl} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-user-settings-dialog',
  templateUrl: './user-settings-dialog.component.html',
  styleUrls: ['./user-settings-dialog.component.scss']
})
export class UserSettingsDialogComponent implements OnInit, OnDestroy {

  private notifier = new Subject<void>()
  public hideName = new FormControl(true)
  public hideAvatar = new FormControl(true)
  public loader: boolean = false

  constructor(
    public userService: UserService,
    private dialog: MatDialog,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.loader = true
    this.userService
      .requestSettings()
      .pipe(takeUntil(this.notifier))
      .subscribe((data) => {
        this.hideName.setValue(data.settings.hideName)
        this.hideAvatar.setValue(data.settings.hideAvatar)
        this.loader = false
      })
  }

  public save(): void {
    this.userService.changeSettings({
      hideName: this.hideName.value,
      hideAvatar: this.hideAvatar.value
    })
      .pipe(takeUntil(this.notifier))
      .subscribe((data) => {
        this.dialog.closeAll()
        this.alert.openSnackBar(data.message)
      })
  }

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }
}

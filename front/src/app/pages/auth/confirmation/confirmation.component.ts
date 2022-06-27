import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {AuthService} from "../../../shared/services/auth.service";
import {AlertService} from "../../../shared/services/alert.service";
import {LoaderService} from "../../../shared/services/loader.service";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationComponent implements OnInit, OnDestroy {
  private notifier = new Subject<void>()
  public code: string = ''
  constructor(
    public route: ActivatedRoute,
    private authService: AuthService,
    private alertService: AlertService,
    public loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.loaderService.setLoader(true)
    this.route.params.pipe(takeUntil(this.notifier)).subscribe(params => {
      this.code = params['code']
    })
    this.authService.confirmEmail(this.code).pipe(takeUntil(this.notifier)).subscribe(() => {
      this.loaderService.setLoader(false)
    }, (error) => {
      this.alertService.openSnackBar(
        error.error.message || 'Something went wrong, please refresh the page',
        'error',
        1000*60*10
      )
    })
  }

  ngOnDestroy() {
    this.notifier.next()
    this.notifier.complete()
  }
}

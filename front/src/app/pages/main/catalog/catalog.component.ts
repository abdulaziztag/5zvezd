import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogComponent implements OnInit, OnDestroy {
  private notifier = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.notifier))
      .subscribe(params => {
          Object.keys(params).forEach(key => {
            console.log(key, params[key])
          });
        }
      );
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

}

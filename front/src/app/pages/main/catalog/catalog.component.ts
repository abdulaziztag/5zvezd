import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {tabs} from 'src/app/shared/helpers/tabs.data';
import {TabInterface} from "../../../shared/interfaces/tab.interface";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogComponent implements OnInit, OnDestroy {
  private notifier = new Subject<void>();
  public tabs: TabInterface[] = tabs()
  public category: string;
  public brand: string;

  constructor(
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.notifier))
      .subscribe(params => {
          this.brand = params?.['brand'];
          this.category = params?.['category'];
        }
      );
  }

  public changeValueBrand(): void {
    console.log(this.brand)
  }

  public changeValueCategory(): void {
    console.log(this.category)
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

}

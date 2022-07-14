import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {tabs} from 'src/app/shared/helpers/tabs.data';
import {TabInterface} from "../../../shared/interfaces/tab.interface";
import {FormBuilder, FormGroup} from "@angular/forms";

type RouteParams = Params | {brand: string, category: string};

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogComponent implements OnInit, OnDestroy {
  private notifier = new Subject<void>();
  public form: FormGroup = new FormGroup({});
  public tabs: TabInterface[] = tabs()
  public chips: string[] = []

  constructor(
    private route: ActivatedRoute,
    public fb: FormBuilder
  ) {
    this.form = fb.group({
      brand: [],
      category: []
    })
  }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.notifier))
      .subscribe((params: RouteParams) => {
          this.form.patchValue({
            brand: [params.brand],
            category: [params.category]
          });
        this.chips = [params.brand, params.category].filter((item) => !!item);
        }
      );
  }

  public get getForm() {
    return this.form.controls
  }

  public filter(): void {
    this.chips = [...this.getForm['brand'].value, ...this.getForm['category'].value]
  }

  public deleteChip(chip: string): void {
    this.chips = this.chips.filter(e => e !== chip)
    const brand = this.getForm['brand'].value.filter((item: string) => this.chips.includes(item));
    const category = this.getForm['category'].value.filter((item: string) => this.chips.includes(item));
    this.form.patchValue({
      brand,
      category
    })
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

}

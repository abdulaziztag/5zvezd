import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {tabs} from 'src/app/shared/helpers/tabs.data';
import {TabInterface} from "../../../shared/interfaces/tab.interface";
import {FormBuilder, FormGroup} from "@angular/forms";

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
      .subscribe(params => {
          this.form.patchValue({
            brand: [params['brand']],
            category: [params['category']]
          })
        params['brand'] && this.chips.push(params['brand'])
        params['category'] && this.chips.push(params['category'])
        }
      );
  }

  public get getForm() {
    return this.form.controls
  }

  public filter(): void {
    this.chips = []
    this.getForm['brand'].value.forEach((key: string) => {
      key && this.chips.push(key)
    })
    this.getForm['category'].value.forEach((key: string) => {
      key && this.chips.push(key)
    })
  }

  public deleteChip(chip: string): void {
    this.chips = this.chips.filter(e => e !== chip)
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

}

import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {tabs} from 'src/app/shared/helpers/tabs.data';
import {TabInterface} from "../../../shared/interfaces/tab.interface";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ProductService} from "../../../shared/services/product.service";
import {LoaderService} from "../../../shared/services/loader.service";
import {FilteredProductsInterface} from "../../../shared/interfaces/product.interface";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogComponent implements OnInit, OnDestroy {
  private notifier = new Subject<void>();
  public form: FormGroup = new FormGroup({});
  public tabs: TabInterface[] = tabs();
  public chips: string[] = [];
  public searchInput: FormControl = new FormControl('');
  private tempSearchInput: string = '';

  constructor(
    private route: ActivatedRoute,
    public fb: FormBuilder,
    public productService: ProductService,
    public loader: LoaderService
  ) {
    this.form = fb.group({
      brand: [],
      category: []
    });
  }

  ngOnInit(): void {
    const params = this.route.snapshot.queryParams;
    const title = params['title'] !== undefined && params['title'];
    if (title) {
      this.searchInput.setValue(params['title']);
      this.search();
    }
    this.form.patchValue({
      brand: [params['brand']],
      category: [params['category']]
    })
    this.chips = [...this.chips, params['brand'], params['category']].filter((item) => !!item);
    this.applyFilters();
  }

  public get getForm() {
    return this.form.controls;
  }

  public filter(): void {
    this.chips = [
      ...this.getForm['brand'].value,
      ...this.getForm['category'].value,
      this.searchInput.value
    ].filter((key: string) => (key !== undefined) && (key !== ''));
  }

  public search(): void {
    const index = this.chips.findIndex((key: string) => key === this.tempSearchInput)
    if (index !== -1) {
      this.chips[index] = this.searchInput.value
    } else {
      this.chips.push(this.searchInput.value);
    }
    this.tempSearchInput = this.searchInput.value
    this.chips = this.chips.filter((key: string) => key !== '')
  }

  public applyFilters(): void {
    this.loader.setLoader(true)
    this.productService.requestFilteredProducts(
      this.searchInput.value,
      this.getForm['brand'].value.filter((key: string) => key !== undefined),
      this.getForm['category'].value.filter((key: string) => key !== undefined),
      null,
      300,
      250
    ).pipe(takeUntil(this.notifier))
      .subscribe(data => {
        const uniqueIds: string[] = [];
        const unique = data.filteredProducts.filter((element: FilteredProductsInterface) => {
          const isDuplicate = uniqueIds.includes(element._id);
          if (!isDuplicate) {
            uniqueIds.push(element._id);
            return true;
          }
          return false;
        });
        this.productService.setFiltered(unique)
        this.loader.setLoader(false)
      })
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

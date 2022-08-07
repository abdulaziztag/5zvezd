import { Component, OnInit } from '@angular/core';
import {TabInterface} from "../../interfaces/tab.interface";
import {tabs} from "../../helpers/tabs.data";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DashboardService} from "../../services/dashboard.service";
import {AlertService} from "../../services/alert.service";
import {LoaderService} from "../../services/loader.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  public tabs: TabInterface[] = tabs();
  public selectedFile: any = null;
  public form: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    private alertService: AlertService,
    public loader: LoaderService
  ) {
    this.form = fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      category: ['', [Validators.required]]
    })
  }

  public get productForm() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.loader.setLoader(false)
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] ?? null;
  }

  addProduct() {
    this.loader.setLoader(true);
    this.dashboardService.addProduct({
      title: this.productForm['title'].value,
      description: this.productForm['description'].value,
      category: this.productForm['category'].value,
      company: this.productForm['brand'].value,
      img: this.selectedFile,
    }).subscribe(data => {
      this.alertService.openSnackBar(data.message);
      this.form.reset();
      this.selectedFile = null;
      this.loader.setLoader(false);
    }, error => {
      this.alertService.openSnackBar(error.error.message, 'error')
      this.loader.setLoader(false);
    })
  }
}

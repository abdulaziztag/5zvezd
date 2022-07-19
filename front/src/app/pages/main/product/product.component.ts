import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {ProductService} from "../../../shared/services/product.service";
import {TokenStorageService} from "../../../shared/services/token-storage.service";
import {MatDialog} from '@angular/material/dialog';
import {AddReviewDialogComponent} from "../../../shared/components/add-review-dialog/add-review-dialog.component";
import {AlertService} from "../../../shared/services/alert.service";

// https://gist.github.com/958841
function base64ArrayBuffer(arrayBuffer: number[]) {
  let base64    = ''
  const encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  let bytes         = new Uint8Array(arrayBuffer)
  let byteLength    = bytes.byteLength
  let byteRemainder = byteLength % 3
  let mainLength    = byteLength - byteRemainder
  let a, b, c, d
  let chunk
  for (let i = 0; i < mainLength; i = i + 3) {
    chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]
    a = (chunk & 16515072) >> 18
    b = (chunk & 258048)   >> 12
    c = (chunk & 4032)     >>  6
    d = chunk & 63
    base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
  }
  if (byteRemainder == 1) {
    chunk = bytes[mainLength]
    a = (chunk & 252) >> 2
    b = (chunk & 3)   << 4
    base64 += encodings[a] + encodings[b] + '=='
  } else if (byteRemainder == 2) {
    chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]
    a = (chunk & 64512) >> 10
    b = (chunk & 1008)  >>  4
    c = (chunk & 15)    <<  2
    base64 += encodings[a] + encodings[b] + encodings[c] + '='
  }
  return base64
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  @ViewChild('el', {static: true}) private el: ElementRef

  private notifier = new Subject<void>();
  public convertedBase64: string = ''
  constructor(
    private route: ActivatedRoute,
    public productService: ProductService,
    public tokenService: TokenStorageService,
    private dialog: MatDialog,
    private alertService: AlertService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.productService
      .requestProduct(this.route.snapshot.params['productId'])
      .pipe(takeUntil(this.notifier))
      .subscribe(data => {
        this.convertedBase64 = base64ArrayBuffer(data.product.img.data.data)
        this.productService.setProduct(data.product)
      }, error => {
        this.alertService.openSnackBar(error.error.message, 'error');
        this.router.navigate([
          '/error'
        ])
      });
  }

  public openDialog(): void {
    this.dialog.open(AddReviewDialogComponent, {
      disableClose: true,
      minWidth: '70vw'
    });
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}

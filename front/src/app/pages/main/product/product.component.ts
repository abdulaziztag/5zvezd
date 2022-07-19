import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {ProductService} from "../../../shared/services/product.service";
import {TokenStorageService} from "../../../shared/services/token-storage.service";
import {MatDialog} from '@angular/material/dialog';
import {AddReviewDialogComponent} from "../../../shared/components/add-review-dialog/add-review-dialog.component";
import {AlertService} from "../../../shared/services/alert.service";

function base64ArrayBuffer(arrayBuffer: any) {
  let base64    = ''
  let encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

  let bytes         = new Uint8Array(arrayBuffer)
  let byteLength    = bytes.byteLength
  let byteRemainder = byteLength % 3
  let mainLength    = byteLength - byteRemainder

  let a, b, c, d
  let chunk

  // Main loop deals with bytes in chunks of 3
  for (let i = 0; i < mainLength; i = i + 3) {
    // Combine the three bytes into a single integer
    chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]

    // Use bitmasks to extract 6-bit segments from the triplet
    a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
    b = (chunk & 258048)   >> 12 // 258048   = (2^6 - 1) << 12
    c = (chunk & 4032)     >>  6 // 4032     = (2^6 - 1) << 6
    d = chunk & 63               // 63       = 2^6 - 1

    // Convert the raw binary segments to the appropriate ASCII encoding
    base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
  }

  // Deal with the remaining bytes and padding
  if (byteRemainder == 1) {
    chunk = bytes[mainLength]

    a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2

    // Set the 4 least significant bits to zero
    b = (chunk & 3)   << 4 // 3   = 2^2 - 1

    base64 += encodings[a] + encodings[b] + '=='
  } else if (byteRemainder == 2) {
    chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]

    a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
    b = (chunk & 1008)  >>  4 // 1008  = (2^6 - 1) << 4

    // Set the 2 least significant bits to zero
    c = (chunk & 15)    <<  2 // 15    = 2^4 - 1

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

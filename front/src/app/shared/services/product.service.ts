import {Injectable} from "@angular/core";
import {ProductInterface} from "../interfaces/product.interface";
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";

const AUTH_API: string = environment.host + 'product/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  public product$ = new Subject<ProductInterface>();

  constructor(
    private http: HttpClient
  ) {}

  requestProduct(productId: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'get',
      {
        productId
      },
      httpOptions
    );
  }

  public setProduct(product: ProductInterface): void {
    this.product$.next(product)
  }
}

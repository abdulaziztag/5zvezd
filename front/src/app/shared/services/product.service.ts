import {Injectable} from "@angular/core";
import {ProductCardInterface, ProductInterface} from "../interfaces/product.interface";
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
  public recentlyAdded$ = new Subject<ProductInterface[]>()
  public popular$ = new Subject<ProductCardInterface[]>()
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

  requestSortedProducts(
    field: string,
    fieldValue: string,
    limit = 12
  ): Observable<{ filteredProduct: ProductCardInterface[] }> {
    return this.http.post<{ filteredProduct: ProductCardInterface[] }>(
      AUTH_API + 'sortByField',
      {
        field,
        fieldValue,
        limit
      },
      httpOptions
    );
  }

  public setProduct(product: ProductInterface): void {
    this.product$.next(product);
  }

  public setPopular(product: ProductCardInterface[]): void {
    this.popular$.next(product);
  }
}

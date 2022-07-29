import {Injectable} from "@angular/core";
import {FilteredProductsInterface, ProductCardInterface, ProductInterface} from "../interfaces/product.interface";
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
  public recentlyAdded$ = new Subject<ProductCardInterface[]>()
  public popular$ = new Subject<ProductCardInterface[]>()
  public mostExpensive$ = new Subject<ProductCardInterface[]>()
  public filtered$ = new Subject<FilteredProductsInterface[]>()
  public carouselSlides$ = new Subject<FilteredProductsInterface[]>()

  constructor(
    private http: HttpClient
  ) {}

  requestProduct(productId: string): Observable<{product: {product: ProductInterface, img: string}}> {
    return this.http.post<{product: {product: ProductInterface, img: string}}>(
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

  requestFilteredProducts(
    title?: string,
    company?: string[],
    category?: string[],
    productId?: string[],
    width?: number,
    height?: number
  ): Observable<any> {
    return this.http.post(
      AUTH_API + 'filter',
      {
        title,
        company,
        category,
        productId,
        width,
        height
      },
      httpOptions
    )
  }

  public setProduct(product: ProductInterface): void {
    this.product$.next(product);
  }

  public setPopular(product: ProductCardInterface[]): void {
    this.popular$.next(product);
  }

  public setRecently(product: ProductCardInterface[]): void {
    this.recentlyAdded$.next(product);
  }

  public setMostExpensive(product: ProductCardInterface[]): void {
    this.mostExpensive$.next(product);
  }

  public setFiltered(product: FilteredProductsInterface[]): void {
    this.filtered$.next(product);
  }

  public setCarouselItems(products: FilteredProductsInterface[]): void {
    this.carouselSlides$.next(products)
  }

}

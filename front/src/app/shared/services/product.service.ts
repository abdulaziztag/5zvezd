import {Injectable} from "@angular/core";
import {ProductInterface} from "../interfaces/product.interface";
import {Observable, of, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private product$: Subject<ProductInterface> = new Subject<ProductInterface>()

  getProduct(): Observable<ProductInterface> {
    return of({
      title: 'Candle',
      averageRating: 4.5,
      category: 'Food',
      company: 'Nestle',
      description: 'Sweet candle',
      imgUrl: 'https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
      minCost: 1.5,
      maxCost: 3,
      publishedData: 1656415425994,
    })
  }

  setProduct(productId: string): void {
    this.product$.next({
      title: 'Candle',
      averageRating: 4.5,
      category: 'Food',
      company: 'Nestle',
      description: 'Sweet candle',
      imgUrl: 'https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
      minCost: 1.5,
      maxCost: 3,
      publishedData: 1656415425994,
    })
  }
}

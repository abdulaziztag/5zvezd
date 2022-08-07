import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";

const AUTH_API: string = environment.host;

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(
    private http: HttpClient
  ) {

  }

  public addProduct(
    data: {
      title: string,
      description: string,
      category: string,
      company: string,
      img: string | Blob
    }) {
    const fb = new FormData();
    fb.append('title', data.title);
    fb.append('description', data.description);
    fb.append('category', data.category);
    fb.append('company', data.company);
    fb.append('img', data.img);
    return this.http.post<{ message: string, img: string }>(
      AUTH_API + 'product/add',
      fb
    );
  }

  public deleteProduct(productId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      AUTH_API + 'product/delete',
      {
        body: {
          productId
        }
      }
    )
  }

  public checkForAdmin(): Observable<{ message: string }> {
    return this.http.get<{ message: string }>(
      AUTH_API + 'user/check',
    );
  }
}

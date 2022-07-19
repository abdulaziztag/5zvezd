import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CommentInterface} from "../interfaces/comment.interface";

const AUTH_API: string = environment.host + 'comment/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})

export class CommentService {
  public comment$ = new Subject<CommentInterface[]>();

  constructor(
    private http: HttpClient
  ) {}

  public requestComment(
    productId: string,
    field = 'rating',
    fieldValue = 'desc',
    limit = 1
  ): Observable<any> {
    return this.http.post(
      AUTH_API + 'sortByField',
      {
        productId,
        field,
        fieldValue,
        limit
      },
      httpOptions
    );
  }

  public requestAllComments(productId: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'get',
      {
        productId,
      },
      httpOptions
    );
  }

  public setComment(comment: CommentInterface[]): void {
    this.comment$.next(comment)
  }
}

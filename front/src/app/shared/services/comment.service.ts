import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CommentInterface} from "../interfaces/comment.interface";

const AUTH_API: string = environment.host + 'comment/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})

export class CommentService {
  public comment$ = new Subject<CommentInterface[]>();
  public commentOwner$ = new Subject<CommentInterface>()

  constructor(
    private http: HttpClient
  ) {
  }

  public requestComment(
    productId: string,
    field = 'rating',
    fieldValue = 'desc',
    limit: number = 1,
    userId?: string
  ): Observable<any> {
    return this.http.post(
      AUTH_API + 'sortByField',
      {
        productId,
        field,
        fieldValue,
        limit,
        userId
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

  public addComment(
      title: string,
      cost: number,
      rating: number,
      body: string,
      productId: string
    ): Observable<{ message: string, averageRating: number }> {
    return this.http.post<{ message: string, averageRating: number }>(
      AUTH_API + 'add',
      {
        title,
        cost,
        rating,
        body,
        productId
      },
      httpOptions
    )
  }

  public deleteComment(productId: string): Observable<{ message: string, averageRating: number }> {
    return this.http.post<{ message: string, averageRating: number }>(
      AUTH_API + 'delete',
      {
        productId
      }
    )
  }

  public setComment(comment: CommentInterface[]): void {
    this.comment$.next(comment)
  }

  public setCommentOwner(comment: CommentInterface): void {
    this.commentOwner$.next(comment)
  }
}

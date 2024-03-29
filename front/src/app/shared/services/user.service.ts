import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";

const AUTH_API: string = environment.host + 'user/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private avatar$ = new Subject<string>()
  private avatar = this.avatar$.asObservable()

  constructor(private http: HttpClient) {
  }

  public requestSettings(): Observable<{ settings: {hideName: boolean, hideAvatar: boolean} }> {
    return this.http.get<{ settings: {hideName: boolean, hideAvatar: boolean} }>(
      AUTH_API + 'settings',
      httpOptions
    )
  }

  public changeSettings(settings: {hideName: boolean, hideAvatar: boolean}): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      AUTH_API + 'change',
      {
        settings
      },
      httpOptions
    )
  }

  public uploadAvatar(img: string | Blob): Observable<{ message: string, img: string }> {
    const fb = new FormData()
    fb.append('img', img)
    return this.http.post<{ message: string, img: string }>(
      AUTH_API + 'upload',
      fb
    )
  }

  public setAvatar(img: string) {
    this.avatar$.next(img)
  }

  public getAvatar(): Observable<string> {
    return this.avatar
  }
}

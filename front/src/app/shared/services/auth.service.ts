import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

const AUTH_API: string = 'http://localhost:3000/api/auth/'
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(email: string, password: string): Observable<any> {
    return this.http.post<any>(
      AUTH_API + 'login',
      {
        email, password
      },
      httpOptions
    )
  }

  public register(
    firstName: string,
    email: string,
    password: string,
    lastName?: string
  ): Observable<any> {
    return this.http.post(
      AUTH_API + 'register',
      {
        firstName,
        lastName,
        password,
        email
      },
      httpOptions
    )
  }

  public confirmEmail(code: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'confirmation',
      {
        confirmationCode: code
      },
      httpOptions
    )
  }
}

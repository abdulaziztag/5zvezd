import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loader$ = new BehaviorSubject<boolean>(true)
  constructor() { }

  public setLoader(drawer: boolean): void {
    this.loader$.next(drawer)
  }

  public getLoader(): Subject<boolean> {
    return this.loader$
  }
}

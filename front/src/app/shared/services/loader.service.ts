import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loader$ = new BehaviorSubject<boolean>(true)
  constructor() { }

  public setLoader(drawer: boolean) {

    this.loader$.next(drawer)
  }

  public getLoader() {
    return this.loader$
  }
}

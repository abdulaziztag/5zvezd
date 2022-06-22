import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  private drawer$ = new Subject<boolean>()
  constructor() { }

  public setDrawer(drawer: boolean): void {

    this.drawer$.next(drawer)
  }

  public getDrawer(): Subject<boolean> {
    return this.drawer$
  }
}

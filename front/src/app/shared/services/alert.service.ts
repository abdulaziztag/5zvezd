import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, color = 'success', duration = 3000): void {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration,
      panelClass: ['panel-class', color]
    });
  }
}

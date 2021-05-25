import { Injectable } from '@angular/core';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Injectable({
    providedIn: 'root',
})
export class HelperService {
    horizontalPosition: MatSnackBarHorizontalPosition = 'start';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    isLoading = false;

    constructor(
        private _snackBar: MatSnackBar,
    ) {
    }

    openSnackBar(msg:string) {
        this._snackBar.open(msg, 'Splash', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }

}

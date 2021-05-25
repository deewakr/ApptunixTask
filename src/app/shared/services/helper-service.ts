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
        this._snackBar.open(msg, '', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 2000,
            panelClass: [msg.includes('error') ? 'customSnackbarred' :'customSnackbargreen']
        }); 
    }

}

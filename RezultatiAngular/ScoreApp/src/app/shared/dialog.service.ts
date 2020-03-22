import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatConfirmDialogComponent } from '../mat-confirm-dialog/mat-confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(customMessage){
    return this.dialog.open(MatConfirmDialogComponent, {
      width: '390px',
      panelClass: 'confirmDialogContainer',
      disableClose: true,
      position: {top: "60px"},
      data: {
        message: customMessage
      }
    });
  }
}

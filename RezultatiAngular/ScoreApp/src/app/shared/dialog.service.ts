import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatConfirmDialogComponent } from '../mat-confirm-dialog/mat-confirm-dialog.component';
import { NoopScrollStrategy } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(customMessage){
    return this.dialog.open(MatConfirmDialogComponent, {
      width: '390px',
      panelClass: 'confirmDialogContainer',
      position: {top: "60px"},
      data: {
        message: customMessage
      },
      scrollStrategy: new NoopScrollStrategy()
    });
  }
}

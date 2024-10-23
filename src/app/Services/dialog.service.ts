import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog:MatDialog) { }  
  openDialog(component: any, data?: any): Observable<any> {
    const dialogRef = this.dialog.open(component, {
      width: '800px',
      data: data,
    panelClass:'custom-dialog'});
    return dialogRef.afterClosed(); 
  }
  closeDialog() {
    this.dialog.closeAll();
  }
}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Material.MatToolbarModule,
    Material.MatGridListModule,
    Material.MatInputModule,
    Material.MatFormFieldModule,
    Material.MatSelectModule,
    Material.MatFormFieldModule,
    Material.MatButtonModule,
    Material.MatDatepickerModule,
    Material.MatDialogModule,
    Material.MatIconModule,
    Material.MatCheckboxModule,
    Material.MatTableModule,
    Material.MatPaginatorModule,
    Material.MatSortModule
  ],
  exports: [
    Material.MatToolbarModule,
    Material.MatGridListModule,
    Material.MatInputModule,
    Material.MatFormFieldModule,
    Material.MatSelectModule,
    Material.MatFormFieldModule,
    Material.MatButtonModule,
    Material.MatDatepickerModule,
    Material.MatDialogModule,
    Material.MatIconModule,
    Material.MatCheckboxModule,
    Material.MatTableModule,
    Material.MatPaginatorModule,
    Material.MatSortModule
  ]
})
export class MaterialModule { }

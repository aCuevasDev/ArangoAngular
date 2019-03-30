import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Recomendado para PrimeNG
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import {
  MatTableModule,
  MatDialogModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatIconModule,
  MatTooltipModule,
  MatToolbarModule,
  MatMenuModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressSpinnerModule,
 } from '@angular/material';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
  ],
})
export class MaterialModule { }

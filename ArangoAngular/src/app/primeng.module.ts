import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Recomendado para PrimeNG
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { KeyFilterModule } from 'primeng/keyfilter';
import { TableModule } from 'primeng/table';

import {
  DialogModule,
  ConfirmDialogModule,
  ButtonModule,
  InputTextModule,
  MenubarModule,
  MessageModule,
  MessagesModule,
  MessageService,
  ConfirmationService} from 'primeng/primeng';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    MenubarModule,
    KeyFilterModule,
    ConfirmDialogModule,
    MessageModule,
    MessagesModule
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    MenubarModule,
    KeyFilterModule,
    ConfirmDialogModule,
    MessageModule,
    MessagesModule
  ],
  providers: [
    MessageService,
    ConfirmationService
  ],
})
export class PrimeNGModule { }

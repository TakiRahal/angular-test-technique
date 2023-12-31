import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyFormComponent } from './components/currency-form/currency-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { CurrencyListComponent } from './components/currency-list/currency-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyFormComponent,
    CurrencyListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

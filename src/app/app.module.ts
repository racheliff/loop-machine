import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LooperPanelComponent } from './looper-panel/looper-panel.component';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    LooperPanelComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

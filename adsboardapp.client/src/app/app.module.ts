import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { GoogleMapsModule } from '@angular/google-maps';


import { AppComponent } from './app.component';
import { AdListComponent } from './components/ad-list/ad-list.component';
import { AdFormComponent } from './components/ad-form/ad-form.component';
import { AdDetailsComponent } from './components/ad-details/ad-details.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
    declarations: [
        AppComponent,
        AdListComponent,
        AdFormComponent,
        AdDetailsComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
        GoogleMapsModule,
        MatGridListModule
    ],
    bootstrap: [AppComponent],
    providers: [
      provideAnimationsAsync()
    ]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppInfoDialogComponent } from './app-info-dialog/app-info-dialog.component';
import { AppInfoComponent } from './app-info/app-info.component';
import { AppUiModule } from './app-ui.module';
import { AppComponent } from './app.component';
import { FormatsDialogComponent } from './formats-dialog/formats-dialog.component';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from "ngx-spinner";
import { AppRoutingModule } from './app-routing.module';




@NgModule({
    imports: [
        // Angular
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
        // Local
        AppUiModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NgxSpinnerModule
    ],
    declarations: [AppComponent, FormatsDialogComponent, AppInfoComponent, AppInfoDialogComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

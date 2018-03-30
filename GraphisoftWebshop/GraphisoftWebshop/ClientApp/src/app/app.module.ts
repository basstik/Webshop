// ====================================================
// More Templates: https://www.ebenmonney.com/templates
// Email: support@ebenmonney.com
// ====================================================

import { NgModule, ErrorHandler } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppErrorHandler } from './app-error.handler';

import { AppComponent } from "./components/app.component";
import { HomeComponent } from "./components/home/home.component";


@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
    ],
    declarations: [
        AppComponent,
        HomeComponent,
    ],
    providers: [
        { provide: 'BASE_URL', useFactory: getBaseUrl },
        { provide: ErrorHandler, useClass: AppErrorHandler },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}




export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}

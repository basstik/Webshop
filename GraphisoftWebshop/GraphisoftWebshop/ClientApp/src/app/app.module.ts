// ====================================================
// More Templates: https://www.ebenmonney.com/templates
// Email: support@ebenmonney.com
// ====================================================

import { NgModule, ErrorHandler } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from "@angular/http";
import { HttpClientModule } from '@angular/common/http';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastyModule, ToastyService } from 'ng2-toasty';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { PopoverModule } from "ngx-bootstrap/popover";
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppErrorHandler } from './app-error.handler';
import { AppComponent } from "./app.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { WorkshopMainComponent } from "./components/workshop-main/workshop-main.component";
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductService } from "./services/product.service";
import { AlertService } from "./services/alert.service";
import { NetworkService } from "./services/network.service";
import { EmailService } from "./services/email.services";

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        NgxDatatableModule,
        ToastyModule,
        ModalModule,
        TooltipModule,
        PopoverModule,
        CarouselModule,
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
    ],
    declarations: [
        AppComponent,
        NotFoundComponent,
        WorkshopMainComponent,
        ProductCreateComponent,
        ProductListComponent,
    ],
    providers: [
        { provide: 'BASE_URL', useFactory: getBaseUrl },
        { provide: ErrorHandler, useClass: AppErrorHandler },
        NetworkService,
        AlertService,
        ToastyService,
        ProductService,
        EmailService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}

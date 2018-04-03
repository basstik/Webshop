// ====================================================
// More Templates: https://www.ebenmonney.com/templates
// Email: support@ebenmonney.com
// ====================================================

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WorkshopMainComponent } from './components/workshop-main/workshop-main.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { ProductListComponent } from './product/product-list/product-list.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: "",
                component: WorkshopMainComponent,
                children: [
                    {
                        path: "list",
                        component: ProductListComponent,
                    },
                    {
                        path: "create",
                        component: ProductCreateComponent,
                    },
                    {
                        path: "",
                        redirectTo: 'list',
                        pathMatch: 'full'
                    },
                    {
                        path: "**",
                        component: NotFoundComponent,
                        data: { title: "Page Not Found" }
                    },

                ]
            },
        ])
    ],
    exports: [
        RouterModule
    ],
    providers: [
    ]
})
export class AppRoutingModule { }

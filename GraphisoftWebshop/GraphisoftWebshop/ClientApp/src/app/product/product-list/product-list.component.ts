import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/Product';
import { forEach } from '@angular/router/src/utils/collection';
import { DialogType, AlertService, MessageSeverity } from '../../services/alert.service';
import { Utilities } from '../../services/utilities';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    columns: any[] = [];
    rows: Product[] = [];
    loadingIndicator: boolean;

    @ViewChild('indexTemplate')
    indexTemplate: TemplateRef<any>;

    @ViewChild('actionsTemplate')
    actionsTemplate: TemplateRef<any>;

    constructor(private productService: ProductService, private alertService: AlertService) { }

    ngOnInit() {
        this.columns = [
            { prop: "index", name: '#', width: 50, cellTemplate: this.indexTemplate, canAutoResize: false },
            { prop: 'category', name: 'Category', width: 100 },
            { prop: 'name', name: 'Name', width: 200 },
            { prop: 'description', name: 'Description', width: 80 },
            { prop: 'price', name: 'Price', width: 50 },
            { name: '', width: 130, cellTemplate: this.actionsTemplate, resizeable: false, canAutoResize: false, sortable: false, draggable: false }
        ];

        this.loadData();
    }

    loadData(): void {
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;

        this.productService.list().subscribe(
            result => {
                this.alertService.stopLoadingMessage();
                this.loadingIndicator = false;
                this.rows = result;
            },
            error => {
                this.alertService.stopLoadingMessage();
                this.loadingIndicator = false;
                this.alertService.showStickyMessage("Load Error", `Unable to retrieve products from the server.\r\nErrors: "${Utilities.getHttpResponseMessage(error)}"`,
                    MessageSeverity.error, error);

                }
        );
    }

    deleteProduct(row: Product) {
        this.alertService.showDialog('Are you sure you want to delete the \"' + row.name + '\" product?', DialogType.confirm, () => this.deleteProductHelper(row));
    }

    deleteProductHelper(row: Product) {
        this.alertService.startLoadingMessage("Deleting...");
        this.loadingIndicator = true;

        this.productService.delete(row)
            .subscribe(results => {
                this.alertService.stopLoadingMessage();
                this.loadingIndicator = false;

                this.rows = this.rows.filter(item => item !== row)
            },
            error => {
                this.alertService.stopLoadingMessage();
                this.loadingIndicator = false;
                this.alertService.showStickyMessage("Delete Error", `An error occured whilst deleting the role.\r\nError: "${Utilities.getHttpResponseMessage(error)}"`,
                    MessageSeverity.error, error);
            });
    }

}

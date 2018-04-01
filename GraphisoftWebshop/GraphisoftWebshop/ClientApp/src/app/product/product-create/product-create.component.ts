import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { Product } from '../../models/Product';
import { AlertService, MessageSeverity } from '../../services/alert.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

    private productEdit: Product;
    private showValidationErrors = false;

    @ViewChild('f')
    private form;

    @ViewChild('productName')
    private productName;

    @ViewChild('category')
    private category;

    constructor(private pruductService: ProductService, private alertService: AlertService) { }

    ngOnInit() {
        this.productEdit = new Product();
    }

    private showErrorAlert(caption: string, message: string) {
        this.alertService.showMessage(caption, message, MessageSeverity.error);
    }

    private save() {
        this.alertService.startLoadingMessage("Saving changes...");
        this.pruductService.create(this.productEdit).subscribe(product => this.saveSuccessHelper(product), error => this.saveFailedHelper(error));
    }


    private saveSuccessHelper(product: Product) {
        this.alertService.stopLoadingMessage();
        this.showValidationErrors = false;

        this.alertService.showMessage("Success", `Product \"${this.productEdit.name}\" was created successfully`, MessageSeverity.success);
    }


    private saveFailedHelper(error: any) {
        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
        this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    }

}

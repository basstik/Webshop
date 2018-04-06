import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { Product } from '../../models/Product';
import { AlertService, MessageSeverity } from '../../services/alert.service';
import { ProductService } from '../../services/product.service';

import { Router } from '@angular/router';
import { EmailService } from '../../services/EmailService';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

    private productEdit: Product;
    public isAuthenticatedEmail: boolean = false;

    @ViewChild('f')
    private form;

    @ViewChild('category')
    private productName;

    @ViewChild('productName')
    private category;

    @ViewChild('description')
    private description;

    @ViewChild('price')
    private price;

    @ViewChild('createdBy')
    private createdBy;

    @ViewChild('email')
    private email;

    constructor(
        private pruductService: ProductService,
        private alertService: AlertService,
        private router: Router,
        private emailService: EmailService) { }

    ngOnInit() {
        this.productEdit = new Product();
    }

    private emailValidate() {
        this.emailService.authenticateEmail(this.productEdit.email).subscribe(valid => {
            this.isAuthenticatedEmail = valid;
        });
    }

    private showErrorAlert(caption: string, message: string) {
        this.alertService.showMessage(caption, message, MessageSeverity.error);
    }

    private save() {
        this.alertService.startLoadingMessage("Saving changes...");
        this.pruductService.create(this.productEdit).subscribe(
            product => this.saveSuccessHelper(product),
            error => this.saveFailedHelper(error));

    }

    private saveSuccessHelper(product: Product) {
        this.alertService.stopLoadingMessage();
        this.alertService.showMessage("Success", `Product \"${this.productEdit.name}\" was created successfully`, MessageSeverity.success);
        this.router.navigate(["/list"]);
    }

    private saveFailedHelper(error: any) {
        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
        this.alertService.showStickyMessage(error, null, MessageSeverity.error);
    }

}

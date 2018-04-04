import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { Product } from '../../models/Product';
import { AlertService, MessageSeverity } from '../../services/alert.service';
import { ProductService } from '../../services/product.service';
import { EmailService } from '../../services/email.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

    private productEdit: Product;

    @ViewChild('f')
    private form;


    constructor(
        private pruductService: ProductService,
        private alertService: AlertService,
        private router: Router,
        private emailService: EmailService) { }

    ngOnInit() {
        this.productEdit = new Product();
    }

    private showErrorAlert(caption: string, message: string) {
        this.alertService.showMessage(caption, message, MessageSeverity.error);
    }

    private checkEmailAndSave() {
        this.alertService.startLoadingMessage("Saving changes...");

        this.emailService.authenticateEmail(this.productEdit.email).subscribe(
            (authenticated) => {
                if (authenticated) {
                    this.save();
                } else {
                    console.log("Email address isn't authenticated!");
                }
            },
            error => this.saveFailedHelper(error));
    }

    private save() {
        this.pruductService.create(this.productEdit).subscribe(product => this.saveSuccessHelper(product), error => this.saveFailedHelper(error));
    }

    private authenticateEmail(arg0: string): any {
        throw new Error("Method not implemented.");
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

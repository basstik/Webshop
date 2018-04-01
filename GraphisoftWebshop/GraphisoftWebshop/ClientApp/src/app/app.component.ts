// ====================================================
// More Templates: https://www.ebenmonney.com/templates
// Email: support@ebenmonney.com
// ====================================================

import { Component, OnInit} from "@angular/core";
import { Router, NavigationStart } from '@angular/router';
import { AlertService, AlertDialog, DialogType, AlertMessage } from "./services/alert.service";
import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";

var alertify: any = require('./assets/scripts/alertify.js');


@Component({
  selector: "app-root",
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

    stickyToasties: number[] = [];

    constructor(private alertService: AlertService, private toastyService: ToastyService) { }

    ngOnInit(): void {
        console.log("AppComponnent");

        this.alertService.getDialogEvent().subscribe(alert => this.showDialog(alert));
       // this.alertService.getMessageEvent().subscribe(message => this.showToast(message, false));
        this.alertService.getStickyMessageEvent().subscribe(message => this.showToast(message, true));

    }

    showDialog(dialog: AlertDialog) {

        alertify.set({
            labels: {
                ok: dialog.okLabel || "OK",
                cancel: dialog.cancelLabel || "Cancel"
            }
        });

        switch (dialog.type) {
            case DialogType.alert:
                alertify.alert(dialog.message);

                break
            case DialogType.confirm:
                alertify
                    .confirm(dialog.message, (e) => {
                        if (e) {
                            dialog.okCallback();
                        }
                        else {
                            if (dialog.cancelCallback)
                                dialog.cancelCallback();
                        }
                    });

                break;
            case DialogType.prompt:
                alertify
                    .prompt(dialog.message, (e, val) => {
                        if (e) {
                            dialog.okCallback(val);
                        }
                        else {
                            if (dialog.cancelCallback)
                                dialog.cancelCallback();
                        }
                    }, dialog.defaultValue);

                break;
        }
    }

    showToast(message: AlertMessage, isSticky: boolean) {

        if (message == null) {
            for (let id of this.stickyToasties.slice(0)) {
                this.toastyService.clear(id);
            }

            return;
        }

        let toastOptions: ToastOptions = {
            title: message.summary,
            msg: message.detail,
            timeout: isSticky ? 0 : 4000
        };


        if (isSticky) {
            toastOptions.onAdd = (toast: ToastData) => this.stickyToasties.push(toast.id);

            toastOptions.onRemove = (toast: ToastData) => {
                let index = this.stickyToasties.indexOf(toast.id, 0);

                if (index > -1) {
                    this.stickyToasties.splice(index, 1);
                }

                toast.onAdd = null;
                toast.onRemove = null;
            };
        }
    }
}

import { Component, ViewEncapsulation, OnInit, OnDestroy, ViewChildren, AfterViewInit, QueryList, ElementRef } from "@angular/core";
import { Router, NavigationStart } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AlertService, MessageSeverity, AlertDialog, DialogType, AlertMessage } from "./services/alert.service";


var alertify: any = require('./assets/scripts/alertify.js');


@Component({
    selector: "app-root",
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

    isAppLoaded: boolean;
    removePrebootScreen: boolean;
    appTitle = "Graphisoft Webshop";
    appLogo = require("./assets/images/logo.png");

    stickyToasties: number[] = [];

    dataLoadingConsecutiveFailurs = 0;
    notificationsLoadingSubscription: any;


    constructor(private toastyService: ToastyService, private toastyConfig: ToastyConfig,
         private alertService: AlertService,  public router: Router) {

        this.toastyConfig.theme = 'bootstrap';
        this.toastyConfig.position = 'top-right';
        this.toastyConfig.limit = 100;
        this.toastyConfig.showClose = true;
    
    }


    ngOnInit() {

        // 1 sec to ensure all the effort to get the css animation working is appreciated :|, Preboot screen is removed .5 sec later
        setTimeout(() => this.isAppLoaded = true, 1000);
        setTimeout(() => this.removePrebootScreen = true, 1500);

        setTimeout(() => {
            this.alertService.resetStickyMessage();
        }, 2000);


        this.alertService.getDialogEvent().subscribe(alert => this.showDialog(alert));
        this.alertService.getMessageEvent().subscribe(message => this.showToast(message, false));
        this.alertService.getStickyMessageEvent().subscribe(message => this.showToast(message, true));

        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                let url = (<NavigationStart>event).url;

                if (url !== url.toLowerCase()) {
                    this.router.navigateByUrl((<NavigationStart>event).url.toLowerCase());
                }
            }
        });
    }


    ngOnDestroy() {
        this.unsubscribeNotifications();
    }


    private unsubscribeNotifications() {
        if (this.notificationsLoadingSubscription)
            this.notificationsLoadingSubscription.unsubscribe();
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
        console.log("sdfsdfs");

        if (message == null) {
            for (let id of this.stickyToasties.slice(0)) {
                this.toastyService.clear(id);
            }
            console.log("aaa1");

            return;
        }

        let toastOptions: ToastOptions = {
            title: message.summary,
            msg: message.detail,
            timeout: isSticky ? 0 : 4000
        };

        console.log("aaa2");

        if (isSticky) {
            console.log("aaa3");

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


        switch (message.severity) {
            case MessageSeverity.default: this.toastyService.default(toastOptions); break
            case MessageSeverity.info: this.toastyService.info(toastOptions); break;
            case MessageSeverity.success: this.toastyService.success(toastOptions); break;
            case MessageSeverity.error: this.toastyService.error(toastOptions); break
            case MessageSeverity.warn: this.toastyService.warning(toastOptions); break;
            case MessageSeverity.wait: this.toastyService.wait(toastOptions); break;
        }
    }
}

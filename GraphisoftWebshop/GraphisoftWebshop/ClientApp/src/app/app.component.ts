// ====================================================
// More Templates: https://www.ebenmonney.com/templates
// Email: support@ebenmonney.com
// ====================================================

import { Component, OnInit} from "@angular/core";
import { Router, NavigationStart } from '@angular/router';


@Component({
  selector: "app-root",
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

    ngOnInit(): void {
        console.log("AppComponnent");
    }

}
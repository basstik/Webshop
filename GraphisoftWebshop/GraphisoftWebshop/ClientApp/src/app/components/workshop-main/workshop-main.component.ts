import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workshop-main',
  templateUrl: './workshop-main.component.html',
  styleUrls: ['./workshop-main.component.css']
})
export class WorkshopMainComponent implements OnInit {

    appTitle = "Webshop";
    appLogo = require("../../assets/images/logo.png");

  constructor() { }

  ngOnInit() {
  }

}

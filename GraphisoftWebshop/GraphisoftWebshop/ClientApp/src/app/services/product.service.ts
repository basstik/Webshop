import { Injectable } from '@angular/core';
import { Http, Request, Response, RequestOptionsArgs, Headers, RequestOptions } from '@angular/http';


import { Product } from '../models/Product';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/catch';
import { HttpWrapper } from '../HttpWrapper';
import 'rxjs/add/operator/map'

@Injectable()
export class ProductService {

    private url = 'api/product';

    constructor(private http: HttpWrapper) { }

    list(): Observable<Product[]> {
        return this.http.get(this.url).map(this.http.extractJson);
    }


}

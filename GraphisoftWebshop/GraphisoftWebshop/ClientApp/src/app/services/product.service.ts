import { Http, Request, Response, RequestOptionsArgs, Headers, RequestOptions } from '@angular/http';


import { Product } from '../models/Product';

import { Observer } from 'rxjs/Observer';
import { catchError, map, tap } from 'rxjs/operators';

import { NetworkService } from './NetworkService';
import { ApiResponse } from '../interfaces/apiresponse';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ProductService {

    private url = '/api/product';

    constructor(private networkService: NetworkService, protected http: HttpClient) { }

    public baseUrl(): string {
        let base = '';

        if (window.location.origin)
            base = window.location.origin;
        else
            base = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');

        return base.replace(/\/$/, '');
    }

    list2(): Observable<Product[]> {
        let header = new HttpHeaders({ 'Content-Type': 'application/json' });

        let params = new HttpParams();

        let requestBody = params.toString();
        
        return this.http.get<Product[]>(this.baseUrl() + this.url);

    }

    delete(product: Product): Observable<Product> {
        return this.http.delete<Product>(this.baseUrl() + this.url + '/delete/' + product.id);
    }

    create(product: Product): Observable<Product> {
        return this.http.post<Product>(this.baseUrl() + this.url + '/create', JSON.stringify(product), this.getRequestHeaders());
    }

    protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': `application/json`,
        });

        return { headers: headers };
    }
}

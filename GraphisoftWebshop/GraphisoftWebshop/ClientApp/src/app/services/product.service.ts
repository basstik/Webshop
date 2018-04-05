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
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';


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

    public list(): Observable<Product[]> {      
        return this.http.get<Product[]>(this.baseUrl() + this.url);
    }

    public delete(product: Product): Observable<Product> {
        return this.http.delete<Product>(this.baseUrl() + this.url + '/delete/' + product.id);
    }

    public create(product: Product): Observable<Product> {
        return this.http.post<Product>(this.baseUrl() + this.url + '/create', JSON.stringify(product), this.getRequestHeaders())
            .catch((error: HttpErrorResponse) => {
                console.log("Look: " + error);
                return this.handleError<Product>(error);
            });
    }

    private getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': `application/json`,
        });

        return { headers: headers };
    }

    private handleError<T>(error): Observable<T> {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an ErrorObservable with a user-facing error message
        return new ErrorObservable(
            'Something bad happened; please try again later.');
    };
}

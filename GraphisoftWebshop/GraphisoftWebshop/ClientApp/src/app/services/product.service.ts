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


  //  private baseUrl: string = environment.API_URL;

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
        console.log("aaaa " + this.baseUrl() + this.url);
        
        //return this.http.post<Product[]>(this.baseUrl() + this.url, requestBody, { headers: header });
        return this.http.get<Product[]>(this.baseUrl() + this.url);

    }

    delete(product: Product): Observable<Product> {
        console.log("delete");
        console.log("bbb " + this.baseUrl() + this.url + '/delete/' + product.id);

        return this.http.delete<Product>(this.baseUrl() + this.url + '/delete/' + product.id);
    }

    create(product: Product): Observable<Product> {
        console.log("create");
        console.log("ccc " + this.baseUrl() + this.url + '/create');
        console.log(JSON.stringify(product));

        return this.http.post<Product>(this.baseUrl() + this.url + '/create', JSON.stringify(product), this.getRequestHeaders());
    }

 //   list(): Observable<Product[]> {
        // return this.http.get(this.url).map(this.http.extractJson);

     //   return this.networkService.get<ApiResponse<Product[]>>(this.url).pipe(
     //       tap(_ => console.log("get payload")),
     //       map(response => response.payload),
     //       catchError(this.handleError<Product[]>('getProducts', null))
  //      ); 
 //   }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
    */


    protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': `application/json`,
        });

        return { headers: headers };
    }
}

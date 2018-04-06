import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators/catchError';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/observable/throw';

import { environment } from '../../environments/environment';
import { QueryParamObject } from '../interfaces/query-param.interface';
import { HttpOptions } from '../interfaces/http-options.interface';

@Injectable()
export class NetworkService {

    private baseUrl: string;

    // any should be yours generic Error wrapper
    public networkError: Subject<HttpResponse<any>> = new Subject();

    constructor(public http: HttpClient) { this.baseUrl = this.getBaseUrl(); }

    public post<T>(path: string, payload: any = null, opts?: HttpOptions): Observable<T> {
        return this.makeRequest<T>(this.http.post.bind(this.http, this.buildUrl(path, {}), payload), opts);
    }

    public get<T>(path: string, params: QueryParamObject = {}, opts?: HttpOptions): Observable<T> {
        return this.makeRequest<T>(this.http.get.bind(this.http, this.buildUrl(path, params)), opts);
    }

    public put<T>(path: string, payload: any = null, opts?: HttpOptions): Observable<T> {
        return this.makeRequest<T>(this.http.put.bind(this.http, this.buildUrl(path, {}), payload), opts);
    }

    public delete<T>(path: string, params: QueryParamObject = {}, opts?: HttpOptions): Observable<T> {
        return this.makeRequest<T>(this.http.delete.bind(this.http, this.buildUrl(path, params)), opts);
    }

    /**
     * Generates minimum amount of options to make a request to the API.
     */
    private generateOptions(): HttpOptions {

        return <HttpOptions>{
            reportProgress: false,
            responseType: 'json',
            observe: 'body',
            headers: {
                'Content-Type': 'application/json',
                'Accept': `application/json`,
            },
            withCredentials: true,
        };
    }

    /**
     * Makes a request with the specified bound Http function
     * and broadcast network error if any happen during the request.
     */
    private makeRequest<T>(
        httpFn: (options: HttpOptions) => Observable<T>,
        options: HttpOptions = this.generateOptions()
    ): Observable<T> {
        return httpFn(options).pipe(
            catchError((response) => {
                if (!response.ok) {
                    this.handleError(response);

                    this.networkError.next(response);
                    // https://stackoverflow.com/a/36656026/2019689
                    return Observable.throw(response);
                }
            })
        );
    }

    /**
     * Builds a query string from a query param object.
     */
    private buildParamsQuery(queryParams: QueryParamObject): string {
        return (
            '?' +
            Object.keys(queryParams)
                .filter(paramKey => queryParams[paramKey] === false || queryParams[paramKey] === 0 || queryParams[paramKey])
                .map(paramKey => {
                    const paramValue = queryParams[paramKey];
                    if (Array.isArray(paramValue)) {
                        return paramValue.map(value => `${paramKey}=${value}`).join('&');
                    } else {
                        return `${paramKey}=${paramValue}`;
                    }
                })
                .join('&')
        );
    }

    /**
     * Builds a fully qualified url from the provided slug and QueryParamObject.
     */
    private buildUrl(slug: string, queryParams: QueryParamObject): string {
        if (slug[0] !== '/') {
            throw new Error('[NetworService][buildURL] Path must start with a backslash!');
        }

        return `${this.baseUrl}${slug}${this.buildParamsQuery(queryParams)}`;
    }

    /**
    * Write the error message to console log.
    */
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

    private getBaseUrl(): string {
        let base = '';

        if (window.location.origin)
            base = window.location.origin;
        else
            base = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');

        return base.replace(/\/$/, '');
    }
}

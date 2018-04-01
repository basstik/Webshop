import { Http, Request, Response, RequestOptionsArgs, Headers, RequestOptions } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpWrapper {
    public error: EventEmitter<any> = new EventEmitter<any>();
    public preSuccess: EventEmitter<Response> = new EventEmitter<Response>();
    public postSuccess: EventEmitter<Response> = new EventEmitter<Response>();

    constructor(private http: Http) { }

    extractJson(res: Response) {
        return res.text() != '' ? res.json() : null;
    }

    /**
     * Performs a request with `get` http method.
     */
    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.wrap(this.http.get(url, options));
    }

    /**
     * Performs a request with `post` http method.
     */
    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.wrap(this.http.post(url, body, options));
    }

    /**
     * Performs a request with `post` http method.
     */
    postJson(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        body = JSON.stringify(body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        if (!options) {
            options = new RequestOptions({ headers: headers });
        }

        return this.wrap(this.http.post(url, body, options));
    }

    /**
     * Performs a request with `put` http method.
     */
    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.wrap(this.http.put(url, body, options));
    }

    /**
     * Performs a request with `delete` http method.
     */
    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.wrap(this.http.delete(url, options));
    }

    /**
     * Performs a request with `patch` http method.
     */
    patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.wrap(this.http.patch(url, body, options));
    }

    /**
     * Performs a request with `head` http method.
     */
    head(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.wrap(this.http.head(url, options));
    }

    private wrap(observable: Observable<Response>): Observable<Response> {
        return new Observable<Response>((responseObserver: Observer<Response>) => {
            observable.catch(error => this.handleError(error)).subscribe(
                (response: Response) => {
                    this.preSuccess.emit(response);
                    responseObserver.next(response);
                    this.postSuccess.emit(response);
                },
                error => {
                    responseObserver.error(error);
                },
                () => {
                    responseObserver.complete();
                }
            );
        });
    }

    private handleError(error: any) {
        this.error.emit(error);
        return Observable.throw(error);
    }
}
